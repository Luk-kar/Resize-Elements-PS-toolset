////////////////////////////////////////////////////////////////////////////
// Photoshop script written by Karol Łukaszczyk, 01.2020
// Permits you to use, modify, and distribute this file
/////////////////////////////////////////////////////////////////////////////

#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

//================================================================================================================================

function GuiBuilderMain() {

    this.baseLayout(executeScript);
    this.images();
}

GuiBuilderMain.prototype.baseLayout = function(executeScript) {

    //Creating groups to populate with main UI
    this.mainWindow = new Window("dialog", executeScript);

    this.groupMain = this.mainWindow.add("group")

    this.groupInfo = createGroupUI(this.groupMain, "column", "left");
    this.panelWidth = 40; // Do not use creation property size in px for panels due to issues with bugs

}

GuiBuilderMain.prototype.images = function() {

    var scriptParentFolder = getParentfolder(); // slice negative numb is length of file folder

    var imageFolderDestination = scriptParentFolder + "images/";

    this.panelTitleFont = "Arial-Bold:13";

    //Image: InfoHover.png
    this.imageInfHov = File(imageFolderDestination + "InfoHover.png");

    //Image: ConstrPropFalse.png and ConstrPropTrue.png
    this.imageCnstrnsProportionFalse = File(imageFolderDestination + "ConstrPropFalse.png");
    this.imageCnstrnsProportionTrue = File(imageFolderDestination + "ConstrPropTrue.png");

    //Image: imageAnchorTrue.png and imageAnchorFalse.png
    this.imageAnchorTrue = File(imageFolderDestination + "anchorPointerTrue.png");
    this.imageAnchorFalse = File(imageFolderDestination + "anchorPointerFalse.png");

}

GuiBuilderMain.prototype.buildPanelSourceFiles = function() {
    //Creating group to populate with main UI
    this.panelSourceFiles = createPanelUI(this.groupInfo, undefined, "left");

    //Source files title
    this.panelSourceFiles.title = this.panelSourceFiles.add("statictext", undefined, "Source files:");
    this.panelSourceFiles.title.graphics.font = this.panelTitleFont;

    //Creating radial button group
    this.btnRadSourceFiles = createGroupUI(this.panelSourceFiles, "column", "left", "left");

    //Radial button choose active files/target folder
    this.btnRadSourceFiles.chooseOpenedFiles = this.btnRadSourceFiles.add("radiobutton", undefined, "Opened files");
    this.btnRadSourceFiles.chooseFilesSourceFold = this.btnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

    //Add button to choose target folder
    this.groupBtnChooseFilesSourceFold = this.panelSourceFiles.add("group");

    this.btnChooseFilesSourceFold =  this.groupBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
    this.btnChooseFilesSourceFold.title = this.groupBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");

    this.btnChooseFilesSourceFold.title.characters = this.panelWidth; //Giving the same width as: this.panelSourceFiles, this.panelFilterFiles, this.panelDestFold
}

GuiBuilderMain.prototype.buildPanelSourceFilesFilter = function() {

    //Create panel
    this.panelFilterFiles = createPanelUI(this.groupInfo, undefined, "left");

    this.filterSourceFilesCheckbox = createGroupUI(this.panelFilterFiles, "column", "left", "left");
    //Create checkbox
    this.filterSourceFilesCheckbox.PNG = this.filterSourceFilesCheckbox.add("checkbox", undefined, "Process only PNG");

    var PNGbyDefault_ON_OFF = readValueOfSeetingsFromPrefFile('"FILTER BY PNG"- CHECKBOX = TRUE');
    if (PNGbyDefault_ON_OFF === ':  ON ') {
        this.filterSourceFilesCheckbox.PNG.value = true;
    }
    //Create group
    this.filterSourceFilesCheckbox.byExpression = this.filterSourceFilesCheckbox.add("checkbox", undefined, "filter files by expression");


    this.filterSourceFilesByExpression = this.panelFilterFiles.add("group"); //Why it is not part of this.filterSourceFilesCheckbox.byExpression, thou ask? Becouse only checkbox of filterSourceFilesCheckbox.byExpression enable or disable this group
        //Create statictext
        this.filterSourceFilesByExpression.title = this.filterSourceFilesByExpression.add("statictext", undefined, "Filter by:");
        //Create editText
        this.filterSourceFilesByExpression.input = this.filterSourceFilesByExpression.add("edittext", undefined, "");
        this.filterSourceFilesByExpression.input.characters = 30;

        this.filterSourceFilesByExpression.imageTooltip = this.filterSourceFilesByExpression.add("image", undefined, this.imageInfHov);

        this.filterSourceFilesByExpression.panelWidth = this.filterSourceFilesByExpression.add("statictext", undefined, "");
        this.filterSourceFilesByExpression.panelWidth.characters = this.panelWidth -32; //Giving the same width as: this.panelSourceFiles, this.panelFilterFiles, this.panelDestFold

}

