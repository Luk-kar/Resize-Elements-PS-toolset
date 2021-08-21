/*
using from "../../control panel/control panel - EventHandlerBuilderControlPanel.jsx":
- executeScript
using from "../../main/main - functions.jsx":
- createPanelUI()
- createGroupUI()
*/

// Here you create UI for your module
// Look at "Add canvas - UI.jsx" as example

    this.maxResValue = 300000;

    //Code below is injected in PanelChangeFile
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;

    //Group dialog units value

    this.groupBiggerThan = createGroupUI(this.panelChangeFile, undefined, "left", "left");

    this.groupBiggerThan.title001 = this.groupBiggerThan.add("statictext", undefined, "For images bigger than:");
    this.groupBiggerThan.title001.characters = 18;

    this.groupBiggerThan.valueLowest = this.groupBiggerThan.add("edittext", undefined, "0");
    this.groupBiggerThan.valueLowest.characters = 6;

    this.groupBiggerThan.title002 = this.groupBiggerThan.add("statictext", undefined, "px");

    this.groupBiggerThan.imageTooltip = this.groupBiggerThan.add("image", undefined, this.imageInfHov);

//------------------------------------------------------------------------------

    this.groupLowerThan = createGroupUI(this.panelChangeFile, undefined, "left", "left");

    this.groupLowerThan.title001 = this.groupLowerThan.add("statictext", undefined, "and also smaller than:");
    this.groupLowerThan.title001.characters = 18;

    this.groupLowerThan.valueHighest = this.groupLowerThan.add("edittext", undefined, this.maxResValue);
    this.groupLowerThan.valueHighest.characters = 6;

    this.groupLowerThan.title002 = this.groupLowerThan.add("statictext", undefined, "px");

    this.groupLowerThan.imageTooltip = this.groupLowerThan.add("image", undefined, this.imageInfHov);

    //Anchor display
    this.groupAnchorMarginesSpaceTop =  [this.panelChangeFile.add("group", undefined, ""),
                                       this.panelChangeFile.add("group", undefined, "")];

    this.groupAnchor = this.panelChangeFile.add("group");
    this.groupAnchor.title = this.groupAnchor.add("statictext", undefined, "Anchor: ");
    this.groupAnchor.title.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

        //Creating anchor group box
        this.groupAnchor.boxBtns = createGroupUI(this.groupAnchor, "column");

        //Creating anchor gorup lines inside box
        this.groupAnchor.boxBtns.line001 = this.groupAnchor.boxBtns.add("group");
        this.groupAnchor.boxBtns.line002 = this.groupAnchor.boxBtns.add("group");
        this.groupAnchor.boxBtns.line003 = this.groupAnchor.boxBtns.add("group");

            //Adding 001 line of buttons
            this.anchorPositionTOPLEFT = this.groupAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPCENTER = this.groupAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPRIGHT = this.groupAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 002 line of buttons
            this.anchorPositionMIDDLELEFT = this.groupAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionMIDDLECENTER = this.groupAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorTrue);
            this.anchorPositionMIDDLERIGHT = this.groupAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 003 line of buttons
            this.anchorPositionBOTTOMLEFT = this.groupAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMCENTER = this.groupAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMRIGHT = this.groupAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);

    this.groupAnchorMarginesSpaceBottom = this.panelChangeFile.add("statictext", undefined, "");
    this.groupAnchorMarginesSpaceBottom.characters = this.panelWidth + 13;//Giving the same width as: this.panelSourceFiles, this.panelFilterFiles, this.panelDestFold

    //Canvas color extension
    this.canvExtendColor = this.panelChangeFile.add("group");

        this.canvExtendColor.title = this.canvExtendColor.add("statictext", undefined, "Canvas extension color: ");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Select color",
                                    "Left upper corner color"
                                    ];// conditions in onCanvExtendColorDropDwn(); Can't be part of UI object, becouse of bug in the next line

        this.canvExtendColor.dropDwn = this.canvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColor.dropDwn.selection = 1;

        this.canvExtendColor.imageTooltip = this.canvExtendColor.add("image", undefined, this.imageInfHov);