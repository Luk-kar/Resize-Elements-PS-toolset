////////////////////////////////////////////////////////////////////////////
// Photoshop script written by Karol Łukaszczyk, 01.2020
// Permits you to use, modify, and distribute this file
/////////////////////////////////////////////////////////////////////////////

#target photoshop

$.level = 1; // Debugging level

function GuiBuilder (){
    this.baseLayout();
}

GuiBuilder.prototype.baseLayout = function() {
    //Creating groups to populate with main UI
    this.mainWindow = new Window("dialog", "Add canvas");
    this.grpMain = this.mainWindow.add("group")
    this.grpInfo = createGroupUI(this.grpMain, "column", "left");
    this.panelWidth = 40; // Do not use creation property size in px for panels due to issues with bugs
}

GuiBuilder.prototype.buildPanelSourceFiles = function() {
    //Creating group to populate with main UI
    this.plnSourceFiles = createPanelUI(this.grpInfo, undefined, "left");

    //Source files title
    this.plnSourceFiles.title = this.plnSourceFiles.add("statictext", undefined, "Source files:");

    //Creating radial button group
    this.btnRadSourceFiles = createGroupUI(this.plnSourceFiles, "column", "left", "left");

    //Radial button choose active files/target folder
    this.btnRadSourceFiles.chooseOpenedFiles = this.btnRadSourceFiles.add("radiobutton", undefined, "Opened files");
    this.btnRadSourceFiles.chooseFilesSourceFold = this.btnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

    //Add button to choose target folder
    this.grpBtnChooseFilesSourceFold = this.plnSourceFiles.add("group");

    this.btnChooseFilesSourceFold =  this.grpBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
    this.btnChooseFilesSourceFold.title = this.grpBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");

    this.btnChooseFilesSourceFold.title.characters = this.panelWidth; //Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold
}

GuiBuilder.prototype.buildPanelSourceFilesFilter = function() {

    //Create panel
    this.plnFilterFiles = createPanelUI(this.grpInfo, undefined, "left");

    this.filterSourceFilesCheckbox = createGroupUI(this.plnFilterFiles, "column", "left", "left");
    //Create checkbox
    this.filterSourceFilesCheckbox.PNG = this.filterSourceFilesCheckbox.add("checkbox", undefined, "Process only PNG");
    //Create group
    this.filterSourceFilesCheckbox.byExpression = this.filterSourceFilesCheckbox.add("checkbox", undefined, "filter files by expression");


    this.filterSourceFilesByExpression = this.plnFilterFiles.add("group"); //Why it is not part of this.filterSourceFilesCheckbox.byExpression, thou ask? When you do enabled property of pervious one and this one, they have to be sperate bocouse they are invoked seperatly. 
        //Create statictext
        this.filterSourceFilesByExpression.title = this.filterSourceFilesByExpression.add("statictext", undefined, "Filter by:");
        //CreateeditText
        this.filterSourceFilesByExpression.input = this.filterSourceFilesByExpression.add("edittext", undefined, "");
        this.filterSourceFilesByExpression.input.characters = 30;

        this.filterSourceFilesByExpression.panelWidth = this.filterSourceFilesByExpression.add("statictext", undefined, "");
        this.filterSourceFilesByExpression.panelWidth.characters = this.panelWidth -28; //Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold

}

GuiBuilder.prototype.buildPanelDestinationFolder = function() {

    this.pnlDestFold = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlDestFold.title = this.pnlDestFold.add("statictext", undefined, "Destination folder:");

    //Creating group radial button choose destination folder
    this.btnRadDestFold = createGroupUI(this.pnlDestFold, "column", "left", "left");

    //Radial buttons choose destination folder
    this.btnRadDestFold.same = this.btnRadDestFold.add("radiobutton", undefined, "Add canvas in the same folder");
    this.btnRadDestFold.other = this.btnRadDestFold.add("radiobutton", undefined, "Add canvas and copy files to other folder");

    //Browse button destination folder
    this.grpBtnDestFold = this.pnlDestFold.add("group");

    this.btnChooseFilesDestFold = this.grpBtnDestFold.add("button", undefined, "Browse...");
    this.btnChooseFilesDestFold.title = this.grpBtnDestFold.add("statictext", undefined, "Destination folder...");
    this.btnChooseFilesDestFold.title.characters = this.panelWidth; //Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold
}

