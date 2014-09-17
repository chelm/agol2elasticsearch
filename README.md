# Import Features from ArcGIS Online into ElasticSearch 
-------------- 

## Usage

This package reads the datasets from a file `datasets.json` (an [output from ArcGIS Open Data](http://opendata.dc.gov/datasets.json)) and will attempt to index every feature into Elastic Search. 

  ```
    Usage: node index.js {host} {index}
    > node index.js localhost:9200 features
  ```

## Index

First you need to build an index mapping to not analyze the properties field.

```
ruby create_index.rb
```