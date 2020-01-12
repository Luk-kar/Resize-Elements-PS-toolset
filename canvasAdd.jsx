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
    this.btnChooseFilesTitleCharLength = 40;//This number is responsible for width of panels; Do not use creation property for panels due to issues with bugs
}

GuiBuilder.prototype.buildPanelSourceFiles = function() {
    //Creating group to populate with main UI
    this.plnSourceFiles = createPanelUI(this.grpInfo, undefined, "left");

    //Source files title
    this.plnSourceFiles.add("statictext", undefined, "Source files:");

    //Creating radial button group
    this.grpBtnRadSourceFiles = createGroupUI(this.plnSourceFiles, "column", "left", "left");

    //Radial button choose active files/target folder
    this.btnRadChooseFilesActiveDocs = this.grpBtnRadSourceFiles.add("radiobutton", undefined, "Opened files");
    this.btnRadChooseFilesSourceFold = this.grpBtnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

    //Add button to choose target folder
    this.grpBtnChooseFilesSourceFold = this.plnSourceFiles.add("group");

    this.btnChooseFilesSourceFold =  this.grpBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
    this.btnChooseFilesSourceFoldTitle = this.grpBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");
    this.btnChooseFilesSourceFoldTitle.characters = this.btnChooseFilesTitleCharLength;
}

GuiBuilder.prototype.buildPanelDestinationFolder = function() {

    this.pnlDestFold = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlDestFoldTitle = this.pnlDestFold.add("statictext", undefined, "Destination folder:");

    //Creating group radial button choose destination folder
    this.grpBtnRadChooseFolder = createGroupUI(this.pnlDestFold, "column", "left", "left");

    //Radial buttons choose destination folder
    this.btnRadDestFoldSame = this.grpBtnRadChooseFolder.add("radiobutton", undefined, "Add canvas in the same folder");
    this.btnRadDestFoldOther = this.grpBtnRadChooseFolder.add("radiobutton", undefined, "Add canvas and copy files to other folder");

    //Browse button destination folder
    this.grpBtnDestFold = this.pnlDestFold.add("group");

    this.btnChooseFilesDestFold = this.grpBtnDestFold.add("button", undefined, "Browse...");
    this.btnChooseFilesDestFoldTitle = this.grpBtnDestFold.add("statictext", undefined, "Destination folder...");
    this.btnChooseFilesDestFoldTitle.characters = this.btnChooseFilesTitleCharLength;
}

