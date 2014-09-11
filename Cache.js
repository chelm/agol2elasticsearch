var elasticsearch = require('elasticsearch');

var Cache = function( host, index ){

  var client = new elasticsearch.Client({
    host: host,
    log: 'trace'
  });

  this.get = function(type, key, options, callback){
    callback(true, null);
  },

  this.remove = function( type, id, options, callback){
    callback(null, true);
  };

  this.getInfo = function( key, callback ){
    callback(null, {});
  };

  this.updateInfo = function( key, info, callback ){
    callback(null, {});
  };

  this.insertPartial = function( type, key, data, layerId, callback ){
    this.insert( type, key, data, layerId, callback );
  },

  this.insert = function( type, key, data, layerId, callback ){
    var self = this;
    data.features.forEach( function( f, i ){
      console.log( key, layerId );
      self.insertFeature( f );
    });
    callback( null, true);
  };

  this.insertFeature = function( feature ){
    client.index({
      index: index,
      type: 'feature',
      body: {
        properties: feature.properties,
        geometry: feature.geometry,
        id: feature.id
      }
    }, function (err, resp) { });
  };

};

module.exports = Cache;
