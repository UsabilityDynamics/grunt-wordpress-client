"use strict";

var wp = require('wordpress-client');
var _ = require('lodash');
var path = require('path');
var readChunk = require('read-chunk');
var imageType = require('image-type');
var async = require('async');

module.exports = function (grunt) {

  function normalizeTaskName(name) {
    var parts = name.split('.');
    var modName = parts[1].replace(/^./, parts[1][0].toUpperCase());
    return parts[0] + modName;
  }

  var mimes = {
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif"
  };

  var q = async.queue(function (task, callback) {
    task.that.methodCall(task.method, task.data, function (err, response) {
      if (err || response.ok === false) {
        grunt.log.errorlns("Error with file: " + task.file);
        grunt.log.errorlns(err.message || response.message);
      }
      callback();
    });
  }, 10);

  grunt.registerMultiTask("wordpress", 'Wordpress proxy task', function () {
    var defer = this.async();
    var options = this.options({});
    var self = this;

    q.drain = function () {
      defer(true);
    };

    wp.create({
      username: options.username,
      password: options.password,
      url: options.url
    }).once('connected', function (err, that) {
      if (err) {
        grunt.fail.warn(err.message);
      }

      var methodArgs = [];
      if (self.data.args) {
        self.data.args.forEach(function (argument) {
          methodArgs[methodArgs.length] = that.get(argument) ? that.get(argument) : argument;
        });
      }

      var methods = _.filter(that.get('methods'), function (method) {
        return method.indexOf('wp.') === 0;
      });

      var normalized = methods.map(function (method) {
        return normalizeTaskName(method);
      });

      if (_.contains(normalized, self.target)) {
        self.files.forEach(function (srcFiles) {
          srcFiles.src.forEach(function (file) {
            var data = {};
            var mArgs = _.cloneDeep(methodArgs);
            var fileExt = path.extname(file);
            if (_.contains(['.png', '.jpg', 'jpeg', '.gif'], fileExt)) {
              var buffer = readChunk.sync(file, 0, 12);
              var type = imageType(buffer);

              data = {
                "name": path.basename(file),
                "type": mimes[type],
                "bits": grunt.file.read(file, {encoding: null}),
                "override": true
              };
            } else if (fileExt === '.json') {
              data = grunt.file.readJSON(file);
            }
            mArgs[mArgs.length] = data;

            q.push({ method: methods[normalized.indexOf(self.target)], data: mArgs, file: file, that: that });
          });
        });
      } else {
        defer(true);
      }
    });
  });
};
