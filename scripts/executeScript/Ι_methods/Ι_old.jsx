function getScriptName() {

    var pathScriptFile = $.fileName
    var string = decodeURIComponent(pathScriptFile);
    var match = "script";
    var textAfterLastMatch = string.slice(string.lastIndexOf(match) + match.length, -4);

    if (!File(string).exists) {
        throw new Error("Invalid Path file. File doesn't exist");
    }

    return textAfterLastMatch;
}

function capitalizeFirstLetter(lower) {
    
    var upper = new String;
    return upper = lower.replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}
