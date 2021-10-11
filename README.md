# WX3in1 APRS Digipeater/I-Gate map visualizer

Mapper/visualizer of the `/stations.shtml` file produced by the 
[WX3in1 Plus 2.0](https://microsat.com.pl/product_info.php?products_id=100)
APRS Advanced Digipeater/I-Gate.

## What?

This JS parser reads the `/stations.shtml` file on your WX3in1 (or a copy of 
it) and produces a neat OpenLayers map with all the heard stations as markers 
(points) with a callsign below.

The more times the station was heard (based on the number of RF packets), the
bigger the circle's radius. Simple.

## Why?

I hated the table view of WX3in1 RF heard stations page. So here's a map view.

## How?

* Edit the files to suit your needs:
  * `stations_shtml` in [main.js](main.js) should point to the WX3in1 file;
  * `start_lon_lat` should point somewhere close to your base station;
* Run the following:
  * `npm run-script build`

Your HTML files will be ready to be served in `dist/`.

## TODO

* (Bug or feature?) Fix coordinate conversion or keep it as a slight offset

## Who?

I am Simonas Kareiva, LY2EN. Send your comments to ly2en@qrz.lt.