function readValueOfSeetingsFromPrefFile(searchedPhrase) {

    var textArrayToWritie = [];
    var prefFile = createFilePath("scriptUI_preferences.txt");
    var b = prefFile;

    b.open('r');

    var numbOfTextLines = 0;
    while (!b.eof) {

        textArrayToWritie[numbOfTextLines] = b.readln();

        if (textArrayToWritie[numbOfTextLines].search('OFF: ' + searchedPhrase) != -1) { //It can't be == 1 and it can't work that way, but I have no idea why
            var textToReplace = ':  OFF';
            break;

        }
        else if (textArrayToWritie[numbOfTextLines].search('ON : ' + searchedPhrase) != -1) { //It can't be == 1 and it can't work that way, but I have no idea why
            var textToReplace = ':  ON ';
            break;

        }
        numbOfTextLines++;
    }

    if (textToReplace !== ':  OFF' && textToReplace !== ':  ON ') {
        throw new Error("Couldn't find value of expression: " + searchedPhrase + " in " + prefFile + "\n. Check correct spelling again.")
    }
    return textToReplace;
}

function appDataBuilder() {

    var listFile = createFilePath("scriptUI_changedFilesList.txt");
    buildListFilesIfItDoesntExists(listFile);

    var prefFile = createFilePath("scriptUI_preferences.txt");
    buildPrefFilesIfItDoesntExists(prefFile);

}

function createFilePath(file) {

    var scriptParentFolder = getGrandParentfolder(); // slice negative numb is length of file folder

    var listFile = new File(scriptParentFolder + file);

    ErrorWrongStringInputPath(listFile);
    
    return listFile;
}

function getGrandParentfolder() {

    var sriptPath = decodeURIComponent($.fileName); // "./" or ".//" can be used only in #include to give relative script path directory. There is undocumented bug, when you use it in File/Folder object it gives path to PS program directory

    var scriptFolder = getScriptFolder(sriptPath).toString().slice(0, -1); // slice(0, -1) is last char "/", you remove this

    var scriptParentFolder = getScriptFolder(scriptFolder).toString().slice(0, -1);

    var scriptGrandParentFolder = getScriptFolder(scriptParentFolder);
    
    return scriptGrandParentFolder;
}

function getScriptFolder(scriptPath) {
    return scriptPath.match(/^(.*[\\\/])/g); // match(/^(.*[\\\/])/g) "Select everything before the last forward slash"
}

function buildListFilesIfItDoesntExists(listFile) {

    if (!listFile.exists) {

        var a = listFile;
        a.open("w");
        a.writeln("Processed files list:");
        a.writeln("");
        a.close();
    }
}

function buildPrefFilesIfItDoesntExists(listFile) {

    if (!listFile.exists) {

        var a = listFile;
        a.open("w");
        a.writeln("");
        a.writeln("ENABLED/DISABLED:");
        a.writeln("");
        a.writeln('OFF: "FILTER BY PNG"- CHECKBOX = TRUE');
        a.writeln("");
        a.writeln('ON : "DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG');
        a.writeln("");
        a.writeln('OFF: "SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG');

        a.close();
    }
}

function changeValueOffOnInPrefFile(searchedPhrase) {

    var textArrayToWritie = [];
    var prefFile = createFilePath("scriptUI_preferences.txt");
    var b = prefFile;

    b.open('r');

    var numbOfTextLines = 0;

    while (!b.eof) {

        textArrayToWritie[numbOfTextLines] = b.readln();

        if (textArrayToWritie[numbOfTextLines].search('ON : ' + searchedPhrase ) != -1) { //It can't be == 1 and can't work that way, but I have no idea why
            var textToReplace = 'OFF: ' + searchedPhrase;

            textArrayToWritie[numbOfTextLines] = textToReplace;
            var alertText = textToReplace;
        }

        else if (textArrayToWritie[numbOfTextLines].search('OFF: ' + searchedPhrase) != -1) { //It can't be == 1 and can't work that way, but I have no idea why
            var textToReplace = 'ON : ' + searchedPhrase;

            textArrayToWritie[numbOfTextLines] = textToReplace;
            var alertText = textToReplace;
        }

        numbOfTextLines++;
    }

    if (typeof textToReplace === "undefined") {
        throw new Error("Couldn't find value of expression: " + searchedPhrase + "in" + prefFile + "\n. Check correct spelling again.")
    }

    b.close();

    b.open('w');

    for (var i = 0; i < numbOfTextLines; i++) {
        b.writeln(textArrayToWritie[i]);
    }

    b.close();
    
    return alertText;
}

function setValuesOfPrefs(changedPreference, onOffValueNextToButton) {

    var alertText = changeValueOffOnInPrefFile(changedPreference);

    var updateValue = readValueOfSeetingsFromPrefFile(changedPreference);
    onOffValueNextToButton.text = updateValue;

    alert(alertText); //Show user value of changed preference
}

function ErrorWrongStringInputPath(UItitlePath) {

    if ( UItitlePath !== "Destination folder..." && UItitlePath !== "Source folder..." &&
        !UItitlePath.exists && UItitlePath.toString() === decodeURIComponent(app.path) ) { //Default value when path of File/Folder can't be found is Folder path of runned app

        throw new Error("Invalid string. String is neither path nor default expression");
    }
}