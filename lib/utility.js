
function extend( a, b ) {
  for ( var p in b ) {
    a[ p ] = b[ p ];
  }

  return a;
}

function createFieldMaps( renames, toFns, fromFns ) {
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

function mapFields( data, map ) {
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


exports.mapFields = mapFields;
exports.extend = extend;
exports.createFieldMaps = createFieldMaps;
