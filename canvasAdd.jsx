#target photoshop

$.level = 1; // Debugging level

function GuiBuilder (){
    this.baseLayout();
}

GuiBuilder.prototype.baseLayout = function() {
    //Creating group to populate with main UI
    this.mainWindow = new Window("dialog", "Add canvas");
    this.grpMain = this.mainWindow.add("group")
    this.grpInfo = createGroupUI(this.grpMain, "column", "left");
    this.panelWidth = 40; // Do not use creation property for panels due to issues with bugs
}

GuiBuilder.prototype.buildPanelSourceFiles = function() {
    //Creating group to populate with main UI
    this.plnSourceFiles = createPanelUI(this.grpInfo, undefined, "left");

    //Source files title
    this.plnSourceFiles.title = this.plnSourceFiles.add("statictext", undefined, "Source files:");

    //Creating radial button group
    this.btnRadSourceFiles = createGroupUI(this.plnSourceFiles, "column", "left", "left");

    //Radial button choose active files/target folder
    this.btnRadSourceFiles.chooseSourceFold = this.btnRadSourceFiles.add("radiobutton", undefined, "Opened files");
    this.btnRadSourceFiles.chooseFilesSourceFold = this.btnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

    //Add button to choose target folder
    this.grpBtnChooseFilesSourceFold = this.plnSourceFiles.add("group");

    this.btnChooseFilesSourceFold =  this.grpBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
    this.btnChooseFilesSourceFold.title = this.grpBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");
    this.btnChooseFilesSourceFold.title.characters = this.panelWidth;
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
    this.btnChooseFilesDestFold.title.characters = this.panelWidth;
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
                this.scriptPath = $.fileName;
                this.scriptFolderDestination = this.scriptPath.toString().replace(/\\/g, '/').slice(0, -13); // -13 is the lenght of the script file name

                //Image: InfoHover.png
                this.imageInfHov = File(this.scriptFolderDestination + "InfoHover.png");
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
            this.imageCnstrnsProportionFalse = File(this.scriptFolderDestination + "ConstrPropFalse.png");
            this.imageCnstrnsProportionTrue = File(this.scriptFolderDestination + "ConstrPropTrue.png");

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
            this.imageAnchorTrue = File(this.scriptFolderDestination + "anchorPointerTrue.png");
            this.imageAnchorFalse = File(this.scriptFolderDestination + "anchorPointerFalse.png");

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
    this.grpAnchorMarginesSpaceBottom.characters = this.panelWidth + 13;//Giving the same width as: this.plnSourceFiles, this.pnlDestFold

    //Canvas color extension
    this.canvExtendColor = this.pnlAddCanvas.add("group");

        this.canvExtendColor.title = this.canvExtendColor.add("statictext", undefined, "Canvas extension color: ");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Other..."
                                    ];// functions in onCanvExtendColorDropDwn; Can't be part of UI object, becouse of bug in the next line

        this.canvExtendColor.dropDwn = this.canvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColor.dropDwn.selection = 1;

}

GuiBuilder.prototype.buildPanelInfoUI = function(){

    //Creating panel to display to files
    this.pnlDocInfo = createPanelUI(this.grpInfo, undefined, "left");

    //Number of files displayed in "Info UI"
    this.numbOfDisplayedFiles = 2;

    //Creating empty lines of text to fill with files names
    this.plnDocInfoLines = new Array; //plnDocInfo.lines -> "undefined not as object"

    for (var i = 0; i < (this.numbOfDisplayedFiles + 1); i++) {
        this.plnDocInfoLines[i] = this.pnlDocInfo.add("statictext");
        this.plnDocInfoLines[i].characters = this.panelWidth + 13;//Giving the same width as: this.plnSourceFiles, this.pnlDestFold
    }
}

GuiBuilder.prototype.buildAcceptCancelButtons = function() {

        this.grpBtns = createGroupUI(this.grpMain, "column", undefined, [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP]);

        //Accept button
        this.btnAccept = this.grpBtns.add("button", undefined, "Accept");
        //Cancel button
        this.btnCancel = this.grpBtns.add("button", undefined, "Close");
}

function EventHandlerBuilder(UI) {
    this.UI = UI;
}

GuiBuilder.prototype.showMainWindow = function(){
    this.mainWindow.show();
}