GuiBuilderMain.prototype.buildPanelDestinationFolder = function() {

    this.panelDestFold = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelDestFold.title = this.panelDestFold.add("statictext", undefined, "Destination folder:");
    this.panelDestFold.title.graphics.font = this.panelTitleFont;

    //Creating group radial button choose destination folder
    this.btnRadDestFold = createGroupUI(this.panelDestFold, "column", "left", "left");

    //Radial buttons choose destination folder
    this.btnRadDestFold.same = this.btnRadDestFold.add("radiobutton", undefined, executeScript + " in the same folder");
    this.btnRadDestFold.other = this.btnRadDestFold.add("radiobutton", undefined, executeScript + " and copy files to other folder");

    //Browse button destination folder
    this.groupBtnDestFold = this.panelDestFold.add("group");

    this.btnChooseFilesDestFold = this.groupBtnDestFold.add("button", undefined, "Browse...");
    this.btnChooseFilesDestFold.title = this.groupBtnDestFold.add("statictext", undefined, "Destination folder...");
    this.btnChooseFilesDestFold.title.characters = this.panelWidth; //Giving the same width as: this.panelSourceFiles, this.panelFilterFiles, this.panelDestFold
}

GuiBuilderMain.prototype.buildPanelChangeFile = function(executeScript){
    var UI = this.UI;

    if (executeScript === "Add canvas"){
        #include "./Add canvas/Add canvas - UI.jsx";
    }

    if (executeScript === "Resize image"){
        #include "./Resize image/Resize image - UI.jsx"; 
    }

    if (executeScript === "2^n canvas"){
        #include "./2^n canvas/2^n canvas - UI.jsx"; 
    }
}

GuiBuilderMain.prototype.buildPanelInfoUI = function(){

    this.panelDocInfo = createPanelUI(this.groupInfo, undefined, "left");

    //Number of files displayed in "Info UI"
    this.numbOfDisplayedFiles = 2;

    //Creating empty lines of text to fill with files names later
    this.panelDocInfoLines = new Array; //panelDocInfo.lines -> "undefined not as object"

    for (var i = 0; i < (this.numbOfDisplayedFiles + 1); i++) {
        this.panelDocInfoLines[i] = this.panelDocInfo.add("statictext");
        this.panelDocInfoLines[i].characters = this.panelWidth + 13;//Giving the same width as: this.panelSourceFiles, this.panelFilterFiles, this.panelDestFold
    }
}

GuiBuilderMain.prototype.buildAcceptCancelReturnButtons = function() {

        this.groupBtns = createGroupUI(this.groupMain, "column", undefined, [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP]);

        this.btnAccept = this.groupBtns.add("button", undefined, "Accept");

        this.btnCancel = this.groupBtns.add("button", undefined, "Close");

        this.btnReturn = this.groupBtns.add("button", undefined, "Return");
}

