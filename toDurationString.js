Number.prototype.toDurationString = function (sourceUnit = "s", options) {
    //accepts a number and returns a string for it in human-readable time
    const units = {
        ms: {d: 1, u: 1000, long: "milliseconds", inputScale: 1},
        s: {d: 1000, u: 60000, long: "seconds", inputScale: 1000},
        m: {d: 60000, u: 3600000, long: "minutes", inputScale: 60000},
        h: {d: 3600000, u: 86400000, long: "hours", inputScale: 3600000},
        d: {d: 86400000, u: null, long: "days", inputScale: 8.64e+7},
    };
    const defaults = {
        maxOutputLevel: "auto",
        includeMilliseconds: false,
        padZeros: true,
        addLabels: false,
        delimiter: ":"
    };
    //get options
    let maxOutputLevel = options.maxOutputLevel || defaults.maxOutputLevel;
    const includeMilliseconds = options.includeMilliseconds || defaults.includeMilliseconds;
    const padZeros = options.padZeros || defaults.padZeros;
    const addLabels = options.addLabels || defaults.addLabels;
    const delimiter = options.delimiter || defaults.delimiter;
    //set the order of the output string
    const levelOrder = ["s", "m", "h", "d"];

    //convert input to ms
    const input = Math.round(this * units[sourceUnit].inputScale);

    if (maxOutputLevel === "auto") {
        //figure out the highest unit if in auto mode
        maxOutputLevel = input < 60000 ? "s" : input < 3600000 ? "m" : input < 86400000 ? "h" : "d";
    }

    let output = "";

    for (let i = levelOrder.indexOf(maxOutputLevel); i >= 0; i--) {
        output += extractUnit(input, levelOrder[i], i === levelOrder.indexOf(maxOutputLevel)) + (levelOrder[i] !== "s" ? delimiter : "")
    }

    if (includeMilliseconds) {
        let milliseconds = input % units.s.d;
        output += (addLabels ? delimiter : ".") + (padZeros ? pad(milliseconds, 3) : milliseconds) + (addLabels ? " milliseconds" : "");
    }

    return output;

    function extractUnit(num, unit, overflow) {
        let returnResult = "";
        if (units[unit].u && !overflow) {
            returnResult = Math.floor((num % units[unit].u) / units[unit].d);
        } else {
            returnResult = Math.floor(num / units[unit].d);
        }
        return (padZeros ? pad(returnResult, 2) : returnResult) + (addLabels ? " " + units[unit].long : "");
    }

    function pad(n, width, z = '0') {
        //stolen from StackOverflow a long time ago - can't find original author
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}
;