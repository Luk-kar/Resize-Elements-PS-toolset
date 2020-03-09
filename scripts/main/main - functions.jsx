/*
using from "../settings/settings - functions.jsx":
- appData
- prefFileKeys
- userDataFolder
- isUndefined()
- readValueOfSeetingsFromPrefFile()
- createFilePath()
- getScriptFolder()
*/

function createPanelUI(objectParent, orientationChildren, alignChildren, alignmentObject) {
    
    var objectChildGroup = objectParent.add("panel");
    if (!isUndefined(orientationChildren)) objectChildGroup.orientation = orientationChildren; //to add possiblity to set only one property
    if (!isUndefined(alignChildren)) objectChildGroup.alignChildren = alignChildren; //to add possiblity to set only one property
    objectChildGroup.alignment = alignmentObject;  

    return objectChildGroup;
}

function createGroupUI(objectParent, orientationChildren, alignChildren, alignmentObject) {

    var objectChildGroup = objectParent.add("group");
    if (!isUndefined(orientationChildren)) objectChildGroup.orientation = orientationChildren; //to add possiblity to set only one property
    if (!isUndefined(alignChildren)) objectChildGroup.alignChildren = alignChildren; //to add possiblity to set only one property
    objectChildGroup.alignment = alignmentObject;

    return objectChildGroup;
}

function getGrandParentfolder() {

    var sriptPath = decodeURIComponent($.fileName); // "./" or ".//" can be used only in #include to give relative script path directory. There is undocumented bug, when you use it in File/Folder object it gives path to PS program directory

    var scriptFolder = getScriptFolder(sriptPath).toString().slice(0, -1); // slice(0, -1) is last char "/", you remove this

    var scriptParentFolder = getScriptFolder(scriptFolder).toString().slice(0, -1);

    var scriptGrandParentFolder = getScriptFolder(scriptParentFolder);
    
    return scriptGrandParentFolder;
}

var _btnChooseFilesSourceFold_= {};

_btnChooseFilesSourceFold_.filesEqual0 = function(self, UI) {

    self.sourceFolder === null; // to avoid bug It has to be reset becouse there could be possibility that old path could be passed;

    createFolderPath(UI.btnChooseFilesSourceFold.title, "Source folder...");

    panelFilterFilesEnabled(false, UI);
    UI.panelDestFold.title.enabled = false;
    btnsRadDestFoldEnabled(false, UI);

    btnChooseFilesDestFoldEnabled(false, UI);

    UI.panelChangeFile.enabled = false;
    UI.btnAccept.enabled = false;

    infoFilesUIUpdate(undefined, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);
    
    alert("In choosed folder there is no files to process");
}

_btnChooseFilesSourceFold_.filesMoreThan0 = function(self, UI, sourceFilesFiltered, sameChoosedSourceFolderAsBefore) {

    self.sourceFilesPSDformat = null;
    self.sourceFilesPSDformat = addingFilteredFilesToSourceFiles(sourceFilesFiltered);
    self.sourceFolderFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG); // if any boxes are checked, then it is filtered by ceratain checkboxes; if it is not, then you have only psd format

    createFolderPath(UI.btnChooseFilesSourceFold.title, self.sourceFolder);

    panelFilterFilesEnabled(true, UI);
    UI.panelDestFold.title.enabled = true;
    btnsRadDestFoldEnabled(true, UI);

    infoFilesUIUpdate(self.sourceFolderFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

    //Actions depended on choosed or not, destination folder
    outcomeChoosedDestinationFolder(self.detinationFolder, self.sourceFolder, UI.btnRadDestFold.same, UI.btnRadDestFold.other, self, UI);

    //If you choose new folder you will be noticed how many files are inside
    if (sameChoosedSourceFolderAsBefore === false) {
        alertUserHowManyFilesAreInFolder(self.sourceFolderFilesToProcess);
    }
}