function EventHandlerBuilderMain(UI) {
    this.UI = UI;
}

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

    self.openedDocsToReopen = gettingFilesOpenedDocsToReopen(); // To avoid bug with unability with "saving as" opened files again after evoking script again
    

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

        //Warning when you didn't choose any folder now and before
        if (self.sourceFolder === null && UI.btnChooseFilesSourceFold.title.text === "Source folder...") {
            alert("You have not selected source folder");
        //else if (self.sourceFolder === null && UI.btnChooseFilesSourceFold.title.text !== "Source folder..."). Leave selected source folder -> leave status quo

        } else if (self.sourceFolder !== null) {

            var sameChoosedSourceFolderAsBefore = checkingIfItIsTheSameSourceFolderAsBefore(self);
    
            self.sourceFolderNameRecent = self.sourceFolder.name; //Saving name of source folder to avoid bug; If you choose already some folder, but later you canceled choosing folder, you will not get "undefined" becouse of this variable.
            self.sourceFolderPathRecent = self.sourceFolder; //Add to self to avoid scope issues and bug when source folder is null but it is selected previously in dialog box
            
            var sourceFilesUnfiltered = new Array;
            var sourceFilesFiltered = new Array;
            var properFilesExtPSfiles = /.(jpg|tif|psd|bmp|gif|png)$/;
            
            sourceFilesUnfiltered = self.sourceFolder.getFiles();

            sourceFilesFiltered = filteringSourceFiles(sourceFilesUnfiltered, properFilesExtPSfiles);

            if (sourceFilesFiltered.length === 0) {

                self.sourceFolder === null;// to avoid bug
                
                createPathString(UI.btnChooseFilesSourceFold.title, "Source folder...");

                panelFilterFilesEnabled(false, UI);

                UI.panelDestFold.title.enabled = false;

                btnsRadDestFoldEnabled(false, UI);

                btnChooseFilesDestFoldEnabled(false, UI);

                UI.panelChangeFile.enabled = false;
                
                UI.btnAccept.enabled = false;

                infoFilesUIUpdate(undefined, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

                alert("In choosed folder there is no files to process");
                

            } else if (sourceFilesFiltered.length > 0) {

                self.sourceFilesPSDformat = null; 
                self.sourceFilesPSDformat = addingFilteredFilesToSourceFiles(sourceFilesUnfiltered, sourceFilesFiltered);

                self.sourceFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG); // if any boxes are checked, then it is filtered by ceratain checkboxes; if it is not, then you have only psd format

                createPathString(UI.btnChooseFilesSourceFold.title, self.sourceFolder);

                panelFilterFilesEnabled(true, UI);
                
                UI.panelDestFold.title.enabled = true;
                
                btnsRadDestFoldEnabled(true, UI);
                
                infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);

                if (typeof self.detinationFolder === "undefined") {

                    UI.btnRadDestFold.same.notify();

                } else if ( (typeof self.detinationFolder !== "undefined") && (self.detinationFolder !== null) ) { //(self.detinationFolder !== null) to avoid bug

                    if(( !self.detinationFolder.toString().match(/\//) && !self.sourceFolder.toString().match(/\//) )){
                        throw new Error("Invalid strings. Strings are not paths");
                    }

                    var sameDestinationFolderAndSourceFolder = ( self.detinationFolder.toString() === self.sourceFolder.toString() );

                    if (sameDestinationFolderAndSourceFolder) {

                        sameSourceFolderAndDestFolderOutcome(UI, self);

                    } else {

                        UI.btnRadDestFold.other.notify();
                    }
                }
                
                if (sameChoosedSourceFolderAsBefore === false) {

                    if( self.sourceFilesToProcess.length < 0){
                        throw new Error("Array should contain at least one File");
                    }

                    if (self.sourceFilesToProcess.length > 1) {
                        alert("In folder are " + self.sourceFilesToProcess.length + " files");
                    } else if (self.sourceFilesToProcess.length === 1) {
                        alert("In folder is 1 file");
                    }
                }
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
    }
}

EventHandlerBuilderMain.prototype.onFilterSourceFilesCheckboxByExpression = function() { 

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.byExpression.onClick = function() {

        filterSourceFilesCheckboxByExpressionEnabled(UI);
        
        self.sourceFilesToProcess = filterFilesByCheckboxes(self.sourceFilesPSDformat, UI, UI.filterSourceFilesCheckbox.byExpression, UI.filterSourceFilesCheckbox.PNG);
        
        infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.panelDocInfo, UI.panelDocInfoLines);
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
                self.detinationFolder = null; //to avoid bug
            } //else {if you have already have had selected folder destination, then it remains status quo}

        } else if (detinationFolderSelection !== null) {

            if (UI.btnRadSourceFiles.chooseOpenedFiles.value === true ) {

                self.detinationFolder = detinationFolderSelection;
                createPathString(UI.btnChooseFilesDestFold.title, detinationFolderSelection);
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

        var logFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG')

        if (logFiles_ON_OFF === ':  ON ') {

        var listFile = createListFilePath();
        var b = listFile;
        var date = new Date;

        b.open("a");
        b.writeln("==== " + date + " ============================================================================================================");
        b.writeln("");
        b.close();

        } // OFF -> do nothing

        changeFileAndSave(self.sourceFilesToProcess, self.detinationFolder, 
            UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, 
            UI.btnRadDestFold.same, UI.btnRadDestFold.other,
            UI, self, executeScript
            );

        if (logFiles_ON_OFF === ':  ON ') {

        var listFile = createListFilePath();
        var d = listFile;

        d.open("a");
        d.writeln("");
        d.close();

        } // OFF -> do nothing

        var scriptName = executeScript;
        var scriptFolder = $.fileName.slice(0, -16);

        if (scriptName.split(" ").length !== 2 || !scriptName.match(/[a-z]/i)) {
            throw new Error('Wrongly formated name of "var executeScript" in controlPanel.jsx in folder: ' + scriptFolder);
        }

        var verbPastParticiple = simplePastRegularForm(scriptName); //"ed" regular form
        var noun = scriptName.split(" ")[1];

        if(self.counterChangedFilesTrue < 0) {
            throw new Error("Counter can't be less than integer = 1");
        }
        if(self.counterChangedFilesFalse < 0) {
            throw new Error("Counter can't be less than integer = 0");
        }

        if (self.counterChangedFilesTrue > 1) {
            var files = "files"
        } else if (self.counterChangedFilesTrue === 1) {
            var files = "file"
        }
        
        if (UI.btnRadSourceFiles.chooseOpenedFiles.value === true) {

            alert("You " + verbPastParticiple + " " + noun + " to " + self.counterChangedFilesTrue + " " + files);
            showUnsavedFilesAlert(self.counterChangedFilesFalse, scriptFolder);

            confrimDialog_DoYouWantCloseOpenedFiles(self.openedDocsToReopen);

        } else if (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true) {

            var folderName = "";
            if (UI.btnRadDestFold.same.value === true) {
                folderName = decodeURIComponent(self.sourceFolderNameRecent); // string format is URl
            } else if (UI.btnRadDestFold.other.value === true) {
                folderName = decodeURIComponent(self.detinationFolder.name); // string format is URl
            }

            alert("You " + verbPastParticiple + " " + noun + " to " + self.counterChangedFilesTrue + " " + files + ",\nin folder: " + '"' + folderName + '"');
            showUnsavedFilesAlert(self.counterChangedFilesFalse, scriptFolder);

            if (typeof self.openDocsToRecover !== "undefined" && self.openDocsToRecover !== null) {
                recoverOpenedFilesIfTheyWhereTheSameLikeInSourceFolder(self.openDocsToRecover);
            }
        }

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

GuiBuilderMain.prototype.showMainWindow = function () {
    this.mainWindow.show();
};

main(executeScript);

function main(executeScript) {

    appDataBuilder();
    
    var UI = new GuiBuilderMain();

    UI.buildPanelSourceFiles();

    UI.buildPanelSourceFilesFilter();

    UI.buildPanelDestinationFolder();

    UI.buildPanelChangeFile(executeScript);

    UI.buildPanelInfoUI();

    UI.buildAcceptCancelReturnButtons();

//================================================================================================================================
    
    var eventHandler = new EventHandlerBuilderMain( UI );

    if (executeScript === "Add canvas") {
        #include "./Add canvas/Add canvas - eventHandler.jsx";
    }

    if (executeScript === "Resize image"){
        #include "./Resize image/Resize image - eventHandler.jsx"; 
    }

    if (executeScript === "2^n canvas"){
        #include "./2^n canvas/2^n canvas - eventHandler.jsx"; 
    }

// Main mechanics -------------------------------------------------------------------------------------------------------------------

    eventHandler.onBtnRadChooseFilesActiveDocs();

    eventHandler.onBtnRadChooseFilesSourceFold();

    eventHandler.startSettingsUINumbofActiveDocs();

    eventHandler.onBtnChooseFilesSourceFold();

    eventHandler.onFilterSourceFilesCheckboxPNG();

    eventHandler.onFilterSourceFilesCheckboxByExpression();

    eventHandler.onFilterSourceFilesByExpressionInput();

    eventHandler.onBtnRadDestFoldSame();

    eventHandler.onBtnRadDestFoldOther();

    eventHandler.onBtnChooseFilesDestFold();

    eventHandler.onBtnAccept(executeScript);

    eventHandler.onBtnCancel();

    eventHandler.onReturn();

    UI.showMainWindow();

}