GuiBuilder.prototype.buildPanelAddCanvas = function(){

    ///Add canvas UI
    this.pnlAddCanvas = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlAddCanvas.title = this.pnlAddCanvas.add("statictext", undefined, "Add canvas");

    //Group units value
    this.grpUnitVal = this.pnlAddCanvas.add("group");

        //Group dialog units value
        this.grpUnitValDlg = createGroupUI(this.grpUnitVal, "column", "left");

            //Group width
            this.grpWidth = this.grpUnitValDlg.add("group");

                //Edittext: Width
                this.grpWidth.title = this.grpWidth.add("statictext", undefined, "Width:  ");
                this.grpWidth.numb =  this.grpWidth.add("edittext", undefined, 0);
                this.grpWidth.numb.characters = 9;

                //Update also unitsTypes
                var AddCanvasDocUnits = [
                    "ADD PX", 
                    "ADD %",
                    ];
                this.grpWidth.unitsDropDown = this.grpWidth.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpWidth.unitsDropDown.selection = 0;

                //Crating path to image folder
                var scriptPath = $.fileName;
                var imageFolderDestination = (scriptPath.toString().replace(/\\/g, '/').slice(0, -13) + "/images/"); // -13 is the lenght of the script file name

                //Image: InfoHover.png
                this.imageInfHov = File(imageFolderDestination + "InfoHover.png");
                this.grpWidth.imageTooltip = this.grpWidth.add("image", undefined, this.imageInfHov);

            //Group height
            this.grpHeight = this.grpUnitValDlg.add("group");

                //Edittext: Height
                this.grpHeight.title = this.grpHeight.add("statictext", undefined, "Height: ");
                this.grpHeight.numb =  this.grpHeight.add("edittext", undefined, 0);
                this.grpHeight.numb.characters = 9;

                //Dropdownlist: Add PX, add %
                this.grpHeight.unitDropDown = this.grpHeight.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpHeight.unitDropDown.selection = 0;

                //Image: InfoHover.png
                this.grpHeight.imageTooltip = this.grpHeight.add("image", undefined, this.imageInfHov);

        //Graphic element proportions constrains (true, false)

            //Uplaoding constrains images next Width and Height dialog groups
            this.imageCnstrnsProportionFalse = File(imageFolderDestination + "ConstrPropFalse.png");
            this.imageCnstrnsProportionTrue = File(imageFolderDestination + "ConstrPropTrue.png");

            //Add constrain image next to dialog
            this.grpDlgUnitValImage = this.grpUnitVal.add("image", undefined, this.imageCnstrnsProportionFalse);
            this.grpDlgUnitValImage.alignment = "right";

    //Constrains proportions
    this.constrainsProportionsCheckbox = this.pnlAddCanvas.add("checkbox", undefined, "Same Height and Width");

    //Anchor display
    this.grpAnchorMarginesSpaceTop =  [this.pnlAddCanvas.add("group", undefined, ""),
                                    this.pnlAddCanvas.add("group", undefined, "")];

    this.grpAnchor = this.pnlAddCanvas.add("group");
    this.grpAnchor.title = this.grpAnchor.add("statictext", undefined, "Anchor: ");
    this.grpAnchor.title.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

        //Creating anchor group box
        this.grpAnchor.boxBtns = createGroupUI(this.grpAnchor, "column");

        //Creating anchor gorup lines inside box
        this.grpAnchor.boxBtns.line001 = this.grpAnchor.boxBtns.add("group");
        this.grpAnchor.boxBtns.line002 = this.grpAnchor.boxBtns.add("group");
        this.grpAnchor.boxBtns.line003 = this.grpAnchor.boxBtns.add("group");

            //Image: imageAnchorTrue.png and imageAnchorFalse.png
            this.imageAnchorTrue = File(imageFolderDestination + "anchorPointerTrue.png");
            this.imageAnchorFalse = File(imageFolderDestination + "anchorPointerFalse.png");

            //Adding 001 line of buttons
            this.anchorPositionTOPLEFT = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPCENTER = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPRIGHT = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 002 line of buttons
            this.anchorPositionMIDDLELEFT = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionMIDDLECENTER = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorTrue);
            this.anchorPositionMIDDLERIGHT = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 003 line of buttons
            this.anchorPositionBOTTOMLEFT = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMCENTER = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMRIGHT = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);

    this.grpAnchorMarginesSpaceBottom = this.pnlAddCanvas.add("statictext", undefined, "");
    this.grpAnchorMarginesSpaceBottom.characters = this.panelWidth + 13;//Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold

    //Canvas color extension
    this.canvExtendColor = this.pnlAddCanvas.add("group");

        this.canvExtendColor.title = this.canvExtendColor.add("statictext", undefined, "Canvas extension color: ");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Select color",
                                    "Left upper corner color"
                                    ];// functions in onCanvExtendColorDropDwn; Can't be part of UI object, becouse of bug in the next line

        this.canvExtendColor.dropDwn = this.canvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColor.dropDwn.selection = 1;

}

GuiBuilder.prototype.buildPanelInfoUI = function(){

    this.pnlDocInfo = createPanelUI(this.grpInfo, undefined, "left");

    //Number of files displayed in "Info UI"
    this.numbOfDisplayedFiles = 2;

    //Creating empty lines of text to fill with files names later
    this.plnDocInfoLines = new Array; //plnDocInfo.lines -> "undefined not as object"

    for (var i = 0; i < (this.numbOfDisplayedFiles + 1); i++) {
        this.plnDocInfoLines[i] = this.pnlDocInfo.add("statictext");
        this.plnDocInfoLines[i].characters = this.panelWidth + 13;//Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold
    }
}

GuiBuilder.prototype.buildAcceptCancelButtons = function() {

        this.grpBtns = createGroupUI(this.grpMain, "column", undefined, [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP]);

        this.btnAccept = this.grpBtns.add("button", undefined, "Accept");

        this.btnCancel = this.grpBtns.add("button", undefined, "Close");
}

function EventHandlerBuilder(UI) {
    this.UI = UI;
}

GuiBuilder.prototype.showMainWindow = function() {
    this.mainWindow.show();
}