function outcomeChoosedDestinationFolder(detinationFolder, sourceFolder, btnRadDestFold_same, btnRadDestFold_other, self, UI) {

    if (isUndefined(detinationFolder)) {
        btnRadDestFold_same.notify();
    }

    else if ((!isUndefined(detinationFolder)) && (detinationFolder !== null)) { //(detinationFolder !== null) to avoid bug It has to be reset becouse there could be possibility that old path could be passed;

        if ((!detinationFolder.toString().match(/\//) && !sourceFolder.toString().match(/\//))) {
            throw new Error("Invalid strings. Strings are not paths");
        }

        if (detinationFolder.toString() === sourceFolder.toString()) {
            sameSourceFolderAndDestFolderOutcome(UI, self);
        }
        else {
            btnRadDestFold_other.notify();
        }
    }
}

function alertUserHowManyFilesAreInFolder(sourceFilesToProcess) {

    if (sourceFilesToProcess.length < 0) {
        throw new Error("Array should contain at least one File");
    }
    if (sourceFilesToProcess.length > 1) {
        alert("In folder are " + sourceFilesToProcess.length + " files");
    }
    else if (sourceFilesToProcess.length === 1) {
        alert("In folder is 1 file");
    }
}

function btnChooseFilesSourceFoldEnabled(booleanValue, UI) {
    UI.btnChooseFilesSourceFold.enabled = booleanValue;
    UI.btnChooseFilesSourceFold.title.enabled = booleanValue;
}

function panelFilterFilesEnabled(booleanValue, UI) {

    if (booleanValue === true) {

        UI.filterSourceFilesCheckbox.enabled = true;
        UI.filterSourceFilesCheckbox.byExpression.enabled = true;
        filterSourceFilesCheckboxByExpressionEnabled(UI); // set to true

    } else if (booleanValue === false){

        UI.filterSourceFilesCheckbox.enabled = false;
        UI.filterSourceFilesByExpression.enabled = false;

    }
}

function filterSourceFilesCheckboxByExpressionEnabled(UI) {
    if (UI.filterSourceFilesCheckbox.byExpression.value === true) {
        UI.filterSourceFilesByExpression.enabled = true;
    }
    else if (UI.filterSourceFilesCheckbox.byExpression.value === false) {
        UI.filterSourceFilesByExpression.enabled = false;
    }
}

function btnChooseFilesDestFoldEnabled(booleanValue, UI) {
    UI.btnChooseFilesDestFold.enabled = booleanValue;
    UI.btnChooseFilesDestFold.title.enabled = booleanValue;
}

function btnsRadDestFoldEnabled(booleanValue, UI) {
    UI.btnRadDestFold.same.enabled = booleanValue;
    UI.btnRadDestFold.other.enabled = booleanValue;
}

function createFolderPath(textObject, path) {

    if (typeof path !== "string") {
        var string = decodeURIComponent(path.toString());  // string format is URl
    } else if (typeof path === "string") {
        var string = decodeURIComponent(path); // string format is URl
    }

    if (string.length > textObject.characters) {
        textObject.text = "..." + string.slice(-(textObject.characters));
    }
    else if (textObject.characters >= string.length) {
        textObject.text = string;
    }
}

function sameSourceFolderAndDestFolderOutcome(UI, self) {

    createFolderPath(UI.btnChooseFilesDestFold.title, "Destination folder...");
    self.detinationFolder = null; //to avoid bug; It has to be reset becouse there could be possibility that old path could be passed;
    UI.btnRadDestFold.same.notify();
    
    alert("Source folder and target folder are the same.\nNext time choose more wisely");

}

function checkingIfItIsTheSameSourceFolderAsBefore(self) {

    var sameChoosedSourceFolderAsBefore = false;
    if ((!isUndefined(self.sourceFolderPathRecent)) && (self.sourceFolder.toString() === self.sourceFolderPathRecent.toString())) { //typeof self.sourceFolderPathRecent !== "undefined" if you choose folder first time
        sameChoosedSourceFolderAsBefore = true;
    }
    return sameChoosedSourceFolderAsBefore;
}

function filteringSourceFiles(sourceFilesUnfiltered, regex) {

    var sourceFilesFiltered = new Array;

    if(isUndefined(regex)) {
        throw new Error("RegEx is undefined");
    }

    for (var i = 0; i < sourceFilesUnfiltered.length; i++) { 
            
            var sourceFilePathString = sourceFilesUnfiltered[i].toString();

            var sourceFileToMatch = decodeURIComponent(sourceFilePathString);

            if (sourceFileToMatch.match(regex)) {// decodeURIComponent(), to avoid problem when you have special signs in source files and in byExpression

                sourceFilesFiltered.push(File(sourceFilePathString));
        }
    }
    
    return sourceFilesFiltered;
}

function filterFilesByCheckboxes( sourceFilesPSDformat, UI, UI_filterSourceFilesCheckbox_byExpression, UI_filterSourceFilesCheckbox_PNG) {

    var regex = convertTextInputIntoRegex(UI.filterSourceFilesByExpression.input);

    var sourceFilesByExpression = filterFilesByExpression(regex, sourceFilesPSDformat);

    var sourceFilesPNG = filterFilesByPNG(sourceFilesPSDformat);

    var sourceFilesPNGandByExpression = filterFilesByExpression(regex, sourceFilesPNG);


    if ((UI_filterSourceFilesCheckbox_byExpression.value === true) && (UI.filterSourceFilesByExpression.input.text !== "")) { //Filtering by expression is ON by text inputed by User and choosed checkbox, if filtering by PNG is choosed also, it could be filtered additionally.

        if (UI_filterSourceFilesCheckbox_PNG.value === false) { 

            var sourceFilesToProcess = sourceFilesByExpression;
        }
        else if (UI_filterSourceFilesCheckbox_PNG.value === true) {

            var sourceFilesToProcess = sourceFilesPNGandByExpression;
        }

    }
    else if ((UI_filterSourceFilesCheckbox_byExpression.value === false) || (UI.filterSourceFilesByExpression.input.text === "")) { //Filtering by expression is OFF when there is no text input or checkbox is not choosed, the only options left are files from source folder or source files filtered by PNG.

        if (UI_filterSourceFilesCheckbox_PNG.value === false) {

            var sourceFilesToProcess = sourceFilesPSDformat;
        }
        else if (UI_filterSourceFilesCheckbox_PNG.value === true) {

            var sourceFilesToProcess = sourceFilesPNG;
        }
    }

    return sourceFilesToProcess;
}

function convertTextInputIntoRegex(input) {

    var string = input.text;

    try {
        $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "Syntax error".
        var regex = new RegExp(string);
        $.level = 1; //Set to level: 1 to reset debug
    }
    catch (e) {
        alert("The RegEx is invalid:\n" + "/" + string + "/");
    }
    
    return regex;
}

function filterFilesByExpression(regex, unfilteredFiles) {

    var properFilesByExpression = regex;

    var sourceFilesByExpression = filteringSourceFiles( unfilteredFiles, properFilesByExpression);

    return sourceFilesByExpression;
}

function filterFilesByPNG(unfilteredFiles) {

    var properFilesPNG = /\.png$/;
    var sourceFilesPNG = filteringSourceFiles(unfilteredFiles, properFilesPNG);

    return sourceFilesPNG;
}

function addingFilteredFilesToSourceFiles(sourceFilesFiltered) {

    var sourceFiles = new Array;

    for (var i = 0; i < sourceFilesFiltered.length; i++) {
                sourceFiles.push(File(sourceFilesFiltered[i]));
    }

    return sourceFiles;
}

function checkingIfDestFoldAndSourceFoldAreTheSame(UI, destinationFolderSelection, self_sourceFolderPathRecent, self) { // <--- used only in onBtnChooseFilesDestFold

    if ( destinationFolderSelection.toString() !== self_sourceFolderPathRecent.toString() ) {

        createFolderPath(UI.btnChooseFilesDestFold.title, destinationFolderSelection);
        self.lockingUnlockingAcceptBtn();
        UI.panelChangeFile.enabled = true;

        var self_detinationFolder = destinationFolderSelection;

    } else if ( destinationFolderSelection.toString() === self_sourceFolderPathRecent.toString() ) {

        var self_detinationFolder = self_sourceFolderPathRecent;
        sameSourceFolderAndDestFolderOutcome(UI, self);
    }

    return self_detinationFolder;
}

//Used later to dispaly names of opened files
function docsOpenedFiles() { //https://stackoverflow.com/questions/59896445/how-to-check-if-opened-file-is-saved-on-drive-cs6-script

    var openedDocsToProcess = new Array;
    var failed = false;
    var temp;
  
    for (var i = 0; i < app.documents.length; i++) {
      
        try 
        {
            $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
            temp = app.documents[i].fullName; //catching "Error 8103: The document has not yet been saved."
            $.level = 1; //Set to level: 1 to reset debug
        }
        catch(e)
        {
            continue;
        }

        openedDocsToProcess.push(app.documents[i]);
    }
  
    return openedDocsToProcess;
}

function infoFilesUIUpdate(sourceFiles, numbOfDisplayedFiles, panelInfoUITitle, panelInfoUIwriteLines) {

    var previewDocNames = new Array; //Set here to avoid scope issues

    var filesNamesInfoUI = formatText(numbOfDisplayedFiles, previewDocNames, sourceFiles);

    infoUIwriteText(previewDocNames, filesNamesInfoUI.length, panelInfoUITitle, panelInfoUIwriteLines);
} 

function formatText(numbOfDisplayedFiles, previewDocNames, sourceFiles) {

    for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) {
        previewDocNames[i] = "";
    }

    previewDocNames[0] = "no files to process";

    var filesNamesInfoUI = new Array(0);

    if (!isUndefined(sourceFiles)) {

        for (var i = 0; i < sourceFiles.length; i++) {
            filesNamesInfoUI[i] = decodeURIComponent(sourceFiles[i].name); // string format is URl
        }
    }

    //Writing files names
    if (filesNamesInfoUI.length > 0) {

        for (var i = 0; (i < numbOfDisplayedFiles) && (i < filesNamesInfoUI.length); i++) {
            previewDocNames[i] = filesNamesInfoUI[i];
        }

        var charComas = new Array;
        for (var i = 0; (i < numbOfDisplayedFiles) && (i < filesNamesInfoUI.length - 1); i++) {
            charComas[i] = ",";
            previewDocNames[i] += charComas[i];
        }

        if (filesNamesInfoUI.length > numbOfDisplayedFiles) {
            previewDocNames[numbOfDisplayedFiles] = "(...)";
        }
    }

    return filesNamesInfoUI;
}

function infoUIwriteText(filesNames, filesNumbers, panelInfoUITitle, panelInfoUIwriteLines) {

    for (var i = 0; i < panelInfoUIwriteLines.length; i++) {
        panelInfoUIwriteLines[i].text = filesNames[i];
    }

    if (filesNumbers < 0) {
        throw new Error("Invalid number. It can't have negative value");
    }
    
    panelInfoUITitle.text =  "Files to process: " + filesNumbers;
}

function changeFileAndSave(sourceFolderFiles, detinationFolder, 
    btnRadChooseFilesActiveDocs, btnRadChooseFilesSourceFold, 
    btnRadSameFolder, btnRadDestFoldOther, 
    self, executeScript, preferencesFile, appData_changedFilesList, userDataFolder) {

    self.countChangedFilesTrue = new Number(0);
    self.countChangedFilesFalse = new Number(0);

    var logFiles_Value = readValueOfSeetingsFromPrefFile(prefFileKeys.changedFileListLog, preferencesFile, userDataFolder);

    sourceFolderFiles = self.startingFunction(); // sourceFiles = self.startingFunction() if you want to filter files again due to conditions contained in UI.panelChangeFile // returning this value is faster than checking condition in each file when you have to open them

    //If you choose radio button "Opened files"
    if (btnRadChooseFilesActiveDocs.value === true){

        _changeFileAndSave_.btnRadChooseFilesActiveDocs(self, self.changeFile, btnRadSameFolder, btnRadDestFoldOther, detinationFolder, logFiles_Value, executeScript, appData_changedFilesList, userDataFolder);

    //If you choose  radio button "Source folder"
    } else if (btnRadChooseFilesSourceFold.value === true) {

        _changeFileAndSave_.btnRadChooseFilesSourceFold(self, self.changeFile, sourceFolderFiles, executeScript, btnRadSameFolder, btnRadDestFoldOther, detinationFolder, logFiles_Value, appData_changedFilesList, userDataFolder);
    }

    self.endingFunction(); //Custom function depending on executeScript
}

var _changeFileAndSave_ = {};
_changeFileAndSave_.btnRadChooseFilesActiveDocs = function (self, self_changeFile, btnRadSameFolder, btnRadDestFoldOther, detinationFolder, logFiles_Value, executeScript, appData_changedFilesList, userDataFolder) {
    
    var docsToProcess = docsOpenedFiles();

    var previousSaveTimeSourceDoc = getModificationDate(docsToProcess); //This script must be executed first, because it will not be able to read the date value correctly if it will be executed just before save() or saveAs() it will be not enough time

    var alertPreviousAppearance = false; 

    for (var i = 0; i < docsToProcess.length; i++) {

        app.activeDocument = docsToProcess[i]; //choosing active document from source files

        var doNothingWithThisFile = self_changeFile(); //Custom function depending on executeScript
        
        if (doNothingWithThisFile === "continue") { // sometimes when some properties of document don't fit you, you can always leave untouched file, do move to the next one
            continue; //doc.close(); <=== this shouldn't be there. If you add this it will conflict with function confrimDialog_DoYouWantCloseOpenedFiles(openedDocs)
        }

        //If you choose radio button "Change file in the same folder", saves the same files in original location
        if (btnRadSameFolder.value === true) {

            _changeFileAndSave_.btnRadChooseFilesActiveDocs_btnRadSameFolder(alertPreviousAppearance, previousSaveTimeSourceDoc, i, self, logFiles_Value, executeScript, appData_changedFilesList, userDataFolder);

        //If you choose radio button "Copy and Change file to other folder", save files in other folder
        } else if (btnRadDestFoldOther.value === true) {

            _changeFileAndSave_.btnRadDestFoldOther(detinationFolder, self, logFiles_Value, executeScript, i ,appData.changedFilesList ,userDataFolder);
        }
    }
}

_changeFileAndSave_.btnRadChooseFilesActiveDocs_btnRadSameFolder = function (alertPreviousAppearance, previousSaveTimeSourceDoc, i, self, logFiles_Value, executeScript, appData_changedFilesList, userDataFolder) { // btnRadChooseFilesActiveDocs_btnRadSameFolder has to be separate object, becouse when btnRadSameFolder will be part of btnRadChooseFilesActiveDocs then there is propability of oversave

    var doc = app.activeDocument;
    
    try {
        $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
        doc.save();
        $.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
    }

    catch (e) {
        if (alertPreviousAppearance === false) { //If you would have to see alert each time, it would be annoying.

            alert("You have earlier opened file in destination folder.\n" +
                "You have choosed source files folder with the same file name as in destination folder.\n" +
                "You overwrote the file and now your opened file doesn't exist on drive.\n" +
                "Therefore you can't save it in original place, becouse it doesn't exist now\n" +
                "Check files " + '"save :false"' + ' in ChangedFilesList.log in script folder:\n' +
                userDataFolder.toString() + "\n" + //userDataFolder is folder object
                "to find file which wasn't saved");

            alertPreviousAppearance === true;
        }
    }

    var currentSaveTime = doc.path.modified;
    var isFileSaved = saveFileValidation(previousSaveTimeSourceDoc[i], currentSaveTime, doc);
    countSavedFiles(isFileSaved, self);

    if (logFiles_Value === ':  ON ') {

        changedFileList_002_WriteCurrentFileData(executeScript, i, doc, currentSaveTime, isFileSaved, appData_changedFilesList, userDataFolder);
    }
}

_changeFileAndSave_.btnRadDestFoldOther = function (detinationFolder, self, logFiles_Value, executeScript, i, appData_changedFilesList, userDataFolder) {

    var doc = app.activeDocument;

    saveInDestFolder(detinationFolder);

    var currentSaveTime = new Date; // It couldn't retrieve correctly this information from the path file
    
    var name = doc.name;
    var path = detinationFolder;

    var saveAsFile = File(path + "/" + name);
    var currentSaveTime = doc.path.modified;

    var isFileSaved = saveFileValidation(undefined, currentSaveTime, doc);
    countSavedFiles(isFileSaved, self);

    if (logFiles_Value === ':  ON ') {
        changedFileList_002_WriteCurrentFileData(executeScript, i, saveAsFile, currentSaveTime, isFileSaved, appData_changedFilesList, userDataFolder);
    }
}

_changeFileAndSave_.btnRadChooseFilesSourceFold = function (self, self_changeFile, sourceFolderFiles, executeScript, btnRadSameFolder, btnRadDestFoldOther, detinationFolder, logFiles_Value, appData_changedFilesList, userDataFolder) {

    if (self.openedDocsToReopen.length > 0) { // There is possiblity that previously opened doc in PS and in source folder are the same. So to prevend this, closed opened doc is retrieved at the end of work of script
        self.openDocsToRecover = new Array;
    }

    for(var i = 0; i < sourceFolderFiles.length; i++) {

        var previousSaveTimeSourceDoc = sourceFolderFiles[i].path.modified; //read this value before you open file to avoid false reading

        open(sourceFolderFiles[i]);

        var doc = app.activeDocument;
        var activeDoc = doc.fullName;
        
        var doNothingWithThisFile = self_changeFile(); //Custom function depending on executeScript
        if (doNothingWithThisFile === "continue") { // sometimes when some properties of document don't fit you, you can always leave untouched file
            doc.close();
            continue;
        }

        //If you choose radio button "Change file in the same folder", saves the same files in original location
        if (btnRadSameFolder.value === true) {

            _changeFileAndSave_.btnRadChooseFilesSourceFold_btnRadSameFolder(previousSaveTimeSourceDoc, self, logFiles_Value, executeScript, i, appData_changedFilesList, userDataFolder);

        //If you choose radio button "Copy and Change file to other folder", save files in other folder
        } else if (btnRadDestFoldOther.value === true) {

            _changeFileAndSave_.btnRadDestFoldOther(detinationFolder, self, logFiles_Value, executeScript, i, appData_changedFilesList, userDataFolder);
        }

        // There is possiblity that previously opened doc in PS and in source folder are the same. So to prevend this, closed opened doc is retrieved at the end of work of script
        _changeFileAndSave_.btnRadChooseFilesSourceFold.openDocsToRecover(self, activeDoc);

        doc.close();
    }
}

_changeFileAndSave_.btnRadChooseFilesSourceFold_btnRadSameFolder = function (previousSaveTimeSourceDoc, self, logFiles_Value, executeScript, i, appData_changedFilesList, userDataFolder) {

    var doc = app.activeDocument;

    doc.save();

    var currentSaveTime = doc.path.modified;

    var isFileSaved = saveFileValidation(previousSaveTimeSourceDoc, currentSaveTime, doc);

    countSavedFiles(isFileSaved, self);

    if (logFiles_Value === ':  ON ') {
        changedFileList_002_WriteCurrentFileData(executeScript, i, doc, currentSaveTime, isFileSaved, appData_changedFilesList, userDataFolder);
    }
}

_changeFileAndSave_.btnRadChooseFilesSourceFold.openDocsToRecover = function (self, activeDoc) {

    if (self.openedDocsToReopen.length > 0) {

        var fileToRecover = matchDocs(activeDoc, self.openedDocsToReopen);

        if (fileToRecover !== null)
            self.openDocsToRecover.push(fileToRecover);
    }
}

function countSavedFiles(isFileSaved, self) { 
    
    if (isFileSaved)
        self.countChangedFilesTrue++;
    if (!isFileSaved)
        self.countChangedFilesFalse++;
}

function matchDocs(activeDocFile, openedDocsFiles) {

    var recoverDocs = null;

    for (var i = 0; i < openedDocsFiles.length; i++) {

        if ( activeDocFile.toString() === openedDocsFiles[i].toString() ) {
            var recoverDocs = openedDocsFiles[i];

            if (!recoverDocs.exists) {
                throw new Error("Invalid Path file. File doesn't exist");
            }
            break;
        }
    }
    return recoverDocs;
}

function getModificationDate(docsToProcess) {

    var previousSaveTime = new Array;

    for (var i = 0; i < docsToProcess.length; i++) {
        previousSaveTime.push(docsToProcess[i].path.modified);
    }
    return previousSaveTime;
}

function changedFileList_002_WriteCurrentFileData(executeScript, index, doc, currentSaveTime, isFileSaved, appData_changedFilesList, userDataFolder) {

    var scriptName = executeScript;

    var counter = ('00000' + (index + 1)).slice(-6); // Prefix 5 zeros, and get the last 6 chars

    var docName = decodeURIComponent(doc.name); // if doc is not objects of documents, but not opened in PS file somewhere in hard drive, you get URl format which you have to decode
    var docFullName = decodeURIComponent(doc.fullName);

    var listFile = createFilePath(appData_changedFilesList, userDataFolder);
    var c = listFile;

    if (typeof isFileSaved !== "boolean") {
        throw new Error ("isFileSaved is not Boolean");
    }
    if (scriptName.split(" ").length !== 2 || !scriptName.match(/[a-z]/i)) {
        throw new Error('Wrongly formated name of "var executeScript" in controlPanel.jsx in folder: ' + scriptFolder);
    }
    if (Object.prototype.toString.call(currentSaveTime) !== '[object Date]') {
        throw new Error ("currentSaveTime is not a Date object");
    }

    c.open("a");
    c.writeln(counter + " save :" + isFileSaved.toString() + " <0> " + docName + " <1> " + scriptName + " <2> " + currentSaveTime + " <3> " + docFullName);
    c.close();
}

function saveInDestFolder(detinationFolder) {

    var doc = app.activeDocument;

    //Declaring name of saved file
    var name = doc.name;

    var path = detinationFolder;

    if (!Folder(path).exists) {
        throw new Error("Invalid Path file. Folder doesn't exist");
    }

    var imageTypes = [
        [/\.png$/, savePNG],
        [/\.psd$/, savePSD],
        [/\.jpg$/, saveJPEG],
        [/\.tif$/, saveTIFF],
        [/\.bmp$/, saveBMP],
        [/\.gif$/, saveGIF],
    ];

    for( var j = 0 ; j < imageTypes.length; j++ ){
        if (name.match(imageTypes[j][0])) {

            var saveFile = File(path + "/" + name);
            if(saveFile.exists) {
                saveFile.remove();
            }

            (imageTypes[j][1])(saveFile);
            break;
        }
    }
    if (j === imageTypes.length) {
        throw new Error("Unhandled type for "+ name)
    }
}

function savePNG(saveFile) {
    
    var pngFile = new File(saveFile);
    var pngSaveOptions = new PNGSaveOptions();
    activeDocument.saveAs(pngFile, pngSaveOptions);
    
}

function savePSD(saveFile) {

    var psdFile = new File(saveFile);
    var psdSaveOptions = new PhotoshopSaveOptions();

    activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}


function saveJPEG(saveFile) {

    var jpegFile = new File(saveFile);
    var jpegSaveOptions = new JPEGSaveOptions();
    jpegSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpegSaveOptions.quality = 10;

    activeDocument.saveAs(jpegFile, jpegSaveOptions, false, Extension.LOWERCASE);
}


function saveTIFF(saveFile) {

    var tiffFile = new File(saveFile);
    var tiffSaveOptions = new TiffSaveOptions();
    tiffSaveOptions.embedColorProfile = true;

    activeDocument.saveAs(tiffFile, tiffSaveOptions);
}


function saveBMP(saveFile) {

    var bmpFile = new File(saveFile);
    var bmpSaveOptions = new BMPSaveOptions();
    activeDocument.saveAs(bmpFile, bmpSaveOptions);

}

function saveGIF(saveFile) {

    var gifFile = new File(saveFile);
    var gifSaveOptions = new GIFSaveOptions();
    activeDocument.saveAs(gifFile, gifSaveOptions);

}

function changedFileList_001_writeDate(changedFilesList, userDataFolder) {

    var listFile = createFilePath(changedFilesList, userDataFolder);
    var b = listFile;

    var date = new Date;

    b.open("a");
    b.writeln("==== " + date + " ============================================================================================================");
    b.writeln("");
    b.close();
}

function changedFileList_003_writeEmptyMarginLine(changedFilesList, userDataFolder) {

    var listFile = createFilePath(changedFilesList, userDataFolder);
    var d = listFile;
    
    d.open("a");
    d.writeln("");
    d.close();
}
function retrievePreviuslyOpenedFiles(btnRadSourceFiles_chooseOpenedFiles, btnRadSourceFiles_chooseFilesSourceFold, openDocsToRecover, openedDocsToReopen, preferencesFile) {

    if (btnRadSourceFiles_chooseOpenedFiles.value === true) {
        confrimDialog_DoYouWantCloseOpenedFiles(openedDocsToReopen, preferencesFile);
    }

    else if (btnRadSourceFiles_chooseFilesSourceFold.value === true && !isUndefined(openDocsToRecover) && openDocsToRecover !== null) {
        openFiles(openDocsToRecover);
    }
}

function showUserSummaryOfProcessedFiles(executeScript, countChangedFilesTrue, countChangedFilesFalse, sourceFolderNameRecent, detinationFolder, btnRadSourceFiles, btnRadDestFold) {

    var scriptName = executeScript;
    var scriptFolder = $.fileName.slice(0, -16);

    if (scriptName.split(" ").length !== 2 || !scriptName.match(/[a-z]/i)) {
        throw new Error('Wrongly formated name of "var executeScript" in controlPanel.jsx in folder: ' + scriptFolder);
    }

    var verbPastParticiple = simplePastRegularForm(scriptName); //"ed" regular form
    var noun = scriptName.split(" ")[1];

    if (countChangedFilesTrue < 0) {
        throw new Error("Counter can't be less than integer = 0");
    }

    if (countChangedFilesFalse < 0) {
        throw new Error("Counter can't be less than integer = 0");
    }

    if (countChangedFilesTrue > 1 || countChangedFilesTrue === 0) { //Yes, there is possibility that you do not process any files if you can filter files only when the are open
        var files = "files";
    }

    else if (countChangedFilesTrue === 1) {
        var files = "file";
    }

    if (btnRadSourceFiles.chooseOpenedFiles.value === true) {

        alert("You " + verbPastParticiple + " " + noun + " to " + countChangedFilesTrue + " " + files);
        showUnsavedFilesAlert(countChangedFilesFalse, scriptFolder);
    }

    else if (btnRadSourceFiles.chooseFilesSourceFold.value === true) {
        var folderName = "";

        if (btnRadDestFold.same.value === true) {

            folderName = decodeURIComponent(sourceFolderNameRecent); // string format is URl
        }
        else if (btnRadDestFold.other.value === true) {

            folderName = decodeURIComponent(detinationFolder.name); // string format is URl
        }

        alert("You " + verbPastParticiple + " " + noun + " to " + countChangedFilesTrue + " " + files + ",\nin folder: " + '"' + folderName + '"');
        showUnsavedFilesAlert(countChangedFilesFalse, scriptFolder);
    }
}

function confrimDialog_DoYouWantCloseOpenedFiles(openedDocs, preferencesFile) {

    var DoNotShowCloseOpenedFiles_ON_OFF = readValueOfSeetingsFromPrefFile(prefFileKeys.closeDialogOpenFiles, preferencesFile, userDataFolder);

    if (DoNotShowCloseOpenedFiles_ON_OFF === ':  ON ') {
        var closeOpenedFilesConfirmation = confirm("Do you want to close all opened files?");

    } else if (DoNotShowCloseOpenedFiles_ON_OFF === ':  OFF') {
        var closeOpenedFilesConfirmation = false;

    }

    for (var i = 0; i < openedDocs.length; i++) {

        var activeDoc = openedDocs[i];
        activeDoc = app.activeDocument;
        activeDoc.close();
    }

    // To avoid bug with unability with "saving as" opened files, again after evoking script again (propably it cn't find path of opened files)
    if (!closeOpenedFilesConfirmation) {
        for (var i = 0; i < openedDocs.length; i++) {
            open(openedDocs[i]);
        }
    }

}

function gettingFilesOpenedDocsToReopen() {

    var openedDocsToGetFiles = docsOpenedFiles();
    var openedDocsToReopen = new Array;
    for (var i = 0; i < openedDocsToGetFiles.length; i++) {
        openedDocsToReopen.push(openedDocsToGetFiles[i].fullName);
    }

    return openedDocsToReopen;
}

function simplePastRegularForm(scriptName) { // https://www.lawlessenglish.com/learn-english/grammar/simple-past-regular-verbs/ //It works in most cases for regular verbs

    var verb = scriptName.split(" ")[0];

    var lastCharOfVerb = verb.slice(-1);

    var TwolastCharOfVerb = verb.slice(-2);

    var ThirdLastCharOfVerb = verb.charAt(verb.length -3).toLowerCase();;

    if(lastCharOfVerb === "e") {
        var verbInPastSimple = verb.slice(0, -1) + "ed";

    } else if (TwolastCharOfVerb === "ay" || TwolastCharOfVerb === "ey" || TwolastCharOfVerb === "iy" || TwolastCharOfVerb === "oy" || TwolastCharOfVerb === "uy") {
        var verbInPastSimple = verb + "ed";

    } else if (lastCharOfVerb === "y") {
        var verbInPastSimple = verb.slice(0, -1) + "ied";

    } else if ( ( isNaN(parseInt(ThirdLastCharOfVerb, 10)) === true )  && (lastCharOfVerb !== "a" && lastCharOfVerb !== "e" && lastCharOfVerb !== "i" && lastCharOfVerb !== "o" && lastCharOfVerb !== "u") &&
    (ThirdLastCharOfVerb !== "a" && ThirdLastCharOfVerb !== "e" && ThirdLastCharOfVerb !== "i" && ThirdLastCharOfVerb !== "o" && ThirdLastCharOfVerb !== "u")) {

        var verbInPastSimple = verb + lastCharOfVerb + "ed"
    
    } else {
        var verbInPastSimple = verb + "ed";
    }

    return verbInPastSimple;
}

function openFiles(self_openDocsToRecover) {

    for (var i = 0; i < self_openDocsToRecover.length; i++) {

        open(self_openDocsToRecover[i]);
    }
}

function showUnsavedFilesAlert(self_countChangedFilesFalse, scriptFolder) {

    if (self_countChangedFilesFalse > 0) {
        alert("Save of " + self_countChangedFilesFalse + " files was unseccesful.\nPlease check list of unsaved files in " + appData.changedFilesList + " in folder: " + scriptFolder);
    }
}

//Check the time of PREVIOUS save of the file against the save time of the CURRENT file
function saveFileValidation(previousSaveTime, currentSaveTime, savedFile) {
    
    if (isUndefined(previousSaveTime)) {
        var previousSaveTime = dateAdd(currentSaveTime, 'second', -1); // add one second to accept validation when you saveAs source document/open document in target director 
    }

    if (previousSaveTime < currentSaveTime) {
        //Call the file exists function
        var isFileSaved = fileExists(savedFile);

    } else {
        var isFileSaved = false;

    }
    
    return isFileSaved;
}

//Check to see if the file actually exists
function fileExists(savedFile) {
    var file = File(savedFile.path);
    return file.exists
}

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
function dateAdd(date, interval, units) {
    if(!(date instanceof Date))
      return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      case 'milisecond' :  ret.setTime(ret.getTime() + units);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
  }

//==========================================