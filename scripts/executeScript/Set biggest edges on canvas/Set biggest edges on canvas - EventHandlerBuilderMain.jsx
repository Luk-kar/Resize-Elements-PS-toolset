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
EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function () {
    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function () {

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

    EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function () {
        var UI = this.UI;
        var self = this;

        self.startingFunction = function () {

            /*
            This function has to be declared, even if it is empty
            This function is used BEFORE you open any file
            Look at "Add canvas - EventHandlerBuilderMain.jsx" as example
            */
        }
    }

    EventHandlerBuilderMain.prototype.settingChangeFile = function () {
        var UI = this.UI;
        var self = this;

        self.changeFile = function () {

            /*
            This function is used when file is open
            Look at "Add canvas - EventHandlerBuilderMain.jsx" as example
            Check also scriptListener download.adobe.com/pub/adobe/photoshop/win/13.x/Win_Scripting_Plug-In.zip if you record some script
            And how to use it https://blogs.adobe.com/crawlspace/2006/05/installing_and_1.html
            */
        }
    }

    EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function () {
        var UI = this.UI;
        var self = this;

        self.endingFunction = function () {

            /*
            This function has to be declared, even if it is empty
            This function is used AFTER you opened, changed and saved all files
            Look at "Add canvas - EventHandlerBuilderMain.jsx" as example
            */
        }
    }