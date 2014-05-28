Object.defineProperties( module.exports, {
  createFieldMaps: {
    value: function createFieldMaps( renames, toFns, fromFns ) {
      var to = extend( {}, renames ),
        from = {};

      Object.keys( renames ).forEach(function( key ) {
        from[ renames[ key ] ] = key;
      });

      return {
        renames: renames,
        to: extend( to, toFns ),
        from: extend( from, fromFns )
      };
    }
  },
  extend: {
    value: function extend( a, b ) {
      for ( var p in b ) {
        a[ p ] = b[ p ];
      }

      return a;
    }
  },
  mapFields: {
    value: function mapFields( data, map ) {
      var field, value, mappedField,
        ret = {};

      for ( field in data ) {
        value = data[ field ];
        mappedField = map[ field ];

        // no map -> delete
        if ( !mappedField ) {
          continue;
          // string -> change field name
        } else if ( typeof mappedField === "string" ) {
          ret[ mappedField ] = value;
          // function -> merge result
        } else {
          extend( ret, mappedField( value ) );
        }
      }

      return ret;
    }
  },
  download: {
    value: function(uri, filename, done ){
      request.head( uri, function( err, res, body ){
        var _stream = fs.createWriteStream(filename) ;
        console.log( 'content-type: [%s]; content-length: [%s]', res.headers['content-type'], res.headers['content-length'] );
        request( uri ).pipe( _stream );
        _stream.on( 'finish', done );
      });
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
})