GuiBuilder.prototype.buildPanelAddCanvas = function(){

    ///Add canvas UI
    this.pnlAddCanvas = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlAddCanvasTitle = this.pnlAddCanvas.add("statictext", undefined, "Add canvas");

    //Group units value
    this.grpUnitVal = this.pnlAddCanvas.add("group");
    //grpUnitVal.alignment = "left";

        //Group dialog units value
        this.grpUnitValDlg = createGroupUI(this.grpUnitVal, "column", "left");

            //Group width
            this.grpWidth = this.grpUnitValDlg.add("group");

                //Edittext: Width
                this.grpWidthText = this.grpWidth.add("statictext", undefined, "Width:  ");
                this.grpWidthNumb =  this.grpWidth.add("edittext", undefined, 0);
                this.grpWidthNumb.characters = 9;

                //Update also unitsTypes
                var AddCanvasDocUnits = [
                    "ADD PX", 
                    "ADD %",
                    ];
                this.grpWidthUnitsDropDown = this.grpWidth.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpWidthUnitsDropDown.selection = 0;

                //Crating path to image folder
                this.scriptPath = $.fileName;
                this.scriptPathString = this.scriptPath.toString().replace(/\\/g, '/').slice(0, -13); // -13 is the lenght of the script file name

                //Image: InfoHover.png
                this.imageInfHov = File(this.scriptPathString + "InfoHover.png");
                this.toolTipWidthImage = this.grpWidth.add("image", undefined, this.imageInfHov);

            //Group height
            this.grpHeight = this.grpUnitValDlg.add("group");

                //Edittext: Height
                this.grpHeightText = this.grpHeight.add("statictext", undefined, "Height: ");
                this.grpHeightNumb =  this.grpHeight.add("edittext", undefined, 0);
                this.grpHeightNumb.characters = 9;

                //Dropdownlist: Add PX, add %
                this.grpHeightUnitDropDown = this.grpHeight.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpHeightUnitDropDown.selection = 0;

                //Image: InfoHover.png
                this.toolTipHeightImage = this.grpHeight.add("image", undefined, this.imageInfHov);

        //Graphic element proportions constrains (true, false)

            //Uplaoding constrains images next Width and Height dialog groups
            this.imageCnstrnsProportionFalse = File(this.scriptPathString + "ConstrPropFalse.png");
            this.imageCnstrnsProportionTrue = File(this.scriptPathString + "ConstrPropTrue.png");

            //Add constrain image next to dialog
            this.grpDlgUnitValImage = this.grpUnitVal.add("image", undefined, this.imageCnstrnsProportionFalse);
            this.grpDlgUnitValImage.alignment = "right";

    //Constrains proportions
    this.constrainsProportionsCheckbox = this.pnlAddCanvas.add("checkbox", undefined, "Same Height and Width");

    //Anchor display
    this.grpAnchorMarginesSpaceTop =  [this.pnlAddCanvas.add("group", undefined, ""),
                                    this.pnlAddCanvas.add("group", undefined, "")];

    this.grpAnchor = this.pnlAddCanvas.add("group");
    this.grpAnchorTitle = this.grpAnchor.add("statictext", undefined, "Anchor: ");
    this.grpAnchorTitle.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

        //Creating anchor group box
        this.grpAnchorBoxBtns = createGroupUI(this.grpAnchor, "column");

        //Creating anchor gorup lines inside box
        this.grpAnchorBoxBtnsLine001 = this.grpAnchorBoxBtns.add("group");
        this.grpAnchorBoxBtnsLine002 = this.grpAnchorBoxBtns.add("group");
        this.grpAnchorBoxBtnsLine003 = this.grpAnchorBoxBtns.add("group");

            //Image: imageAnchorTrue.png and imageAnchorFalse.png
            this.imageAnchorTrue = File(this.scriptPathString + "anchorPointerTrue.png");
            this.imageAnchorFalse = File(this.scriptPathString + "anchorPointerFalse.png");

            //Adding 001 line of buttons
            this.anchorPositionTOPLEFT = this.grpAnchorBoxBtnsLine001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPCENTER = this.grpAnchorBoxBtnsLine001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPRIGHT = this.grpAnchorBoxBtnsLine001.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 002 line of buttons
            this.anchorPositionMIDDLELEFT = this.grpAnchorBoxBtnsLine002.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionMIDDLECENTER = this.grpAnchorBoxBtnsLine002.add("iconbutton", undefined, this.imageAnchorTrue);
            this.anchorPositionMIDDLERIGHT = this.grpAnchorBoxBtnsLine002.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 003 line of buttons
            this.anchorPositionBOTTOMLEFT = this.grpAnchorBoxBtnsLine003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMCENTER = this.grpAnchorBoxBtnsLine003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMRIGHT = this.grpAnchorBoxBtnsLine003.add("iconbutton", undefined, this.imageAnchorFalse);

    this.grpAnchorMarginesSpaceBottom = this.pnlAddCanvas.add("statictext", undefined, "");
    this.grpAnchorMarginesSpaceBottom.characters = this.btnChooseFilesTitleCharLength + 13;//Giving the same width as: this.plnSourceFiles, this.pnlDestFold

    //Canvas color extension
    this.grpCanvExtendColor = this.pnlAddCanvas.add("group");

        this.grpCanvExtendColorText = this.grpCanvExtendColor.add("statictext", undefined, "Canvas extension color: ");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Other..."
                                    ];// functions in onCanvExtendColorDropDwn

        this.canvExtendColorDropDwn = this.grpCanvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColorDropDwn.selection = 1;

}

