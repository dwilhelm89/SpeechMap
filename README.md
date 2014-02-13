SpeechMap
=============

This is a prototypical demo showing how to control a map using natural speech interaction. 
Check out the [Demo](http://dnns-14394.euw1.nitrousbox.com:8080/)!



Possible Interactions so far:
----
* panning
* zooming
* creating markers
* drawing lines


Try to use sentences like: 
----
* "Move to San Francisco"
* "Draw a marker in America"
* "Set a point in chicago"
* "Connect Los Angelas and San Francisco"
* "Zoom in"
* "Pan up"
* "Pan to the left"


Hints/ Problems: 
----
* Based on the geocoder only locations in America are useful
* The webkit speech recognition seems to randomly stop, which is why it asks repeadetly for permissions




Based on :
----
 
* [Leaflet](leafletjs.com) 
* [Wit](https://wit.ai/) for the natural speech recognition
* [mapquest](developer.mapquest.com) for the geocodings




Author
-----
Dennis Wilhelm, 2014


License
-----
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
