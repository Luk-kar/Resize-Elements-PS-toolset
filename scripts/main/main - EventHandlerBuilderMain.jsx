EventHandlerBuilderMain.prototype.onBtnRadChooseFilesActiveDocs = function() {
    var UI = this.UI;
    var self = this;

    //Opened files in PS
    UI.btnRadSourceFiles.chooseOpenedFiles.onClick = function() {

        btnChooseFilesSourceFoldEnabled(false, UI);

        panelFilterFilesEnabled(false, UI);

        UI.panelDestFold.title.enabled = true;

        btnsRadDestFoldEnabled(true, UI);

        self.lockingUnlockingAcceptBtn(); //it has to be in that order, becouse UI.btnRadDestFold.other.onClick() check also values of numbs

        if (UI.panelChangeFile.enabled === false) {
            UI.panelChangeFile.enabled = true;
        }

        if (UI.btnRadDestFold.other.value === true) {

            UI.btnRadDestFold.other.onClick();
        } 

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

            UI.btnAccept.enabled = false;
        
        } else if (UI.btnChooseFilesSourceFold.title.text !== "Source folder..."){

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
            
            if (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text === "Destination folder...") {
                
                UI.btnAccept.enabled = false;
            } else {
                self.lockingUnlockingAcceptBtn(); 
            }

            infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);
        }

        ErrorWrongStringInputPath(UI.btnChooseFilesSourceFold.title.text);
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
        UI.btnRadDestFold.same.notify();
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

        self.sourceFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

        self.lockingUnlockingAcceptBtn(); //Number of files to process could be 0
    }
}

EventHandlerBuilderMain.prototype.onFilterSourceFilesCheckboxByExpression = function() { 

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.byExpression.onClick = function() {

        filterSourceFilesCheckboxByExpressionEnabled(UI);
        
        self.sourceFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

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

        self.sourceFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

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

            UI.btnAccept.enabled = false;
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

                self.lockingUnlockingAcceptBtn();

            } else if (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true) {

                self.detinationFolder = checkingIfDestFoldAndSourceFoldAreTheSame(UI, detinationFolderSelection, self.sourceFolderPathRecent, self);

            }
        }
    }
}

EventHandlerBuilderMain.prototype.onBtnAccept = function(executeScript) {
    var UI = this.UI;
    var self = this;

    UI.btnAccept.onClick = function() {
        UI.mainWindow.close();

        var logFiles_Value = readValueOfSeetingsFromPrefFile(prefFileKeys.changedFileListLog)

        if (logFiles_Value === ':  ON ') {

            changedFileList_001_writeDate();

        } // OFF -> do nothing

        changeFileAndSave(self.sourceFilesToProcess, self.detinationFolder, 
            UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, 
            UI.btnRadDestFold.same, UI.btnRadDestFold.other,
            UI, self, executeScript
            );

        if (logFiles_Value === ':  ON ') {

            changedFileList_003_writeEmptyMarginLine();

        } // OFF -> do nothing

        showUserSummaryOfProcessedFiles(executeScript, self.countChangedFilesTrue, self.countChangedFilesFalse, self.sourceFolderNameRecent, self.detinationFolder, UI.btnRadSourceFiles, UI.btnRadDestFold);

        retrievePreviuslyOpenedFiles(UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, self.openDocsToRecover, self.openedDocsToReopen);
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

function retrievePreviuslyOpenedFiles(btnRadSourceFiles_chooseOpenedFiles, btnRadSourceFiles_chooseFilesSourceFold, openDocsToRecover, openedDocsToReopen) {

    if (btnRadSourceFiles_chooseOpenedFiles.value === true) {
        confrimDialog_DoYouWantCloseOpenedFiles(openedDocsToReopen);
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
        throw new Error("Counter can't be less than integer = 1");
    }

    if (countChangedFilesFalse < 0) {
        throw new Error("Counter can't be less than integer = 0");
    }

    if (countChangedFilesTrue > 1) {
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

function changedFileList_001_writeDate() {

    var listFile = createFilePath("ChangedFilesList.log");
    var b = listFile;

    var date = new Date;

    b.open("a");
    b.writeln("==== " + date + " ============================================================================================================");
    b.writeln("");
    b.close();
}

function changedFileList_003_writeEmptyMarginLine() {

    var listFile = createFilePath("ChangedFilesList.log");
    var d = listFile;
    
    d.open("a");
    d.writeln("");
    d.close();
}
