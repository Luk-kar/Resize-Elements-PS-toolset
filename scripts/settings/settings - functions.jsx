var appData = {};
appData.preferencesFile = "Preferences.ini";
appData.changedFilesList = "ChangedFilesList.log";

var userDataFolder = new Folder("~/Documents/UI-Photoshop-toolSet");

function readValueOfSeetingsFromPrefFile(searchedPhrase, userDataFolder) {

    var textArrayToWritie = [];
    var prefFile = createFilePath(appData.preferencesFile, userDataFolder);
    var b = prefFile;

    b.open('r');

    var numbOfTextLines = 0;
    while (!b.eof) {

        textArrayToWritie[numbOfTextLines] = b.readln();

        if (textArrayToWritie[numbOfTextLines].search( searchedPhrase + '=OFF') != -1) { //It can't be == 1 and it can't work that way, but I have no idea why
            var textToReplace = ':  OFF';
            break;

        }
        else if (textArrayToWritie[numbOfTextLines].search( searchedPhrase + '=ON') != -1) { //It can't be == 1 and it can't work that way, but I have no idea why
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

    var listFile = createFilePath(appData.changedFilesList, userDataFolder);
    buildListFilesIfItDoesntExists(listFile);

    var prefFile = createFilePath(appData.preferencesFile, userDataFolder);
    buildPrefFilesIfItDoesntExists(prefFile);

}

function createFilePath(file, userDataFolder) {

    createFolderIfItDoesntExist(userDataFolder);

    alertUserWhenNewFileIsCreated(file, userDataFolder);

    var listFile = new File(userDataFolder.toString() + "/" + file);

    ErrorWrongStringInputPath(listFile);
    
    return listFile;
}

function alertUserWhenNewFileIsCreated(file, scriptFolder) {

    if (!File(scriptFolder.toString() + "/" + file).exists) {
        alert('You created file "' + file + '" in: ' + scriptFolder.toString() + "/");
    }
}

function createFolderIfItDoesntExist(Folder) {
    if (!Folder.exists) {
        Folder.create();
    }
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

var prefFileKeys = {};
prefFileKeys.filterByPNG = "FilterBPNGbyDefault";
prefFileKeys.closeDialogOpenFiles = "OpenCloseFilesDialog";
prefFileKeys.changedFileListLog = "ChangedFileListLog_WriteLog";

function buildPrefFilesIfItDoesntExists(prefFile) {

    if (!prefFile.exists) {

        var a = prefFile; //https://en.wikipedia.org/wiki/INI_file
        a.open("w");
        a.writeln("[ENABLED/DISABLED options]");
        a.writeln("");
        a.writeln(prefFileKeys.filterByPNG + '=OFF');
        a.writeln("");
        a.writeln(prefFileKeys.closeDialogOpenFiles + '=ON');
        a.writeln("");
        a.writeln(prefFileKeys.changedFileListLog + '=OFF');

        a.close();
    }
}

function changeValueOffOnInPrefFile(searchedPhrase, userDataFolder) {

    var textArrayToWritie = [];
    var prefFile = createFilePath(appData.preferencesFile, userDataFolder);
    var b = prefFile;

    b.open('r');

    var numbOfTextLines = 0;

    while (!b.eof) {

        textArrayToWritie[numbOfTextLines] = b.readln();

        if (textArrayToWritie[numbOfTextLines].search( searchedPhrase + '=ON') != -1) { //It can't be == 1 and can't work that way, but I have no idea why
            var textToReplace = searchedPhrase + '=OFF';

            textArrayToWritie[numbOfTextLines] = textToReplace;
            var alertText = textToReplace;
        }

        else if (textArrayToWritie[numbOfTextLines].search( searchedPhrase + '=OFF') != -1) { //It can't be == 1 and can't work that way, but I have no idea why
            var textToReplace = searchedPhrase + '=ON';

            textArrayToWritie[numbOfTextLines] = textToReplace;
            var alertText = textToReplace;
        }

        numbOfTextLines++;
    }

    if (isUndefined(textToReplace)) {
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

function setValuesOfPrefs(changedPreference, onOffValueNextToButton, userDataFolder) {

    var alertText = changeValueOffOnInPrefFile(changedPreference, userDataFolder);

    var updateValue = readValueOfSeetingsFromPrefFile(changedPreference, userDataFolder);
    onOffValueNextToButton.text = updateValue;

    alert(alertText); //Show user value of changed preference
}

function ErrorWrongStringInputPath(UItitlePath) {

    if ( UItitlePath !== "Destination folder..." && UItitlePath !== "Source folder..." &&
        !UItitlePath.exists && UItitlePath.toString() === decodeURIComponent(app.path) ) { //Default value when path of File/Folder can't be found is Folder path of runned app

        throw new Error("Invalid string. String is neither path nor default expression");
    }
}

function isUndefined(variable) {
    return typeof variable === "undefined";
}