var agol = require('koop-agol/models/agol'),
  fs = require('fs');
global.GeoJSON = require('./GeoJSON');

var esHost = process.argv[2] || 'localhost:9200', 
  indexName = process.argv[3];

if (!esHost || !indexName){
  console.log('Must specify a ES host and an index name ')
  process.exit();
}

var Cache = require('./Cache.js');

global.Cache = new Cache( esHost, indexName );

var datasets = JSON.parse( fs.readFileSync('./datasets.json') );
//var ids = ['071aa9b40a1a4b38a938f8f5058068a8_11'];

var host = 'https://www.arcgis.com',
  hash = 'fakehash';

datasets.data.forEach( function(dataset, i){
  id = dataset.id.split('_');
  agol.getItemData( host, id[0], hash, { layer: id[1] }, function(err, data){
    console.log('done', err, data);
  });
});
