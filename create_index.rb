#!/usr/bin/env ruby
 
require 'elasticsearch'
require 'json'
  #{host: 'dcdev-elasticsearch-1109523453.us-east-1.elb.amazonaws.com', port: 80}
client = Elasticsearch::Client.new log: true, host: 'localhost:9200'
client.transport.reload_connections!
puts client.cluster.health
 
mapping = {
  feature: {
    properties: {
        properties: {
          type: "string",
          index: "not_analyzed",
          store: "no"
        },
        geometry: {
           type: "geo_shape",
           tree: "quadtree",
           precision: "1m"
        }
    }
  }
}
 
body = {mappings: mapping}
client.indices.create index: 'features', body: body rescue nil
client.indices.put_mapping index: 'features', type: 'feature', body: mapping
 
# Dir.glob('*.geojson').each do |file|
#   puts "Indexing #{file}"
#   json = JSON.parse(File.open(file).read)
#   features = json.delete("features")
#   client.index  index: 'datasets', type: 'dataset', id: json["id"], body: json
#   features.each_with_index do |feature,i|
#     begin
#       id = [json["id"],i].join(':')
#       client.index  index: 'features', type: 'feature', id: id, body: {id: id, properties: feature['properties'].to_json, geometry: feature['geometry']}
#     rescue Exception => e
#       puts "Failed on #{i}"
#       next
#     end
#   end
 
# end
