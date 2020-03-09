/*
using from "../control panel/control panel - EventHandlerBuilderControlPanel.jsx":
- executeScript

using from "../executeScript/((2^n canvas) || (Add canvas) || (Resize image))/((2^n canvas) || (Add canvas) || (Resize image)) - EventHandlerBuilderMain.jsx":
- self.lockingUnlockingAcceptBtn()

using from "../settings/settings - functions.jsx":
- ErrorWrongStringInputPath()
- readValueOfSeetingsFromPrefFile()

using from "./main - functions.jsx":
- appData
- prefFileKeys
- userDataFolder
- panelFilterFilesEnabled()
- btnsRadDestFoldEnabled()
- infoFilesUIUpdate()
- docsOpenedFiles()
- btnChooseFilesSourceFoldEnabled()
- btnsRadDestFoldEnabled()
- btnChooseFilesDestFoldEnabled()
- infoFilesUIUpdate()
- gettingFilesOpenedDocsToReopen()
- checkingIfItIsTheSameSourceFolderAsBefore()
- filteringSourceFiles()
- _btnChooseFilesSourceFold_.filesEqual0()
- _btnChooseFilesSourceFold_.filesMoreThan0()
- filterFilesByCheckboxes()
- filterSourceFilesCheckboxByExpressionEnabled()
- createFolderPath()
- checkingIfDestFoldAndSourceFoldAreTheSame()
- changedFileList_001_writeDate()
- changeFileAndSave()
- changedFileList_003_writeEmptyMarginLine()
- showUserSummaryOfProcessedFiles()
- retrievePreviuslyOpenedFiles()
*/