EventHandlerBuilder.prototype.onBtnRadChooseFilesActiveDocs = function() {
    var UI = this.UI;

    //Opened files in PS
    UI.btnRadSourceFiles.chooseOpenedFiles.onClick = function() {

        btnChooseFilesSourceFoldEnabled(false, UI);

        plnFilterFilesEnabled(false, UI);

        UI.pnlDestFold.title.enabled = false;

        btnsRadDestFoldEnabled(false, UI);
          
        btnChooseFilesDestFoldEnabled(false, UI);

        if (UI.pnlAddCanvas.enabled === false) {
            UI.pnlAddCanvas.enabled = true;
        }

        infoFilesUIUpdate(docsOpenedNames(), UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onBtnRadChooseFilesSourceFold = function() {
    var UI = this.UI;
    var self = this;

    //Choose source folder
    UI.btnRadSourceFiles.chooseFilesSourceFold.onClick = function() {

        //Until there is no choosed folder you have only ability to browse source folder
        if (UI.btnChooseFilesSourceFold.title.text === "Source folder...") {

            btnChooseFilesSourceFoldEnabled(true, UI);

            UI.pnlDestFold.title.enabled = false;

            btnsRadDestFoldEnabled(false, UI);

            btnChooseFilesDestFoldEnabled(false, UI);

            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

            UI.pnlAddCanvas.enabled = false;

            infoFilesUIUpdate(undefined, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

            UI.btnAccept.enabled = false;
        
        } else if (UI.btnChooseFilesSourceFold.title.text !== "Source folder..."){

            btnChooseFilesSourceFoldEnabled(true, UI);

            plnFilterFilesEnabled(true, UI);

            UI.pnlDestFold.title.enabled = true;

            btnsRadDestFoldEnabled(true, UI);
            
            if (UI.btnRadDestFold.other.value === true) {

                UI.btnRadDestFold.other.notify();

            }

            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

            infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);
        }
    }
}

EventHandlerBuilder.prototype.startSettingsUINumbofActiveDocs = function() {
    var UI = this.UI;

    plnFilterFilesEnabled(false, UI);

    //Start setting. If there is no active docs, set to choose folder
    if (app.documents.length === 0) {

        UI.btnRadSourceFiles.chooseFilesSourceFold.notify();

        UI.btnRadSourceFiles.chooseOpenedFiles.enabled = false;

        UI.btnRadDestFold.same.value = true;
        UI.btnAccept.enabled = false;

    } else if (app.documents.length > 0) {

        UI.btnRadSourceFiles.chooseOpenedFiles.notify();

        UI.numbOfActiveDocuments = app.documents.length; //Save later to use in summary alert
        
    }
}

EventHandlerBuilder.prototype.onBtnChooseFilesSourceFold = function() {
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

                plnFilterFilesEnabled(false, UI);

                btnsRadDestFoldEnabled(false, UI);

                btnChooseFilesDestFoldEnabled(false, UI);

                UI.pnlAddCanvas.enabled = false;
                
                UI.btnAccept.enabled = false;

                infoFilesUIUpdate(undefined, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

                alert("In choosed folder there is no files to process");
                

            } else if (sourceFilesFiltered.length > 0) {

                self.sourceFilesUnfiltered = null; 
                self.sourceFilesUnfiltered = addingFilteredFilesToSourceFiles(sourceFilesUnfiltered, sourceFilesFiltered);
                self.sourceFilesToProcess = self.sourceFilesUnfiltered;

                if (UI.filterSourceFilesCheckbox.PNG.value === true) {
                    UI.filterSourceFilesCheckbox.PNG.onClick();
                } else if (UI.filterSourceFilesCheckbox.byExpression.value === true) {
                    UI.filterSourceFilesCheckbox.byExpression.onClick();
                }

                createPathString(UI.btnChooseFilesSourceFold.title, self.sourceFolder);

                plnFilterFilesEnabled(true, UI);
                
                UI.pnlDestFold.title.enabled = true;
                
                btnsRadDestFoldEnabled(true, UI);
                
                infoFilesUIUpdate(self.sourceFilesToProcess, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

                if (sameChoosedSourceFolderAsBefore === false) {
                    if (self.sourceFilesToProcess.length > 1) {
                        alert("In folder are " + self.sourceFilesToProcess.length + " files");
                    } else if (self.sourceFilesToProcess.length === 1) {
                        alert("In folder is 1 file");
                    }
                }

                if (typeof self.detinationFolder === "undefined") {

                    UI.btnRadDestFold.same.notify();

                } else if ( (typeof self.detinationFolder !== "undefined") && (self.detinationFolder !== null) ) { //(self.detinationFolder !== null) to avoid bug

                    var sameDestinationFolderAndSourceFolder = ( self.detinationFolder.toString() === self.sourceFolder.toString() );

                    if (sameDestinationFolderAndSourceFolder) {

                        createPathString(UI.btnChooseFilesDestFold.title, "Destination folder...");
                        
                        self.detinationFolder = null;
                        UI.btnRadDestFold.same.notify();
    
                        alert("Source folder and target folder are the same.\nNext time choose more wisely");

                    } else {

                        UI.btnRadDestFold.other.notify();

                    }
                }
            }
        } 
    }
}

EventHandlerBuilder.prototype.onFilterSourceFilesCheckboxPNG = function() {

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.PNG.onClick = function() {

        if (UI.filterSourceFilesCheckbox.PNG.value === true) {

            self.sourceFilesPNG = filterFilesByPNG(self.sourceFilesUnfiltered);

            var filesToInfoUI =  self.sourceFilesPNG;
            self.sourceFilesToProcess =  self.sourceFilesPNG;

            if ((UI.filterSourceFilesCheckbox.byExpression.value === true) && typeof (self.sourceFilesByExpression !== "undefined")) {

                if (UI.filterSourceFilesByExpression.input.text !== "") {
                    self.sourceFilesPNGandByExpression = filterFilesByPNG(self.sourceFilesByExpression);

                    filesToInfoUI = self.sourceFilesPNGandByExpression;
                    self.sourceFilesToProcess = self.sourceFilesPNGandByExpression;
                } 

            }

            infoFilesUIUpdate(filesToInfoUI, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        } else if (UI.filterSourceFilesCheckbox.PNG.value === false) {

            if ((UI.filterSourceFilesCheckbox.byExpression.value === true) && (UI.filterSourceFilesByExpression.input.text !== "")) {

                var filesToInfoUI = self.sourceFilesByExpression;
                self.sourceFilesToProcess = self.sourceFilesByExpression;

            } else {//todo

                var filesToInfoUI = self.sourceFilesUnfiltered;
                self.sourceFilesToProcess = self.sourceFilesUnfiltered;

            }

            infoFilesUIUpdate(filesToInfoUI, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        }
    }
}

EventHandlerBuilder.prototype.onFilterSourceFilesCheckboxByExpression = function() { //todo

    var UI = this.UI;
    var self = this;

    UI.filterSourceFilesCheckbox.byExpression.onClick = function() {

        if (UI.filterSourceFilesCheckbox.byExpression.value === true) {

            UI.filterSourceFilesByExpression.enabled = true;

            if (UI.filterSourceFilesByExpression.input.text !== "") {

                self.sourceFilesByExpression = filterFilesByExpression(UI.filterSourceFilesByExpression.input.text, self.sourceFilesUnfiltered);

                var filesToInfoUI = self.sourceFilesByExpression;
                self.sourceFilesToProcess = self.sourceFilesByExpression;

                if (UI.filterSourceFilesCheckbox.PNG.value === true) {

                    self.sourceFilesPNG = filterFilesByPNG(self.sourceFilesUnfiltered);
    
                    self.sourceFilesPNGandByExpression = filterFilesByExpression(UI.filterSourceFilesByExpression.input.text, self.sourceFilesPNG);
    
                    filesToInfoUI = self.sourceFilesPNGandByExpression;
                    self.sourceFilesToProcess = self.sourceFilesPNGandByExpression;

                } else if (UI.filterSourceFilesByExpression.input.text === "") {

                    filesToInfoUI = self.sourceFilesUnfiltered;
                    self.sourceFilesToProcess = self.sourceFilesUnfiltered;

                    if (UI.filterSourceFilesCheckbox.PNG.value === true) {

                        self.sourceFilesPNG = filterFilesByPNG(self.sourceFilesUnfiltered);
                        filesToInfoUI = self.sourceFilesPNG;
                        self.sourceFilesToProcess = self.sourceFilesPNG;
                    }
                }
                
                infoFilesUIUpdate(filesToInfoUI, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);
            }
            
        } else if (UI.filterSourceFilesCheckbox.byExpression.value === false) {

            if (UI.filterSourceFilesCheckbox.PNG.value === true) {

                var filesToInfoUI = self.sourceFilesPNG;
                self.sourceFilesToProcess = self.sourceFilesPNG;

            } else {

                var filesToInfoUI = self.sourceFilesUnfiltered;
                self.sourceFilesToProcess = self.sourceFilesUnfiltered;

            }

            infoFilesUIUpdate(filesToInfoUI, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        }
    }

}

EventHandlerBuilder.prototype.onFilterSourceFilesByExpressionInput = function() {
    
    var UI = this.UI;

    UI.filterSourceFilesByExpression.input.onChanging = function() {

        UI.filterSourceFilesCheckbox.byExpression.onClick();

    }

}

EventHandlerBuilder.prototype.onBtnRadDestFoldSame = function() {
    var UI = this.UI;

    UI.btnRadDestFold.same.onClick = function() {

        btnChooseFilesDestFoldEnabled(false, UI);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

        UI.pnlAddCanvas.enabled = true;
    }
}

EventHandlerBuilder.prototype.onBtnRadDestFoldOther = function() {
    var UI = this.UI;

    //Copy and Add canvas in other folder
    UI.btnRadDestFold.other.onClick = function() {

        btnChooseFilesDestFoldEnabled(true, UI);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

        if (UI.btnChooseFilesDestFold.title.text === "Destination folder...") {

            UI.btnAccept.enabled = false;
            UI.pnlAddCanvas.enabled = false;

        } else if (UI.btnChooseFilesDestFold.title.text !== "Destination folder...") {

            UI.pnlAddCanvas.enabled = true;
        }
    }
    
}

EventHandlerBuilder.prototype.onBtnChooseFilesDestFold = function() {
    var UI = this.UI;
    var self = this;

    UI.btnChooseFilesDestFold.onClick = function() {

        var detinationFolderSelection = Folder.selectDialog("Select target folder to save files");

        if (detinationFolderSelection === null) {// "undefined" exception to avoid bug

            if (UI.btnChooseFilesDestFold.title.text === "Destination folder...") {
                alert("You have not selected target folder");
                self.detinationFolder = null; //to avoid bug
            } //else {if you have already have had selected folder destination, then it remains status quo}

        } else if (detinationFolderSelection.toString() !== self.sourceFolderPathRecent.toString()) {

            createPathString(UI.btnChooseFilesDestFold.title, detinationFolderSelection);
            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
            UI.pnlAddCanvas.enabled = true;

            self.detinationFolder = detinationFolderSelection;
        } else if (detinationFolderSelection.toString() === self.sourceFolderPathRecent.toString()) {

            UI.btnRadDestFold.same.notify();
            createPathString(UI.btnChooseFilesDestFold.title, "Destination folder...");
            alert("Source folder and target folder are the same.\nNext time choose more wisely");
            
            self.detinationFolder = null; //to avoid bug
        }

    }
}

EventHandlerBuilder.prototype.startSettingsWidthAndHeight = function() {
    var UI = this.UI;

    checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
}

EventHandlerBuilder.prototype.onGrpWidthNumb = function() {
    var UI = this.UI;

    blockButtonByEdittext(UI.grpWidth.numb);

    UI.grpWidth.numb.onChanging = function() {

        sameInputField(UI.constrainsProportionsCheckbox, UI.grpWidth.numb, UI.grpHeight.numb);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onGrpWidthUnitsDropDown  = function() {
    var UI = this.UI;

    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
    UI.grpWidth.unitsDropDown.onChange = function() {

        sameDropDown(UI.grpWidth.unitsDropDown, UI.grpHeight.unitDropDown);
    }

}

EventHandlerBuilder.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value.\n" +
                        "Only characters avaible are: digits: [0-9] and signs: '-', '+'.\n" + 
                        "The only accepted value inside input field is integer."

    UI.grpWidth.imageTooltip.helpTip = tooltipValue;
    UI.grpHeight.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilder.prototype.onGrpHeightNumb = function() {
    var UI = this.UI;

    blockButtonByEdittext(UI.grpHeight.numb);

    //Group Height
    UI.grpHeight.numb.onChanging = function() {

        sameInputField(UI.constrainsProportionsCheckbox, UI.grpHeight.numb, UI.grpWidth.numb);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onGrpHeightUnitDropDown = function() {
    var UI = this.UI;

    UI.grpHeight.unitDropDown.onChange = function() {
        sameDropDown(UI.grpHeight.unitDropDown, UI.grpWidth.unitsDropDown);
    }
}

EventHandlerBuilder.prototype.onGrpDlgUnitValImage = function() {
    var UI = this.UI;

    createTooltipToImage(UI.constrainsProportionsCheckbox, UI.grpDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);
}

EventHandlerBuilder.prototype.onAnchorButtons = function() {
    var UI = this.UI;
    var self = this;

    //Default anchor position value
    self.anchorPostionValue = AnchorPosition.MIDDLECENTER;

    var anchorPositionButtons = new Array;
    anchorPositionButtons.push(UI.anchorPositionTOPLEFT, UI.anchorPositionTOPCENTER, UI.anchorPositionTOPRIGHT, UI.anchorPositionMIDDLELEFT, UI.anchorPositionMIDDLECENTER, UI.anchorPositionMIDDLERIGHT, UI.anchorPositionBOTTOMLEFT, UI.anchorPositionBOTTOMCENTER, UI.anchorPositionBOTTOMRIGHT);

    //Adding functionality to buttons in anchor box
    UI.anchorPositionTOPLEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPLEFT, AnchorPosition.TOPLEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPCENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPCENTER, AnchorPosition.TOPCENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPRIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPRIGHT, AnchorPosition.TOPRIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionMIDDLELEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLELEFT, AnchorPosition.MIDDLELEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLECENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLECENTER, AnchorPosition.MIDDLECENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLERIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLERIGHT, AnchorPosition.MIDDLERIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionBOTTOMLEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMLEFT, AnchorPosition.BOTTOMLEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMCENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMCENTER, AnchorPosition.BOTTOMCENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMRIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
}

EventHandlerBuilder.prototype.onConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.onClick = function() {
        //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
        createTooltipToImage(UI.constrainsProportionsCheckbox, UI.grpDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);

        //Set the same "highest" value in "Height" and "Width"
        if (UI.constrainsProportionsCheckbox.value === true) {
            //If Height and Width is negative or equal 0, it set in both most negative number
            if((parseInt(UI.grpWidth.numb.text, 10) <= 0) && (parseInt(UI.grpHeight.numb.text, 10) <= 0)) {
                if (parseInt(UI.grpWidth.numb.text, 10) < parseInt(UI.grpHeight.numb.text, 10)) {
                    UI.grpWidth.numb.onChanging();
                }
                //If some value is positive, set in both most positive number
                else {
                    UI.grpHeight.numb.onChanging();
                }
            //If all values are positive set the highest one
            } else if ((parseInt(UI.grpWidth.numb.text, 10) > 0) || (parseInt(UI.grpHeight.numb.text, 10) > 0)) {
                if (parseInt(UI.grpWidth.numb.text, 10) > parseInt(UI.grpHeight.numb.text, 10)) {
                    UI.grpWidth.numb.onChanging();
                } else {
                    UI.grpHeight.numb.onChanging();
                }
            }
        }
    }

}

EventHandlerBuilder.prototype.tooltipConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.helpTip =  "Check to constrain Height and Width";
}

EventHandlerBuilder.prototype.savingBGandFGtoRestoreLater = function() {
    var self = this;

    ///Saving BG and FG bucket color
    //Foregound bucket color
    self.bgColor = new SolidColor();
    self.bgColor.rgb.red = parseInt(app.backgroundColor.rgb.red, 10);
    self.bgColor.rgb.green = parseInt(app.backgroundColor.rgb.green, 10);
    self.bgColor.rgb.blue = parseInt(app.backgroundColor.rgb.blue, 10);

    //Background bucket color
    self.fgColor = new SolidColor();
    self.fgColor.rgb.red = parseInt(app.foregroundColor.rgb.red, 10);
    self.fgColor.rgb.green = parseInt(app.foregroundColor.rgb.green, 10);
    self.fgColor.rgb.blue = parseInt(app.foregroundColor.rgb.blue, 10);

}

EventHandlerBuilder.prototype.onCanvExtendColorDropDwn = function() {
    var UI = this.UI;
    var self = this;

    UI.canvExtendColor.dropDwn.onChange = function() {
        var canvExtendColorDropDwn = UI.canvExtendColor.dropDwn.selection.toString();//Full list to select canvExtendColor.values

        if (canvExtendColorDropDwn === "Foreground") {
            app.foregroundColor = self.bgColor;
            app.backgroundColor = self.fgColor;

        } else if (canvExtendColorDropDwn === "Background") {
            app.foregroundColor = self.fgColor;
            app.backgroundColor = self.bgColor;

        } else if (canvExtendColorDropDwn === "White") {
            app.backgroundColor.rgb.red = 255;
            app.backgroundColor.rgb.green = 255;
            app.backgroundColor.rgb.blue = 255;

        } else if (canvExtendColorDropDwn === "Black") {
            app.backgroundColor.rgb.red = 0;
            app.backgroundColor.rgb.green = 0;
            app.backgroundColor.rgb.blue = 0;

        } else if (canvExtendColorDropDwn === "Grey") {
            app.backgroundColor.rgb.red = 128;
            app.backgroundColor.rgb.green = 128;
            app.backgroundColor.rgb.blue = 128;

        } else if (canvExtendColorDropDwn === "Select color") {
            showColorPicker();
            app.backgroundColor = app.foregroundColor;
            app.foregroundColor = self.fgColor;
        }
    }
}

EventHandlerBuilder.prototype.onBtnAccept = function() {
    var UI = this.UI;
    var self = this;

    UI.btnAccept.onClick = function() {
        UI.mainWindow.close();

        changeFileAndSave(self.sourceFilesToProcess, self.detinationFolder, 
            UI.grpWidth.numb.text, UI.grpHeight.numb.text, UI.grpWidth.unitsDropDown, self.anchorPostionValue, 
            UI.btnRadSourceFiles.chooseOpenedFiles, UI.btnRadSourceFiles.chooseFilesSourceFold, 
            UI.btnRadDestFold.same, UI.btnRadDestFold.other,
            self.fgColor, self.bgColor, UI.canvExtendColor.dropDwn.selection.toString());
        
        if (UI.btnRadSourceFiles.chooseOpenedFiles.value === true) {

            if (UI.numbOfActiveDocuments > 1) {
                alert("You added canvas to " + UI.numbOfActiveDocuments + " files");
            }
            else if (UI.numbOfActiveDocuments === 1) {
                alert("You added canvas to only 1 file");
            }

        } else if (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true) {

            var folderName = "";
            if (UI.btnRadDestFold.same.value === true) {
                folderName = decodeURIComponent(self.sourceFolderNameRecent); // string format is URl
            } else if (UI.btnRadDestFold.other.value === true) {
                folderName = decodeURIComponent(self.detinationFolder.name); // string format is URl
            }

            if (self.sourceFilesToProcess.length > 1) {
                var files = "files"
            } else if (self.sourceFilesToProcess.length === 1) {
                var files = "file"
            }

            alert("You added canvas to " + self.sourceFilesToProcess.length + " " + files + ",\nin folder: " + '"' + folderName + '"'); 
        }
    }
}

EventHandlerBuilder.prototype.onBtnCancel = function() {
    var UI = this.UI;

    UI.btnCancel.onClick = function() {
        UI.mainWindow.close();
    }
}

function createPanelUI(objectParent, orientationChildren, alignChildren, alignmentObject) {
    
    var objectChildGroup = objectParent.add("panel");
    if (typeof orientationChildren !== "undefined") objectChildGroup.orientation = orientationChildren;
    objectChildGroup.alignChildren = alignChildren;
    objectChildGroup.alignment = alignmentObject;

    return objectChildGroup;
}

function createGroupUI(objectParent, orientationChildren, alignChildren, alignmentObject) {

    var objectChildGroup = objectParent.add("group");
    objectChildGroup.orientation = orientationChildren;
    objectChildGroup.alignChildren = alignChildren;
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
        UI.filterSourceFilesCheckbox.byExpression.onClick();

    } else if (trueFalse === false){

        UI.filterSourceFilesCheckbox.enabled = false;
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

function filteringSourceFiles(sourceFilesUnfiltered, properFilesExtPSfiles) {

    var sourceFilesFiltered = new Array;

    for (var i = 0; i < sourceFilesUnfiltered.length; i++) { //todo undefined is not a object
        if (sourceFilesUnfiltered[i] instanceof File) {
            var sourceFilePathString = sourceFilesUnfiltered[i].toString();

            if (decodeURIComponent(sourceFilePathString).match(properFilesExtPSfiles)) {// decodeURIComponent(), to avoid problem when you have special signs in source files and in byExpression

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

function addingFilteredFilesToSourceFiles(sourceFilesUnfiltered, sourceFilesFiltered) {

    var sourceFiles = new Array;

    for (var i = 0; i < sourceFilesUnfiltered.length; i++) {

            if (sourceFilesFiltered[i] === sourceFilesUnfiltered[i].toString()) {
                sourceFiles.push(sourceFilesUnfiltered[i]);
            
        }
    }

    return sourceFiles;

}

function filterFilesByExpression(string, unfilteredFiles) {

    var string = string

    var regex = new RegExp(string);
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

function checkingIfItIsTheSameSourceFolderAsBefore(self) {

    var sameChoosedSourceFolderAsBefore = false;
    if ((typeof self.sourceFolderPathRecent !== "undefined") && (self.sourceFolder.toString() === self.sourceFolderPathRecent.toString())) {
        sameChoosedSourceFolderAsBefore = true;
    }
    return sameChoosedSourceFolderAsBefore;
}

/**
 * Restricts the character keys permitted in a `edittext` element.
 * @param {Object} editTextInstance - Reference to `edittext` ScriptUI element.
 */
function blockButtonByEdittext(editTextInstance) {

    if (editTextInstance.constructor.name !== 'EditText') {
      throw new Error ('Invalid class. Expected `EditText` class.')
    }
  
    var permissibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'Minus', 'Escape', 'Backspace', 'Enter'];
  
    editTextInstance.addEventListener('keydown', function (key) {
        var keyName = key.keyName;
        var shiftKeyIsDown = key.shiftKey;
        var altKeyIsDown = key.altKey;
  
    if (shiftKeyIsDown && keyName === 'Equal') {
        return;
    }
  
    if ((shiftKeyIsDown || altKeyIsDown) && inArray(keyName, permissibleKeys)) {
        key.preventDefault();
        return;
    }
  
    if (! inArray(keyName, permissibleKeys)) {
        key.preventDefault();
    }
    });
  }
  
/**
 * Determines whether an array includes a certain value among its elements.
 * @param {String} valueToFind - The value to search for.
 * @param {Array} arrayToSearch - The array to search in.
 * @returns {Boolean} true if the value valueToFind is found within the array
 */
  
function inArray(valueToFind, arrayToSearch) {
for (var i = 0, max = arrayToSearch.length; i < max; i++) {
    if (arrayToSearch[i] === valueToFind) {
        return true;
    }
}
return false;
}

function checkingIfWidthAndHeightIsNot0UnlockingBtn(Numb001, Numb002, btnEnabled) {

    if ((Numb001.text.match(/[0-9]+/) !== null) && (Numb002.text.match(/[0-9]+/) !== null) &&
        ((parseInt(Numb001.text, 10) !== 0) || (parseInt(Numb002.text, 10) !== 0)) ) { //there is only one possible bug when is equasion = 0, e. g. passing value = 1-1 = 0. In worst case scenario it happens nothing.

        btnEnabled.enabled = true;

    } else {

        btnEnabled.enabled = false;
    }

}

function sameInputField(condition, inputFieldToCopy, inputFieldToPasteIn) {
    if (condition.value === true) {
        inputFieldToPasteIn.text = inputFieldToCopy.text;
    }
}

function sameDropDown(objectEvent, objectSetSameValue) {
    if (objectEvent.selection.index !== objectSetSameValue.selection.index) {
        objectSetSameValue.selection = objectEvent.selection.index;
    }
}

function createTooltipToImage(condition, picture, pictureSourceTrue, pictureSourceFalse) {
    if (condition.value === true) {
        picture.image = pictureSourceTrue;
        picture.helpTip = "Width and Height same value anabled";
    }
    else if (condition.value === false) {
        picture.image = pictureSourceFalse;
        picture.helpTip = "Width and Height same value disabled";
    }
}

//Anchor button functionality
function anchorSetingNew(btnAnchorClickedOn, anchorPositionValue, anchorPostionButtons, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPostionButtons.length; i++){
        anchorPostionButtons[i].image = imageAnchorFalse;
    }

     //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPositionValue;
}

//Used later to dispaly names of opened files
function docsOpenedNames() {
    
    var docsNamesToInfoUI = new Array;
    
    for (var i = 0; i < app.documents.length; i++) {
        docsNamesToInfoUI[i] = app.documents[i];
    }

    return docsNamesToInfoUI;
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
            prevDocNames[i] = prevDocNames[i] + charComas[i];
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
    
    panelInfoUITitle.text =  "Files to process: " + filesNumbers;
}

function changeFileAndSave(sourceFiles, detinationFolder, 
    addWidth, addHeight, unitsList, anchor, 
    btnRadChooseFilesActiveDocs, btnRadChooseFilesSourceFold, 
    btnRadSameFolder, btnRadDestFoldOther, 
    fgColorPrevious, bgColorPrevious, canvExtendColorDropDwn) {

    //full list is in var AddCanvasDocUnits
    var unitsTypes = [
        ["ADD PX", "PX"],
        ["ADD %", "PERCENT"],
    ];
    
    var units = unitsTypes[parseInt(unitsList.selection, 10)][1];

    //If you choose radio button "Opened files"
    if (btnRadChooseFilesActiveDocs.value === true){

        while (app.documents.length > 0) {

            var doc = app.activeDocument;

            if( itHasBackgroundLayerChecker() ) {// To avoid bug with picking empty layer

            leftUpperCornerColorBGSet(canvExtendColorDropDwn);

            }
            
            addCanvas(addWidth, addHeight, units, anchor);

            doc.save();
            doc.close();
        }
    
    //If you choose  radio button "Source folder"
    } else if (btnRadChooseFilesSourceFold.value === true) {

        for(var i = 0; i < sourceFiles.length; i++) {

            open(sourceFiles[i]);

            var doc = app.activeDocument;

            if( itHasBackgroundLayerChecker() ) {// To avoid bug with picking empty layer

                leftUpperCornerColorBGSet(canvExtendColorDropDwn);

            };
            
            addCanvas(addWidth, addHeight, units, anchor);

            //If you choose radio button "Add canvas in the same folder", saves the same files in original location
            if (btnRadSameFolder.value === true) {
                doc.save();

            //If you choose radio button "Copy and Add canvas to other folder", save files in other folder
            } else if (btnRadDestFoldOther.value === true) {

                //Declaring name of saved file
                var name = doc.name;

                var path = detinationFolder;

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
            doc.close();
                
        }
    }

    app.foregroundColor = fgColorPrevious;
    app.backgroundColor = bgColorPrevious;
}

function leftUpperCornerColorBGSet(canvExtendColorDropDwn) {

    var doc = app.activeDocument;

    if (canvExtendColorDropDwn === "Left upper corner color") {
        // Remove any Color Samplers that may already exist.
        doc.colorSamplers.removeAll();
        // deselct any selection that may already exist.
        doc.selection.deselect();
        // Get color sample from a given x,y coordinate.
        var pixelLoc = [0, 0];
        var colorSampleRef = doc.colorSamplers.add(pixelLoc);

        var sampledColor = colorSampleRef.color;
        // Set the foreground color to the sampled color.
        app.backgroundColor = sampledColor;
        colorSampleRef.remove();
    }
}

function itHasBackgroundLayerChecker() {

    var doc = app.activeDocument;
    var docLastLayer = doc.artLayers[doc.artLayers.length - 1];
    var itHasbackgroundLayer = docLastLayer.isBackgroundLayer;
    return itHasbackgroundLayer;
    
}

function addCanvas(addWidth, addHeight, units, anchor) {

    var doc = app.activeDocument;

    var mathWidthAndHeightResult = mathSumWidthAndHeight(units, addWidth, addHeight, doc);
    var sumWidth = mathWidthAndHeightResult[1];
    var sumHeight = mathWidthAndHeightResult[0];

    doc.resizeCanvas(UnitValue(sumWidth, units), UnitValue(sumHeight, units), anchor);
}

function mathSumWidthAndHeight(units, addWidth, addHeight, doc) {

    var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10);
    var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10);

    if (units === "PERCENT") {
        var sumWidth = 100 + parseInt(addWidth, 10); //Have to parse to Int becouse numb with decinamls cause bugs in resizeCanvas() function
        var sumHeight = 100 + parseInt(addHeight, 10); //Have to parse to Int becouse numb with decinamls cause bugs in resizeCanvas() function
    }
    else if (units === "PX") {
        var sumWidth = activeDocWidth + parseInt(addWidth, 10); //Have to parse to Int becouse numb with decinamls cause bugs in resizeCanvas() function
        var sumHeight = activeDocHeight + parseInt(addHeight, 10); //Have to parse to Int becouse numb with decinamls cause bugs in resizeCanvas() function
    }

    return [ sumWidth, sumHeight ];
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

main();

function main() {
    
    var UI = new GuiBuilder();   

    UI.buildPanelSourceFiles();

    UI.buildPanelSourceFilesFilter();

    UI.buildPanelDestinationFolder();

    UI.buildPanelAddCanvas();

    UI.buildPanelInfoUI();

    UI.buildAcceptCancelButtons();

//-------------------------------------------------------------------------------------------------------------------------------

    var eventHandler = new EventHandlerBuilder( UI );

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

    eventHandler.startSettingsWidthAndHeight();

    eventHandler.onGrpWidthNumb();

    eventHandler.onGrpWidthUnitsDropDown();
    
    eventHandler.onGrpHeightNumb();
    
    eventHandler.onGrpHeightUnitDropDown();
    
    eventHandler.tooltipWidthAndHeightImage();

    eventHandler.onGrpDlgUnitValImage();

    eventHandler.onAnchorButtons();

    eventHandler.onConstrainsProportionsCheckbox();

    eventHandler.tooltipConstrainsProportionsCheckbox();

    eventHandler.savingBGandFGtoRestoreLater();

    eventHandler.onCanvExtendColorDropDwn();

    eventHandler.onBtnAccept();

    eventHandler.onBtnCancel();

    UI.showMainWindow();   
}




