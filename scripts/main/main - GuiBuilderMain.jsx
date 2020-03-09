/*
using from "../settings/settings - functions.jsx":
- readValueOfSeetingsFromPrefFile()

using from "./main - functions.jsx":
- userDataFolder
- createGroupUI()
- getGrandParentfolder()
- createPanelUI()
*/

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

    var scriptParentFolder = getGrandParentfolder(); // slice negative numb is length of file folder

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

GuiBuilderMain.prototype.buildPanelSourceFilesFilter = function(prefFileKeys_filterByPNG, appData_preferencesFile) {

    //Create panel
    this.panelFilterFiles = createPanelUI(this.groupInfo, undefined, "left");

    this.filterSourceFilesCheckbox = createGroupUI(this.panelFilterFiles, "column", "left", "left");
    //Create checkbox
    this.filterSourceFilesCheckbox.PNG = this.filterSourceFilesCheckbox.add("checkbox", undefined, "Process only PNG");

    var PNGbyDefault_ON_OFF = readValueOfSeetingsFromPrefFile(prefFileKeys_filterByPNG, appData_preferencesFile, userDataFolder);
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

GuiBuilderMain.prototype.buildPanelDestinationFolder = function(executeScript) {

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
        #include "../executeScript/Add canvas/Add canvas - UI.jsx";
    }

    if (executeScript === "Resize image"){
        #include "../executeScript/Resize image/Resize image - UI.jsx"; 
    }

    if (executeScript === "2^n canvas"){
        #include "../executeScript/2^n canvas/2^n canvas - UI.jsx"; 
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

GuiBuilderMain.prototype.showMainWindow = function () {
    this.mainWindow.show();
};