EventHandlerBuilder.prototype.onBtnRadChooseFilesActiveDocs = function() {
    var UI = this.UI;

    //Opened files in PS
    UI.btnRadSourceFiles.chooseSourceFold.onClick = function() {

        //Disabled "Source folder..." button
        UI.btnChooseFilesSourceFold.enabled = false;
        UI.btnChooseFilesSourceFold.title.enabled = false;

        //Disabled "Destination folder"" panel title
        UI.pnlDestFold.title.enabled = false;

        //Disabled radButton destination folder
        UI.btnRadDestFold.same.enabled = false;
        UI.btnRadDestFold.other.enabled = false;

        //Disabled "destination folder..." button            
        UI.btnChooseFilesDestFold.enabled = false;
        UI.btnChooseFilesDestFold.title.enabled = false;

        //Anabled Add canvas panel
        if (UI.pnlAddCanvas.enabled === false) UI.pnlAddCanvas.enabled = true;

        infoUItoDisplay(docsOpenedNames(), UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onBtnRadChooseFilesSourceFold = function() {
    var UI = this.UI;
    var self = this;

    //Choose source folder
    UI.btnRadSourceFiles.chooseFilesSourceFold.onClick = function() {

        //Anabled "Source folder..." button
        UI.btnChooseFilesSourceFold.enabled = true;
        UI.btnChooseFilesSourceFold.title.enabled = true;

        //Until there is no choosed folder you have only ability to browse source folder
        if (UI.btnChooseFilesSourceFold.title.text === "Source folder...") {
            //Disabled "Destination folder"" panel title
            UI.pnlDestFold.title.enabled = false;

            //Disabled radButtons destination folder
            UI.btnRadDestFold.same.enabled = false;
            UI.btnRadDestFold.other.enabled = false;

            //Disabled "destination folder..." button
            UI.btnChooseFilesDestFold.enabled = false;
            UI.btnChooseFilesDestFold.title.enabled = false;

            //Button accept disabled if you do not any values to Height and Width dialog
            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

            //Disabled Add canvas panel
            UI.pnlAddCanvas.enabled = false;

            //Uptade info UI with files from source folder
            infoUItoDisplay(undefined, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

            UI.btnAccept.enabled = false;
        
        } else if (UI.btnChooseFilesSourceFold.title.text !== "Source folder..."){
            //Anabled "Destination folder"" panel title
            UI.pnlDestFold.title.enabled = true;

            //Anabled radButton destination folder
            UI.btnRadDestFold.same.enabled = true;
            UI.btnRadDestFold.other.enabled = true;
            
            if (UI.btnRadDestFold.other.value === true) {

                UI.btnRadDestFold.other.notify();

            }

            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

            //Uptade info UI with files from source folder
            infoUItoDisplay(self.sourceFiles, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);
        }
    }
}

EventHandlerBuilder.prototype.startSettingsUINoActiveDocs = function() {
    var UI = this.UI;

    //Start setting. If there is no active docs, set to choose folder
    if (app.documents.length === 0) {

        UI.btnRadSourceFiles.chooseFilesSourceFold.notify();

        UI.btnRadSourceFiles.chooseSourceFold.enabled = false;

        UI.btnRadDestFold.same.value = true;
        UI.btnAccept.enabled = false;

    } else if (app.documents.length > 0) {

        UI.btnRadSourceFiles.chooseSourceFold.notify();
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

            var notTheSameChoosedSourceFolderAsBefore = true;
            if ((typeof self.sourceFolderPathRecent !== "undefined") && (self.sourceFolder.toString() === self.sourceFolderPathRecent.toString())) {
                notTheSameChoosedSourceFolderAsBefore = false;
            }
    
            self.sourceFolderNameRecent = self.sourceFolder.name; //Saving name of source folder to avoid bug; If you choose already some folder, but later you canceled choosing folder, you will not get undefined becouse of this variable.
            self.sourceFolderPathRecent = self.sourceFolder; //Add to self to avoid scope issues
            
            var sourceFilesUnfiltered = new Array;
            var sourceFilesArrayPathsString = new Array;
            var properFilesExtPSfiles = /.(jpg|tif|psd|bmp|gif|png)$/;

            sourceFilesUnfiltered = self.sourceFolder.getFiles();

            for(var i = 0; i < sourceFilesUnfiltered.length; i++) {
                if(sourceFilesUnfiltered[i] instanceof File) {
                    var sourceFilePathString = sourceFilesUnfiltered[i].toString();
                    if(sourceFilePathString.match(properFilesExtPSfiles)) {
                        sourceFilesArrayPathsString[i] = sourceFilePathString;
                    }
                }
            }

            if (sourceFilesArrayPathsString.length === 0) {

                self.sourceFolder === null;
                
                createPathString(UI.btnChooseFilesSourceFold.title, "Source folder...");
                UI.btnRadDestFold.same.enabled = false;
                UI.btnRadDestFold.other.enabled = false;
                
                UI.btnChooseFilesDestFold.enabled = false;
                UI.btnChooseFilesDestFold.title.enabled = false;
                UI.pnlAddCanvas.enabled = false;
                
                UI.btnAccept.enabled = false;

                infoUItoDisplay(undefined, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

                alert("In choosed folder there is no files to process");

            } else if (sourceFilesArrayPathsString.length > 0) {

                self.sourceFiles = new Array;
                for(var i = 0; i < sourceFilesUnfiltered.length; i++) {
                    for(var i = 0; i < sourceFilesArrayPathsString.length; i++) {
                        if(sourceFilesArrayPathsString[i] === sourceFilesUnfiltered[i].toString()) {
                            self.sourceFiles.push(sourceFilesUnfiltered[i]);
                        }
                    }
                }

                createPathString(UI.btnChooseFilesSourceFold.title, self.sourceFolder);
                
                //Uptade info UI with files from source folder
                infoUItoDisplay(self.sourceFiles, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

                //Enabling buttons
                UI.pnlDestFold.title.enabled = true;
                UI.btnRadDestFold.same.enabled = true;
                UI.btnRadDestFold.other.enabled = true;

                if (typeof self.detinationFolder === "undefined") {

                    UI.btnRadDestFold.same.notify();

                } else if ((typeof self.detinationFolder !== "undefined") && (self.detinationFolder !== null) ) { //(self.detinationFolder !== null) to avoid bug

                    if (self.detinationFolder.toString() !== self.sourceFolder.toString() ) {

                        UI.btnRadDestFold.other.notify();

                    } else if (self.detinationFolder.toString() === self.sourceFolder.toString() ) {

                        createPathString(UI.btnChooseFilesDestFold.title, "Destination folder...");
                        
                        self.detinationFolder = null;
                        UI.btnRadDestFold.same.notify();
    
                        alert("Source folder and target folder are the same.\nNext time choose more wisely");

                    }
                }
                
                if (notTheSameChoosedSourceFolderAsBefore === true) {
                    if (self.sourceFiles.length > 1) {
                        alert("In folder are " + self.sourceFiles.length + " files");
                    } else if (self.sourceFiles.length === 0) {
                        alert("In folder is 1 file");
                    }
                }
            }
        } 
    }
}

EventHandlerBuilder.prototype.onBtnRadDestFoldSame = function() {
    var UI = this.UI;

    UI.btnRadDestFold.same.onClick = function() {

        UI.btnChooseFilesDestFold.enabled = false;
        UI.btnChooseFilesDestFold.title.enabled = false;

        checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);

        UI.pnlAddCanvas.enabled = true;
    }
}

EventHandlerBuilder.prototype.onBtnRadDestFoldOther = function() {
    var UI = this.UI;

    //Copy and Add canvas in other folder
    UI.btnRadDestFold.other.onClick = function() {

        UI.btnChooseFilesDestFold.enabled = true;
        UI.btnChooseFilesDestFold.title.enabled = true;

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

        if (detinationFolderSelection === null) {

            if (UI.btnChooseFilesDestFold.title.text === "Destination folder...") {
                alert("You have not selected target folder");
                self.detinationFolder = null; //to avoid bug
            } //else {if you have already have had selected folder destination, then it remains status quo}

        } else if (detinationFolderSelection.toString() !== self.sourceFolder.toString()) {

            createPathString(UI.btnChooseFilesDestFold.title, detinationFolderSelection);
            checkingIfWidthAndHeightIsNot0UnlockingBtn(UI.grpWidth.numb, UI.grpHeight.numb, UI.btnAccept);
            UI.pnlAddCanvas.enabled = true;

            self.detinationFolder = detinationFolderSelection;
        } else if (detinationFolderSelection.toString() === self.sourceFolder.toString()) {

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

    self.anchorPosOutcome = AnchorPosition.MIDDLECENTER;

    var anchorPositionArray = new Array;
    anchorPositionArray.push(UI.anchorPositionTOPLEFT, UI.anchorPositionTOPCENTER, UI.anchorPositionTOPRIGHT, UI.anchorPositionMIDDLELEFT, UI.anchorPositionMIDDLECENTER, UI.anchorPositionMIDDLERIGHT, UI.anchorPositionBOTTOMLEFT, UI.anchorPositionBOTTOMCENTER, UI.anchorPositionBOTTOMRIGHT);

    //Adding functionality to buttons in anchor box
    UI.anchorPositionTOPLEFT.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionTOPLEFT, AnchorPosition.TOPLEFT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPCENTER.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionTOPCENTER, AnchorPosition.TOPCENTER, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPRIGHT.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionTOPRIGHT, AnchorPosition.TOPRIGHT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionMIDDLELEFT.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionMIDDLELEFT, AnchorPosition.MIDDLELEFT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLECENTER.onClick = function() {self.anchorPosOutcome =anchorSetingNew(UI.anchorPositionMIDDLECENTER, AnchorPosition.MIDDLECENTER, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLERIGHT.onClick = function() {self.anchorPosOutcome =anchorSetingNew(UI.anchorPositionMIDDLERIGHT, AnchorPosition.MIDDLERIGHT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionBOTTOMLEFT.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionBOTTOMLEFT, AnchorPosition.BOTTOMLEFT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMCENTER.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionBOTTOMCENTER, AnchorPosition.BOTTOMCENTER, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMRIGHT.onClick = function() {self.anchorPosOutcome = anchorSetingNew(UI.anchorPositionBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT, anchorPositionArray, UI.imageAnchorTrue, UI.imageAnchorFalse)}
}

EventHandlerBuilder.prototype.onConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.onClick = function() {
        //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
        createTooltipToImage(UI.constrainsProportionsCheckbox, UI.grpDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);

        //Set the same highest value in "Height" and "Width"
        if (UI.constrainsProportionsCheckbox.value === true) {
            //If Height and Width is negative or equal 0, it set in both most negative number
            if((parseInt(UI.grpWidth.numb.text, 10) <= 0) && (parseInt(UI.grpHeight.numb.text, 10) <= 0)) {
                if (parseInt(UI.grpWidth.numb.text, 10) < parseInt(UI.grpHeight.numb.text, 10)) {
                    UI.grpWidth.numb.onChanging();
                }
                //If some value is postive, set in both most positive number
                else {
                    UI.grpHeight.numb.onChanging();
                }
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

    UI.constrainsProportionsCheckbox.helpTip =  "Check to constrain Height and Width"
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

        } else if (canvExtendColorDropDwn === "Other...") {
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

        changeFileAndSave(self.sourceFiles, self.detinationFolder, 
            UI.grpWidth.numb.text, UI.grpHeight.numb.text, UI.grpWidth.unitsDropDown, self.anchorPosOutcome, 
            UI.btnRadSourceFiles.chooseSourceFold, UI.btnRadSourceFiles.chooseFilesSourceFold, 
            UI.btnRadDestFold.same, UI.btnRadDestFold.other,
            self.fgColor, self.bgColor);
        
        if (UI.btnRadSourceFiles.chooseSourceFold.value === true) {

            if (UI.numbOfActiveDocuments > 1) {
                alert("You added canvas to " + UI.numbOfActiveDocuments + " files");
            }
            else if (UI.numbOfActiveDocuments === 1) {
                alert("You added canvas to only 1 file");
            }

        } else if (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true) {

            var folderName = "";
            if (UI.btnRadDestFold.same.value === true) {
                folderName = self.sourceFolderNameRecent.replace(/%20/g, ' ');
            } else if (UI.btnRadDestFold.other.value === true) {
                folderName = self.detinationFolder.name.replace(/%20/g, ' ');
            }

            if (self.sourceFiles.length > 1) {
                var files = "files"
            } else if (self.sourceFiles.length === 1) {
                var files = "file"
            }

            alert("You added canvas to " + self.sourceFiles.length + " " + files + ",\nin folder: " + '"' + folderName + '"'); 
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

function createPathString(textObject, path) {

    if (typeof path !== "string") {
        var string = path.toString().replace(/%20/g, ' ');
    } else if (typeof path === "string") {
        var string = path;
    }

    if (string.length > textObject.characters) {
        textObject.text = "..." + string.slice(-(textObject.characters));
    }
    else if (textObject.characters >= string.length) {
        textObject.text = string;
    }
}

function checkingIfWidthAndHeightIsNot0UnlockingBtn(Numb001, Numb002, btnEnabled) {

    if ((Numb001.text.match(/[^-\+0-9]+/) !== null) || (Numb002.text.match(/[^-\+,0-9]+/) !== null) || 
        (Numb001.text.match(/[0-9]+/) === null) || (Numb002.text.match(/[0-9]+/) === null) ||
        ((parseInt(Numb001.text, 10) === 0) && (parseInt(Numb002.text, 10) === 0)) ) {

        btnEnabled.enabled = false;

    } else {

        btnEnabled.enabled = true;
    }

}

function sameInputField(condition, inputFieldToCopy, inputFieldToPasteIn) {
    if (condition.value === true) {
        inputFieldToPasteIn.text = inputFieldToCopy.text;
    }
}

function sameDropDown(objectEvent, objectIndexSetSame) {
    if (objectEvent.selection.index !== objectIndexSetSame.selection.index) {
        objectIndexSetSame.selection = objectEvent.selection.index;
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
function anchorSetingNew(btnAnchorClickedOn, anchorPosition, anchorPositionArray, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPositionArray.length; i++){
        anchorPositionArray[i].image = imageAnchorFalse;
    }

     //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPosition;
}

//Used later to dispaly names of opened files
function docsOpenedNames() {
    
    var docsNamesToInfoUI = new Array;
    
    for (var i = 0; i < app.documents.length; i++) {
        docsNamesToInfoUI[i] = app.documents[i];
    }

    return docsNamesToInfoUI;
}

function infoUItoDisplay(sourceFiles, numbOfDisplayedFiles, panelInfoUITitle, panelInfoUIwriteLines) {

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
            filesNamesInfoUI[i] = sourceFiles[i].name;
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
    //Adding created names into empty "InfoUI" list
    for (var i = 0; i < panelInfoUIwriteLines.length; i++) {
        panelInfoUIwriteLines[i].text = filesNames[i];
    }
    
    //Adding number of files to "Info UI" title panel
    panelInfoUITitle.text =  "Files to process: " + filesNumbers;
}

function changeFileAndSave(sourceFiles, detinationFolder, 
    addWidth, addHeight, unitsList, anchor, 
    btnRadChooseFilesActiveDocs, btnRadChooseFilesSourceFold, 
    btnRadSameFolder, btnRadDestFoldOther, 
    fgColor, bgColor) {

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
            addCanvas(addWidth, addHeight, units, anchor, doc);

            doc.save();
            doc.close();
        }
    
    //If you choose  radio button "Source folder"
    } else if (btnRadChooseFilesSourceFold.value === true) {

        for(var i = 0; i < sourceFiles.length; i++) {

            open(sourceFiles[i]);

            var doc = app.activeDocument;
            addCanvas(addWidth, addHeight, units, anchor, doc);

            //If you choose radio button "Add canvas in the same folder", saves the same files
            if (btnRadSameFolder.value === true) {
                doc.save();

            //If you choose radio button "Copy and Add canvas to other folder", save files in other folder
            } else if (btnRadDestFoldOther.value === true) {

                //Declaring name of saved file
                var name = doc.name;

                //Declaring path
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
    //Setting background & foregound colors back to original state
    app.foregroundColor = fgColor;
    app.backgroundColor = bgColor;
}

function addCanvas(addWidth, addHeight, units, anchor, doc) {

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

    UI.buildPanelDestinationFolder();

    UI.buildPanelAddCanvas();

    UI.buildPanelInfoUI();

    UI.buildAcceptCancelButtons();

//-------------------------------------------------------------------------------------------------------------------------------

    var eventHandler = new EventHandlerBuilder( UI );

    eventHandler.onBtnRadChooseFilesActiveDocs();

    eventHandler.onBtnRadChooseFilesSourceFold();

    eventHandler.startSettingsUINoActiveDocs();

    eventHandler.onBtnChooseFilesSourceFold();

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