GuiBuilder.prototype.buildPanelInfoUI = function(){

    //Creating panel to display to files
    this.pnlDocInfo = createPanelUI(this.grpInfo, undefined, "left");

    //Number of files displayed in "Info UI"
    this.numbOfDisplayedFiles = 2;

    //Creating empty lines of text to fill with files names
    this.plnDocInfoLines = new Array;

    for (var i = 0; i < (this.numbOfDisplayedFiles + 1); i++) {
        this.plnDocInfoLines[i] = this.pnlDocInfo.add("statictext");
        this.plnDocInfoLines[i].characters = this.btnChooseFilesTitleCharLength + 13;//Giving the same width as: this.plnSourceFiles, this.pnlDestFold
    }
}

GuiBuilder.prototype.buildAcceptCancelButtons = function() {
        //Creating button group
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
    UI.btnRadChooseFilesActiveDocs.onClick = function() {

        //Disabled "Source folder..." button
        UI.btnChooseFilesSourceFold.enabled = false;
        UI.btnChooseFilesSourceFoldTitle.enabled = false;

        //Disabled "Destination folder"" panel title
        UI.pnlDestFoldTitle.enabled = false;

        //Disabled radButton destination folder
        UI.btnRadDestFoldSame.enabled = false;
        UI.btnRadDestFoldOther.enabled = false;

        //Disabled "destination folder..." button            
        UI.btnChooseFilesDestFold.enabled = false;
        UI.btnChooseFilesDestFoldTitle.enabled = false;

        //Anabled Add canvas panel
        if (UI.pnlAddCanvas.enabled === false) UI.pnlAddCanvas.enabled = true;

        infoUItoDisplay(docsOpenedNames(), UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

        checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onBtnRadChooseFilesSourceFold = function() {
    var UI = this.UI;
    var self = this;

    //Choose source folder
    UI.btnRadChooseFilesSourceFold.onClick = function() {

        //Anabled "Source folder..." button
        UI.btnChooseFilesSourceFold.enabled = true;
        UI.btnChooseFilesSourceFoldTitle.enabled = true;

        //Until there is no choosed folder you have only ability to browse source folder
        if (UI.btnChooseFilesSourceFoldTitle.text === "Source folder...") {
            //Disabled "Destination folder"" panel title
            UI.pnlDestFoldTitle.enabled = false;

            //Disabled radButtons destination folder
            UI.btnRadDestFoldSame.enabled = false;
            UI.btnRadDestFoldOther.enabled = false;

            //Disabled "destination folder..." button
            UI.btnChooseFilesDestFold.enabled = false;
            UI.btnChooseFilesDestFoldTitle.enabled = false;

            //Button accept disabled if you do not any values to Height and Width dialog
            checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);

            //Disabled Add canvas panel
            UI.pnlAddCanvas.enabled = false;

            //Uptade info UI with files from source folder
            infoUItoDisplay(undefined, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

            UI.btnAccept.enabled = false;
        
        } else if (UI.btnChooseFilesSourceFoldTitle.text !== "Source folder..."){
            //Anabled "Destination folder"" panel title
            UI.pnlDestFoldTitle.enabled = true;

            //Anabled radButton destination folder
            UI.btnRadDestFoldSame.enabled = true;
            UI.btnRadDestFoldOther.enabled = true;
            
            if (UI.btnRadDestFoldOther.value === true) {

                UI.btnRadDestFoldOther.notify();

            }

            checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);

            //Uptade info UI with files from source folder
            infoUItoDisplay(self.sourceFiles, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);
        }
    }
}

EventHandlerBuilder.prototype.startSettingsUINoActiveDocs = function() {
    var UI = this.UI;

    //Start setting. If there is no active docs, set to choose folder
    if (app.documents.length === 0) {

        UI.btnRadChooseFilesSourceFold.notify();

        UI.btnRadChooseFilesActiveDocs.enabled = false;

        UI.btnRadDestFoldSame.value = true;
        UI.btnAccept.enabled = false;

    } else if (app.documents.length > 0) {

        UI.btnRadChooseFilesActiveDocs.notify();
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
        if (self.sourceFolder === null && UI.btnChooseFilesSourceFoldTitle.text === "Source folder...") {
            alert("You have not selected source folder");
        //else if (self.sourceFolder === null && UI.btnChooseFilesSourceFoldTitle.text !== "Source folder..."). Leave selected source folder -> leave status quo

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
                
                createPathString(UI.btnChooseFilesSourceFoldTitle, "Source folder...");
                UI.btnRadDestFoldSame.enabled = false;
                UI.btnRadDestFoldOther.enabled = false;
                
                UI.btnChooseFilesDestFold.enabled = false;
                UI.btnChooseFilesDestFoldTitle.enabled = false;
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

                createPathString(UI.btnChooseFilesSourceFoldTitle, self.sourceFolder);
                
                //Uptade info UI with files from source folder
                infoUItoDisplay(self.sourceFiles, UI.numbOfDisplayedFiles, UI.pnlDocInfo, UI.plnDocInfoLines);

                //Enabling buttons
                UI.pnlDestFoldTitle.enabled = true;
                UI.btnRadDestFoldSame.enabled = true;
                UI.btnRadDestFoldOther.enabled = true;

                if (typeof self.detinationFolder === "undefined") {

                    UI.btnRadDestFoldSame.notify();

                } else if ((typeof self.detinationFolder !== "undefined") && (self.detinationFolder !== null) ) { //(self.detinationFolder !== null) to avoid bug

                    if (self.detinationFolder.toString() !== self.sourceFolder.toString() ) {

                        UI.btnRadDestFoldOther.notify();

                    } else if (self.detinationFolder.toString() === self.sourceFolder.toString() ) {

                        createPathString(UI.btnChooseFilesDestFoldTitle, "Destination folder...");
                        
                        self.detinationFolder = null;
                        UI.btnRadDestFoldSame.notify();
    
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

    UI.btnRadDestFoldSame.onClick = function() {

        UI.btnChooseFilesDestFold.enabled = false;
        UI.btnChooseFilesDestFoldTitle.enabled = false;

        checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);

        UI.pnlAddCanvas.enabled = true;
    }
}

EventHandlerBuilder.prototype.onBtnRadDestFoldOther = function() {
    var UI = this.UI;

    //Copy and Add canvas in other folder
    UI.btnRadDestFoldOther.onClick = function() {

        UI.btnChooseFilesDestFold.enabled = true;
        UI.btnChooseFilesDestFoldTitle.enabled = true;

        checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);

        if (UI.btnChooseFilesDestFoldTitle.text === "Destination folder...") {
            UI.btnAccept.enabled = false;
            UI.pnlAddCanvas.enabled = false;
        } else if (UI.btnChooseFilesDestFoldTitle.text !== "Destination folder...") {
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

            if (UI.btnChooseFilesDestFoldTitle.text === "Destination folder...") {
                alert("You have not selected target folder");
                self.detinationFolder = null; //to avoid bug
            } //else {if you have already have had selected folder destination, then it remains status quo}

        } else if (detinationFolderSelection.toString() !== self.sourceFolder.toString()) {

            createPathString(UI.btnChooseFilesDestFoldTitle, detinationFolderSelection);
            checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);
            UI.pnlAddCanvas.enabled = true;

            self.detinationFolder = detinationFolderSelection;
        } else if (detinationFolderSelection.toString() === self.sourceFolder.toString()) {

            UI.btnRadDestFoldSame.notify();
            createPathString(UI.btnChooseFilesDestFoldTitle, "Destination folder...");
            alert("Source folder and target folder are the same.\nNext time choose more wisely");
            
            self.detinationFolder = null; //to avoid bug
        }

    }
}

EventHandlerBuilder.prototype.startSettingsWidthAndHeight = function() {
    var UI = this.UI;

    checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);
}

EventHandlerBuilder.prototype.onGrpWidthNumb = function() {
    var UI = this.UI;

    UI.grpWidthNumb.onChanging = function() {

        if (UI.constrainsProportionsCheckbox.value === true) {
            UI.grpHeightNumb.text = UI.grpWidthNumb.text;
        }                        

        checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onGrpWidthUnitsDropDown  = function() {
    var UI = this.UI;

    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
    UI.grpWidthUnitsDropDown.onChange = function() {

        sameDropDown(UI.grpWidthUnitsDropDown, UI.grpHeightUnitDropDown);
    }

}

EventHandlerBuilder.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value"
    UI.toolTipWidthImage.helpTip = tooltipValue;
    UI.toolTipHeightImage.helpTip = tooltipValue;
}

EventHandlerBuilder.prototype.onGrpHeightNumb = function() {
    var UI = this.UI;

    //Group Height
    UI.grpHeightNumb.onChanging = function() {

        if (UI.constrainsProportionsCheckbox.value === true) {
            UI.grpWidthNumb.text = UI.grpHeightNumb.text;
        }

        checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(UI.grpWidthNumb, UI.grpHeightNumb, UI.btnAccept);
    }
}

EventHandlerBuilder.prototype.onGrpHeightUnitDropDown = function() {
    var UI = this.UI;

    UI.grpHeightUnitDropDown.onChange = function() {
        sameDropDown(UI.grpHeightUnitDropDown, UI.grpWidthUnitsDropDown);
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
            if((parseInt(UI.grpWidthNumb.text, 10) <= 0) && (parseInt(UI.grpHeightNumb.text, 10) <= 0)) {
                if (parseInt(UI.grpWidthNumb.text, 10) < parseInt(UI.grpHeightNumb.text, 10)) {
                    UI.grpWidthNumb.onChanging();
                }
                //If some value is postive, set in both most positive number
                else {
                    UI.grpHeightNumb.onChanging();
                }
            } else if ((parseInt(UI.grpWidthNumb.text, 10) > 0) || (parseInt(UI.grpHeightNumb.text, 10) > 0)) {
                if (parseInt(UI.grpWidthNumb.text, 10) > parseInt(UI.grpHeightNumb.text, 10)) {
                    UI.grpWidthNumb.onChanging();
                } else {
                    UI.grpHeightNumb.onChanging();
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

    UI.canvExtendColorDropDwn.onChange = function() {
        var canvExtendColorDropDwn = UI.canvExtendColorDropDwn.selection.toString();//Full list to select canvExtendColorValues

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
            UI.grpWidthNumb.text, UI.grpHeightNumb.text, UI.grpWidthUnitsDropDown, self.anchorPosOutcome, 
            UI.btnRadChooseFilesActiveDocs, UI.btnRadChooseFilesSourceFold, 
            UI.btnRadDestFoldSame, UI.btnRadDestFoldOther,
            self.fgColor, self.bgColor);
        
        if (UI.btnRadChooseFilesActiveDocs.value === true) {

            if (UI.numbOfActiveDocuments > 1) {
                alert("You added canvas to " + UI.numbOfActiveDocuments + " files");
            }
            else if (UI.numbOfActiveDocuments === 1) {
                alert("You added canvas to only 1 file");
            }

        } else if (UI.btnRadChooseFilesSourceFold.value === true) {

            var folderName = "";
            if (UI.btnRadDestFoldSame.value === true) {
                folderName = self.sourceFolderNameRecent.replace(/%20/g, ' ');
            } else if (UI.btnRadDestFoldOther.value === true) {
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

function checkingIfWidthAndHeightIsNot0UnlockingAcceptBtn(Numb001, Numb002, btnEnabled) {

    if ((Numb001.text.match(/[^-\+0-9]+/) !== null) || (Numb002.text.match(/[^-\+,0-9]+/) !== null) || 
        (Numb001.text.match(/[0-9]+/) === null) || (Numb002.text.match(/[0-9]+/) === null) ||
        ((parseInt(Numb001.text, 10) === 0) && (parseInt(Numb002.text, 10) === 0)) ) {

        btnEnabled.enabled = false;

    } else {
        
        btnEnabled.enabled = true;
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
