/*
using from "../../settings/settings - functions.jsx":
- isUndefined()
*/

/*
Look at opened script in Photoshop, on some examples (Add canvas, Resize image, 2^n canvas)
UI.btnRadSourceFiles.chooseOpenedFiles <=== radio button "Opened files"
UI.btnRadSourceFiles.chooseFilesSourceFold <=== radio button "Choose folder"
UI.btnRadDestFold.same <=== radio button "(executeScript) in the same folder"
UI.btnRadDestFold.other <=== radio button "(executeScript) and copy files to another folder"
self.sourceFolderFilesToProcess <=== array of files which will be processed
UI.btnChooseFilesDestFold <=== button by which you choose destination folder
UI.btnAccept <=== button by which you start processing files
*/
EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {
    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function() {

        //Below are minimal conditions set for this function
        if (((UI.btnRadSourceFiles.chooseOpenedFiles.value === true) || 
        (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true && !isUndefined(self.sourceFolderFilesToProcess) && (self.sourceFolderFilesToProcess.length > 0))) && 
            ((UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")) 
        ) {

            UI.btnAccept.enabled = true;

        } else {

            UI.btnAccept.enabled = false;
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function() { 

        return self.sourceFolderFilesToProcess; // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    var UI = this.UI;
    var self = this;

    self.changeFile = function trimCanvas() {
    
        var doc = app.activeDocument;
    
        doc.trim(TrimType.TRANSPARENT, true, true, true, true);
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function() {

        /*
        This function has to be declared, even if it is empty
        This function is used AFTER you opened, changed and saved all files
        Look at "Add canvas - EventHandlerBuilderMain.jsx" as example
        */
    }
}