EventHandlerBuilderMain.prototype.onBtnRadChooseFilesActiveDocs = function() {
    var UI = this.UI;
    var self = this;

    //Opened files in PS
    UI.btnRadSourceFiles.chooseOpenedFiles.onClick = function() {

        btnChooseFilesSourceFoldEnabled(false, UI);

        panelFilterFilesEnabled(false, UI);

        UI.panelDestFold.title.enabled = true;

        btnsRadDestFoldEnabled(true, UI);

        if (UI.panelChangeFile.enabled === false) {
            UI.panelChangeFile.enabled = true;
        }

        if (UI.btnRadDestFold.other.value === true) {
            UI.btnRadDestFold.other.onClick();
        } 

        self.lockingUnlockingAcceptBtn(); //it has to be in that order

        infoFilesUIUpdate(docsOpenedFiles(), UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

    }
}

EventHandlerBuilderMain.prototype.onBtnRadChooseFilesSourceFold = function() {
    var UI = this.UI;
    var self = this;

    //Choose source folder
    UI.btnRadSourceFiles.chooseFilesSourceFold.onClick = function() {

        //Until there is no choosed folder you have only ability to browse source folder
        if (UI.btnChooseFilesSourceFold.title.text === "Source folder...") {

            btnChooseFilesSourceFoldEnabled(true, UI);

            UI.panelDestFold.title.enabled = false;

            btnsRadDestFoldEnabled(false, UI);

            btnChooseFilesDestFoldEnabled(false, UI);

            UI.panelChangeFile.enabled = false;

            infoFilesUIUpdate(undefined, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);
        
        } else if (UI.btnChooseFilesSourceFold.title.text !== "Source folder...") {

            btnChooseFilesSourceFoldEnabled(true, UI);

            panelFilterFilesEnabled(true, UI);

            UI.panelDestFold.title.enabled = true;

            btnsRadDestFoldEnabled(true, UI);
            
            if (UI.btnRadDestFold.other.value === true) {

                UI.btnRadDestFold.other.onClick();

            }

            if (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text === UI.btnChooseFilesSourceFold.title.text) {

                sameSourceFolderAndDestFolderOutcome(UI, self);

            }

            infoFilesUIUpdate(self.sourceFolderFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);
        }

        ErrorWrongStringInputPath(UI.btnChooseFilesSourceFold.title.text);

        self.lockingUnlockingAcceptBtn(); 
    }
}

EventHandlerBuilderMain.prototype.startSettingsUINumbofActiveDocs = function() {
    var UI = this.UI;
    var self = this;

    panelFilterFilesEnabled(false, UI);

    UI.numbOfActiveDocuments = docsOpenedFiles().length; //Save later to use in summary alert

    self.openedDocsToReopen = gettingFilesOpenedDocsToReopen(); //To avoid bug with unability with "saving as" opened files again after evoking script again
    

    //Start setting. If there is no active docs, set to choose folder
    if (UI.numbOfActiveDocuments === 0) {

        UI.btnRadSourceFiles.chooseFilesSourceFold.notify();

        UI.btnRadSourceFiles.chooseOpenedFiles.enabled = false;

    } else if (UI.numbOfActiveDocuments > 0) {

        UI.btnRadSourceFiles.chooseOpenedFiles.notify();
        UI.btnRadDestFold.same.notify(); // If you make it as notify, the outcome will be the same like like onClick. In this case outcome of onClick() is not executed. Propably there is undocummented bug that you can't execute two notify one after another correctly
        btnChooseFilesDestFoldEnabled(false, UI);
        
    }
}

EventHandlerBuilderMain.prototype.onBtnChooseFilesSourceFold = function() {
    var UI = this.UI;
    var self = this;

    //Browse source folder
    UI.btnChooseFilesSourceFold.onClick = function() {

        self.sourceFolder = Folder.selectDialog("Select folder with files to process");

        //When user doesn't choose folder
        if (self.sourceFolder === null && UI.btnChooseFilesSourceFold.title.text === "Source folder...") {
            alert("You have not selected source folder");
        //else if (self.sourceFolder === null && UI.btnChooseFilesSourceFold.title.text !== "Source folder..."). Leave selected source folder -> leave status quo

        //When user chooses folder
        } else if (self.sourceFolder !== null) {

            var sameChoosedSourceFolderAsBefore = checkingIfItIsTheSameSourceFolderAsBefore(self);
    
            self.sourceFolderNameRecent = self.sourceFolder.name; //Saving name of source folder to avoid bug; If you choose already some folder, but later you canceled choosing folder, you will not get "undefined" becouse of this variable.
            self.sourceFolderPathRecent = self.sourceFolder; //Add to self to avoid scope issues and bug when source folder is null but it is selected previously in dialog box
            
            var sourceFilesUnfiltered = new Array;
            var sourceFilesFiltered = new Array;
            var properFilesExtPSfiles = /.(jpg|tif|psd|bmp|gif|png)$/;
            
            sourceFilesUnfiltered = self.sourceFolder.getFiles();

            sourceFilesFiltered = filteringSourceFiles(sourceFilesUnfiltered, properFilesExtPSfiles);

            //When user's choosed folder is empty or does not have any files to process
            if (sourceFilesFiltered.length === 0) {

                _btnChooseFilesSourceFold_.filesEqual0(self, UI);
                
            //When user's choosed folder has files to process
            } else if (sourceFilesFiltered.length > 0) {

                _btnChooseFilesSourceFold_.filesMoreThan0(self, UI, sourceFilesFiltered, sameChoosedSourceFolderAsBefore);
            }
        } 
    }
}

EventHandlerBuilderMain.prototype.onFilterSourceFilesCheckboxPNG = function() {

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.PNG.onClick = function() {

        self.sourceFolderFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFolderFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

        self.lockingUnlockingAcceptBtn(); //Number of files to process could be 0
    }
}

EventHandlerBuilderMain.prototype.onFilterSourceFilesCheckboxByExpression = function() { 

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.byExpression.onClick = function() {

        filterSourceFilesCheckboxByExpressionEnabled(UI);
        
        self.sourceFolderFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFolderFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

        self.lockingUnlockingAcceptBtn(); //Number of files to process could be 0
    }
}

EventHandlerBuilderMain.prototype.onFilterSourceFilesByExpressionInput = function() {
    
    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesByExpression.imageTooltip.helpTip = "You can use regular expression (RegExp), but be cautious. Wrong syntax input cause disturbance of functioning of the script.\n" +
                                                            "To avoid that, copy and paste well defined expression in to input dialog.\n" +
                                                            "If you want to check expression, enter website: https://regex101.com/ ";

    UI.filterSourceFilesByExpression.input.onChanging = function() {

        self.sourceFolderFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFolderFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

        self.lockingUnlockingAcceptBtn(); //Number of files to process could be 0
    }

}

EventHandlerBuilderMain.prototype.onBtnRadDestFoldSame = function() {
    var UI = this.UI;
    var self = this;

    UI.btnRadDestFold.same.onClick = function() {

        btnChooseFilesDestFoldEnabled(false, UI);

        self.lockingUnlockingAcceptBtn()

        UI.panelChangeFile.enabled = true;
    }
}

EventHandlerBuilderMain.prototype.onBtnRadDestFoldOther = function() {
    var UI = this.UI;
    var self = this;

    //Copy and Change file in other folder
    UI.btnRadDestFold.other.onClick = function() {

        btnChooseFilesDestFoldEnabled(true, UI);

        self.lockingUnlockingAcceptBtn()

        if (UI.btnChooseFilesDestFold.title.text === "Destination folder...") {

            UI.panelChangeFile.enabled = false;

        } else if (UI.btnChooseFilesDestFold.title.text !== "Destination folder...") {

            UI.panelChangeFile.enabled = true;
        }

        ErrorWrongStringInputPath(Folder(UI.btnChooseFilesDestFold.title.text));
    }
    
}

EventHandlerBuilderMain.prototype.onBtnChooseFilesDestFold = function() {
    var UI = this.UI;
    var self = this;

    UI.btnChooseFilesDestFold.onClick = function() {

        var detinationFolderSelection = Folder.selectDialog("Select target folder to save files");

        if (detinationFolderSelection === null) {

            if (UI.btnChooseFilesDestFold.title.text === "Destination folder...") {
                alert("You have not selected target folder");
                self.detinationFolder = null; //to avoid bug It has to be reset becouse there could be possibility that old path could be passed;
            } //else {if you have already have had selected folder destination, then it remains status quo}

        } else if (detinationFolderSelection !== null) {

            if (UI.btnRadSourceFiles.chooseOpenedFiles.value === true ) {

                self.detinationFolder = detinationFolderSelection;
                createFolderPath(UI.btnChooseFilesDestFold.title, detinationFolderSelection);
                UI.panelChangeFile.enabled = true;

            } else if (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true) {

                self.detinationFolder = checkingIfDestFoldAndSourceFoldAreTheSame(UI, detinationFolderSelection, self.sourceFolderPathRecent, self);
            }
        }

        self.lockingUnlockingAcceptBtn();
    }
}

EventHandlerBuilderMain.prototype.onBtnAccept = function(executeScript, appData, userDataFolder) {
    var UI = this.UI;
    var self = this;

    UI.btnAccept.onClick = function() {
        UI.mainWindow.close();

        var logFiles_Value = readValueOfSeetingsFromPrefFile(prefFileKeys.changedFileListLog, appData.preferencesFile, userDataFolder)

        if (logFiles_Value === ':  ON ') {

            changedFileList_001_writeDate(appData.changedFilesList, userDataFolder);

        } // OFF -> do nothing

        changeFileAndSave(self.sourceFolderFilesToProcess, self.detinationFolder, 
            UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, 
            UI.btnRadDestFold.same, UI.btnRadDestFold.other,
            self, executeScript, appData.preferencesFile, appData.changedFilesList, userDataFolder
            );

        if (logFiles_Value === ':  ON ') {

            changedFileList_003_writeEmptyMarginLine(appData.changedFilesList, userDataFolder);

        } // OFF -> do nothing

        showUserSummaryOfProcessedFiles(executeScript, self.countChangedFilesTrue, self.countChangedFilesFalse, self.sourceFolderNameRecent, self.detinationFolder, UI.btnRadSourceFiles, UI.btnRadDestFold);

        retrievePreviuslyOpenedFiles(UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, self.openDocsToRecover, self.openedDocsToReopen, appData.preferencesFile);
    }
}

EventHandlerBuilderMain.prototype.onBtnCancel = function() {
    var UI = this.UI;

    UI.btnCancel.onClick = function() {
        UI.mainWindow.close();
    }
}

EventHandlerBuilderMain.prototype.onReturn = function() {
    var UI = this.UI;

    UI.btnReturn.onClick = function() {

        UI.mainWindow.close();
        UIctrlPanel.controlPanelWindow.show();
    }
}