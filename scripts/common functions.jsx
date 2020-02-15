// Functions are used in both files: settings.jsx and main.jsx

// Mainly in settings.jsx ================================================================================================================================

function readValueOfSeetingsFromPrefFile(searchedPhrase) {

    var textArrayToWritie = [];
    var prefFile = createPrefFilePath();
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

    var listFile = createListFilePath();
    buildListFilesIfItDoesntExists(listFile);

    var prefFile = createPrefFilePath();
    buildPrefFilesIfItDoesntExists(prefFile);

}

function createPrefFilePath() {

    var scriptParentFolder = getParentfolder(); // slice negative numb is length of file folder

    var listFile = new File(scriptParentFolder + "scriptUI_preferences.txt");
    ErrorWrongStringInputPath(listFile);

    return listFile;
}

function createListFilePath() {

    var scriptParentFolder = getParentfolder(); // slice negative numb is length of file folder

    var listFile = new File(scriptParentFolder + "scriptUI_changedFilesList.txt");

    ErrorWrongStringInputPath(listFile);
    
    return listFile;
}

function getParentfolder() {

    var sriptPath = decodeURIComponent($.fileName); // "./" or ".//" can be used only in #include to give relative script path directory. There is undocumented bug, when you use it in File/Folder object it gives path to PS program directory 
    var scriptFolder = getScriptFolder(sriptPath);
    var scriptParentFolder = scriptFolder.toString().slice(0, -8); // slice negative numb is length of file folder
    
    return scriptParentFolder;
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
    var prefFile = createPrefFilePath();
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

// Mainly in main.jsx ====================================================================================================================================

function createPanelUI(objectParent, orientationChildren, alignChildren, alignmentObject) {
    
    var objectChildGroup = objectParent.add("panel");
    if (typeof orientationChildren !== "undefined") objectChildGroup.orientation = orientationChildren; //to add possiblity to set only one property
    if (typeof alignChildren !== "undefined") objectChildGroup.alignChildren = alignChildren; //to add possiblity to set only one property
    objectChildGroup.alignment = alignmentObject;

    return objectChildGroup;
}

function createGroupUI(objectParent, orientationChildren, alignChildren, alignmentObject) {

    var objectChildGroup = objectParent.add("group");
    if (typeof orientationChildren !== "undefined") objectChildGroup.orientation = orientationChildren; //to add possiblity to set only one property
    if (typeof alignChildren !== "undefined") objectChildGroup.alignChildren = alignChildren; //to add possiblity to set only one property
    objectChildGroup.alignment = alignmentObject;

    return objectChildGroup;
}

function btnChooseFilesSourceFoldEnabled(trueFalse, UI) {
    UI.btnChooseFilesSourceFold.enabled = trueFalse;
    UI.btnChooseFilesSourceFold.title.enabled = trueFalse;
}

function plnFilterFilesEnabled(trueFalse, UI) {

    if (trueFalse === true) {

        UI.filterSourceFilesCheckbox.enabled = true;
        UI.filterSourceFilesCheckbox.byExpression.enabled = true;
        filterSourceFilesCheckboxByExpressionEnabled(UI); // set to true

    } else if (trueFalse === false){

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

function btnChooseFilesDestFoldEnabled(trueFalse, UI) {
    UI.btnChooseFilesDestFold.enabled = trueFalse;
    UI.btnChooseFilesDestFold.title.enabled = trueFalse;
}

function btnsRadDestFoldEnabled(trueFalse, UI) {
    UI.btnRadDestFold.same.enabled = trueFalse;
    UI.btnRadDestFold.other.enabled = trueFalse;
}

function createPathString(textObject, path) {

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

    createPathString(UI.btnChooseFilesDestFold.title, "Destination folder...");
    self.detinationFolder = null; //to avoid bug
    UI.btnRadDestFold.same.notify();
    
    alert("Source folder and target folder are the same.\nNext time choose more wisely");

}

function checkingIfItIsTheSameSourceFolderAsBefore(self) {

    var sameChoosedSourceFolderAsBefore = false;
    if ((typeof self.sourceFolderPathRecent !== "undefined") && (self.sourceFolder.toString() === self.sourceFolderPathRecent.toString())) { //typeof self.sourceFolderPathRecent !== "undefined" if you choose folder first time
        sameChoosedSourceFolderAsBefore = true;
    }
    return sameChoosedSourceFolderAsBefore;
}

function filteringSourceFiles(sourceFilesUnfiltered, properFilesExtPSfiles) {

    var sourceFilesFiltered = new Array;

    if(typeof properFilesExtPSfiles === "undefined") {
        throw new Error("RegEx is undefined");
    }

    for (var i = 0; i < sourceFilesUnfiltered.length; i++) { 
        if (sourceFilesUnfiltered[i] instanceof File) {
            
            var sourceFilePathString = sourceFilesUnfiltered[i].toString();

            var sourceFileToMatch = decodeURIComponent(sourceFilePathString);

            if (sourceFileToMatch.match(properFilesExtPSfiles)) {// decodeURIComponent(), to avoid problem when you have special signs in source files and in byExpression

                sourceFilesFiltered[i] = sourceFilePathString; //You have to do in this way (not use push method), becouse later you need index value to match certain string with certain file in addingFilteredFilesToSourceFiles();
            } else {
                sourceFilesFiltered[i] = "";
            }

        } else {
            sourceFilesFiltered[i] = "";
        }
    }

    return sourceFilesFiltered;
}

function filterFilesByCheckboxes( sourceFilesPSDformat, UI, UI_filterSourceFilesCheckbox_byExpression, UI_filterSourceFilesCheckbox_PNG) {

    var regex = convertStringIntoRegex(UI.filterSourceFilesByExpression.input);

    var sourceFilesByExpression = filterFilesByExpression(regex, sourceFilesPSDformat);

    var sourceFilesPNG = filterFilesByPNG(sourceFilesPSDformat);

    var sourceFilesPNGandByExpression = filterFilesByExpression(regex, sourceFilesPNG);


    if ((UI_filterSourceFilesCheckbox_byExpression.value === true) && (UI.filterSourceFilesByExpression.input.text !== "")) {

        if (UI_filterSourceFilesCheckbox_PNG.value === false) {

            var sourceFilesToProcess = sourceFilesByExpression;
        }
        else if (UI_filterSourceFilesCheckbox_PNG.value === true) {

            var sourceFilesToProcess = sourceFilesPNGandByExpression;
        }

    }
    else if ((UI_filterSourceFilesCheckbox_byExpression.value === false) || (UI.filterSourceFilesByExpression.input.text === "")) {

        if (UI_filterSourceFilesCheckbox_PNG.value === false) {

            var sourceFilesToProcess = sourceFilesPSDformat;
        }
        else if (UI_filterSourceFilesCheckbox_PNG.value === true) {

            var sourceFilesToProcess = sourceFilesPNG;
        }
    }

    return sourceFilesToProcess;
}

function convertStringIntoRegex(input) {

    var string = input.text;

    try {
        $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
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

    var sourceFilesFiltered = filteringSourceFiles( unfilteredFiles, properFilesByExpression);
    var sourceFilesByExpression = addingFilteredFilesToSourceFiles(unfilteredFiles, sourceFilesFiltered);

    return sourceFilesByExpression;
}

function filterFilesByPNG(unfilteredFiles) {

    var properFilesPNG = /.png$/;
    var sourceFilesFiltered = filteringSourceFiles(unfilteredFiles, properFilesPNG);
    var sourceFilesPNG = addingFilteredFilesToSourceFiles(unfilteredFiles, sourceFilesFiltered);

    return sourceFilesPNG;
}

function addingFilteredFilesToSourceFiles(sourceFilesUnfiltered, sourceFilesFiltered) {

    var sourceFiles = new Array;

    for (var i = 0; i < sourceFilesUnfiltered.length; i++) {

            if (sourceFilesFiltered[i] === sourceFilesUnfiltered[i].toString()) {
                sourceFiles.push(sourceFilesUnfiltered[i]);
            
        }
    }

    return sourceFiles;
}

function checkingIfDestFoldAndSourceFoldAreTheSame(UI, destinationFolderSelection, self_sourceFolderPathRecent, self) { // <--- used only in onBtnChooseFilesDestFold

    if ( destinationFolderSelection.toString() !== self_sourceFolderPathRecent.toString() ) {

    createPathString(UI.btnChooseFilesDestFold.title, destinationFolderSelection);
    self.lockingUnlockingAcceptBtn();
    UI.pnlChangeFile.enabled = true;

    var self_detinationFolder = destinationFolderSelection;
    } else if ( destinationFolderSelection.toString() === self_sourceFolderPathRecent.toString() ) {

        sameSourceFolderAndDestFolderOutcome(UI, self);
    }

    return self_detinationFolder;
}

//Used later to dispaly names of opened files
function docsOpenedFiles() {

    var openedDocsToProcess = new Array;
    var failed = false;
    var temp;
  
    for (var i = 0; i < app.documents.length; i++) {
      
        try 
        {
            failed = false;
            $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
            temp = app.documents[i].fullName; //catching "Error 8103: The document has not yet been saved."
            $.level = 1; //Set to level: 1 to reset debug
        }
        catch(e)
        {
            failed = true;
        }
        if(!failed)
        {
            openedDocsToProcess.push(app.documents[i]);
        }
    }
  
    return openedDocsToProcess;
}

function infoFilesUIUpdate(sourceFiles, numbOfDisplayedFiles, panelInfoUITitle, panelInfoUIwriteLines) {

    var prevDocNames = new Array;

    for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) {
        prevDocNames[i] = "";
    }
    prevDocNames[0] = "no files to process";

    if (typeof sourceFiles === "undefined") {
        var filesNamesInfoUI = [];
    } else if (typeof sourceFiles !== "undefined") {
        var filesNamesInfoUI = new Array;
        for (var i = 0; i < sourceFiles.length; i++) {
            filesNamesInfoUI[i] = decodeURIComponent(sourceFiles[i].name);  // string format is URl
        }
    }

    //Writing files names
    if (filesNamesInfoUI.length > 0) {

        for (var i = 0; (i < numbOfDisplayedFiles) && (i < filesNamesInfoUI.length); i++) {

            prevDocNames[i] = filesNamesInfoUI[i];
        }

        var charComas = new Array;
        for (var i = 0; (i < numbOfDisplayedFiles) && (i < filesNamesInfoUI.length -1); i++) {

            charComas[i] = ",";
            prevDocNames[i] += charComas[i];
        }

        if (filesNamesInfoUI.length > numbOfDisplayedFiles) {

            prevDocNames[numbOfDisplayedFiles] = "(...)";
        }
    }

    infoUIwriteText(prevDocNames, filesNamesInfoUI.length, panelInfoUITitle, panelInfoUIwriteLines);
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

function changeFileAndSave(sourceFiles, detinationFolder, 
    btnRadChooseFilesActiveDocs, btnRadChooseFilesSourceFold, 
    btnRadSameFolder, btnRadDestFoldOther, 
    UI, self, executeScript) {

    self.counterChangedFilesTrue = new Number(0);
    self.counterChangedFilesFalse = new Number(0);

    var logFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG');

    sourceFiles = self.startingFunction(); // sourceFiles = self.startingFunction() if you want to filter files again due to conditions contained in UI.pnlChangeFile // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow

    //If you choose radio button "Opened files"
    if (btnRadChooseFilesActiveDocs.value === true){

        var docsToProcess = docsOpenedFiles();

        var previousSaveTimeSourceDoc = getModificationDate(docsToProcess); // This script must be executed first, because it will not be able to read the date value correctly if it will be executed just before save() or saveAs()

        self.alertPreviousAppearance = false; //declared value

        for (var i = 0; i < docsToProcess.length; i++) {

            app.activeDocument = docsToProcess[i]; //setting active document from filtered files
            var doc = app.activeDocument;

            var doNothingWithThisFile = self.changeFile();
            if (doNothingWithThisFile === "continue") { // sometimes when some properties of document don't fit you, you can always leave untouched file

                continue; //doc.close(); <=== this shouldn't be there. If you add this it will conflict with function confrimDialog_DoYouWantCloseOpenedFiles(openedDocs)
            }

            //If you choose radio button "Change file in the same folder", saves the same files in original location
            if (btnRadSameFolder.value === true) {

                try {
                    $.level = 0; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
                    doc.save();
                    $.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break //Set to level: 0 to avoid notification "The document has not yet been saved".
                }
                catch(e) {
                    if(self.alertPreviousAppearance === false) { //If you would have to see alert each time, it would be annoying.
                        alert("You have earlier opened file in destination folder.\n" + 
                            "If you choose source files folder with the same file as opened files in destination folder, it could cause bugs later.\n" + 
                            "And opened file couldn't be saved threfore.\n" + 
                            "Check files " + '"save :false"' + ' in scriptUI_changedFilesList.txt in script folder:\n' + 
                            $.fileName.slice(0, -16) ); // parent directory

                        self.alertPreviousAppearance === true;
                    }
                }

                var currentSaveTime = doc.path.modified;
            
                var isFileSaved = saveFileValidation(previousSaveTimeSourceDoc[i], currentSaveTime, doc);
                
                counterSavedFiles(isFileSaved, self);

                if (logFiles_ON_OFF === ':  ON ') {
                    writeLnOfFile(executeScript, i, doc, currentSaveTime, isFileSaved);
                }

            //If you choose radio button "Copy and Change file to other folder", save files in other folder
            } else if (btnRadDestFoldOther.value === true) {
                saveInDestFolder(detinationFolder);
                var currentSaveTime = new Date; // It couldn't retrieve this information from the path file

                var name = doc.name;
                var path = detinationFolder;
                var saveAsFile = File(path + "/" + name)

                var currentSaveTime = doc.path.modified;
            
                var isFileSaved = saveFileValidation(undefined, currentSaveTime, doc);
                
                counterSavedFiles(isFileSaved, self);

                if (logFiles_ON_OFF === ':  ON ') {
                    writeLnOfFile(executeScript, i, saveAsFile, currentSaveTime, isFileSaved);
                }
            }

            self.endingFunction();
        }
    
    //If you choose  radio button "Source folder"
    } else if (btnRadChooseFilesSourceFold.value === true) {

        if (self.openedDocsToReopen.length > 0) {
            self.openDocsToRecover = new Array; // To avoid bug when source files are the same what opened. And reopen them at the end of script
        }

        for(var i = 0; i < sourceFiles.length; i++) {

            var previousSaveTimeSourceDoc = sourceFiles[i].path.modified;

            open(sourceFiles[i]);

            var doc = app.activeDocument;
            var openedDocPath = doc.fullName;
            
            var doNothingWithThisFile = self.changeFile();
            if (doNothingWithThisFile === "continue") { // sometimes when some properties of document don't fit you, you can always leave untouched file
                doc.close();
                continue;
            }

            //If you choose radio button "Change file in the same folder", saves the same files in original location
            if (btnRadSameFolder.value === true) {
                doc.save();

                var currentSaveTime = doc.path.modified;
            
                var isFileSaved = saveFileValidation(previousSaveTimeSourceDoc, currentSaveTime, doc);
                
                counterSavedFiles(isFileSaved, self);
                
                if (logFiles_ON_OFF === ':  ON ') {
                    writeLnOfFile(executeScript, i, doc, currentSaveTime, isFileSaved);
                }

            //If you choose radio button "Copy and Change file to other folder", save files in other folder
            } else if (btnRadDestFoldOther.value === true) {

                saveInDestFolder(detinationFolder);
                var currentSaveTime = new Date; // It couldn't retrieve this information from the path file

                var name = doc.name;
                var path = detinationFolder;
                var saveAsFile = File(path + "/" + name);

                var currentSaveTime = doc.path.modified;
            
                var isFileSaved = saveFileValidation(undefined, currentSaveTime, doc);
                
                counterSavedFiles(isFileSaved, self);

                if (logFiles_ON_OFF === ':  ON ') {
                    writeLnOfFile(executeScript, i, saveAsFile, currentSaveTime, isFileSaved);
                }
            }

            if (self.openedDocsToReopen.length > 0) {
                var fileToRecover = appendingDocToRecover(openedDocPath, self.openedDocsToReopen);
                if (fileToRecover !== null)
                    self.openDocsToRecover.push(fileToRecover); // To avoid bug // There is possiblity that previously opened doc in PS and in source folder are the same. So to prevend this, closed opened doc is retrieved at the end of work of script
            }

            doc.close();
        }
    }

}

function counterSavedFiles(isFileSaved, self) { 
    
    if (isFileSaved)
        self.counterChangedFilesTrue++;
    if (!isFileSaved)
        self.counterChangedFilesFalse++;
}

function appendingDocToRecover(docToAppendPath, openedDocsPaths) {

    var recoverDocs = null;

    for (var i = 0; i < openedDocsPaths.length; i++) {

        if ( docToAppendPath.toString() === openedDocsPaths[i].toString() ) {
            var recoverDocs = openedDocsPaths[i];

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

function writeLnOfFile(executeScript, index, doc, currentSaveTime, isFileSaved) {

    var scriptName = executeScript;

    var counter = ('00000' + (index + 1)).slice(-6); // Prefix 5 zeros, and get the last 6 chars

    var docName = decodeURIComponent(doc.name); // if doc is not objects of documents, but not opened in PS file somewhere in hard drive, you get URl format which you have to decode
    var docFullName = decodeURIComponent(doc.fullName);

    var listFile = createListFilePath();
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
        [/.png$/, savePNG],
        [/.psd$/, savePSD],
        [/.jpg$/, saveJPEG],
        [/.tif$/, saveTIFF],
        [/.bmp$/, saveBMP],
        [/.gif$/, saveGIF],
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

function confrimDialog_DoYouWantCloseOpenedFiles(openedDocs) {

    var DoNotShowCloseOpenedFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG');

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

function recoverOpenedFilesIfTheyWhereTheSameLikeInSourceFolder(self_openDocsToRecover) {

    for (var i = 0; i < self_openDocsToRecover.length; i++) {

        open(self_openDocsToRecover[i]);
    }
}

function showUnsavedFilesAlert(self_counterChangedFilesFalse, scriptFolder) {

    if (self_counterChangedFilesFalse > 0) {
        alert("Save of " + self_counterChangedFilesFalse + " files was unseccesful.\nPlease check list of unsaved files in " + '"scriptUI_changedFilesList.txt" in folder: ' + scriptFolder);
    }
}

//Check the time of PREVIOUS save of the file against the save time of the CURRENT file
function saveFileValidation(previousSaveTime, currentSaveTime, savedFile) {
    
    if (typeof previousSaveTime === "undefined") {
        var previousSaveTime = dateAdd(currentSaveTime, 'second', -1); // add one second to accept validation when you saveAs source document/open document in target director 
    }

    if (checktime(previousSaveTime, currentSaveTime)) {
        //Call the file exists function
        var isFileSaved = imageExistsValidation(savedFile);

    } else {
        var isFileSaved = false;

    }
    
    return isFileSaved;
}

function checktime(previousSaveTime, currentSaveTime) {
    return previousSaveTime < currentSaveTime;
}

//Check to see if the file actually exists
function imageExistsValidation(savedFile) {
    var file = File(savedFile.path);
    if (file.exists) {
        return true;
    } else {
        return false;
    }
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