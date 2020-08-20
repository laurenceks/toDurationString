# toDurationString
A method for converting number durations into formated strings

#Usage
Simply call the method on any number, it will return a formatted string

12345.toDurationString() //returns 03:25:45

#Arguments and options
There are two arguments, both optional
-sourceUnit: a string to set the unit of the input, default is "s" for seconds, accepted units are "ms", "s", "m", "h", "d"
-options: an object containing optional options
--maxOutputLevel: "auto", sets the highest unit to display
--includeMilliseconds: false, sets the inclusion of milliseconds
--padZeros: true, sets the padding of 0s
--addLabels: false, sets the inclusion of unit labels
--delimiter: ":", sets the delimiter between units
