/*
using from "../../control panel/control panel - EventHandlerBuilderControlPanel.jsx":
- executeScript
using from "../../main/main - functions.jsx":
- createPanelUI()
- createGroupUI()
*/

    //Code below is injected in PanelChangeFile
    ///Add canvas UI
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;

    //Group units value
    this.groupUnitVal = this.panelChangeFile.add("group");

        //Group dialog units value
        this.groupUnitValDlg = createGroupUI(this.groupUnitVal, "column", "left");

            //Group width
            this.groupWidth = this.groupUnitValDlg.add("group");

                //Edittext: Width
                this.groupWidth.title = this.groupWidth.add("statictext", undefined, "Width:  ");
                this.groupWidth.numb =  this.groupWidth.add("edittext", undefined, 0);
                this.groupWidth.numb.characters = 9;

                //Update also unitsTypes
                this.groupWidth.units = this.groupWidth.add("statictext", undefined, "PX");

                //Crating tooltip
                this.groupWidth.imageTooltip = this.groupWidth.add("image", undefined, this.imageInfHov);

            //Group height
            this.groupHeight = this.groupUnitValDlg.add("group");

                //Edittext: Height
                this.groupHeight.title = this.groupHeight.add("statictext", undefined, "Height: ");
                this.groupHeight.numb =  this.groupHeight.add("edittext", undefined, 0);
                this.groupHeight.numb.characters = 9;

                //Dropdownlist: Add PX, add %
                this.groupHeight.units = this.groupHeight.add("statictext", undefined, "PX");

                //Image: InfoHover.png
                this.groupHeight.imageTooltip = this.groupHeight.add("image", undefined, this.imageInfHov);

        //Graphic element proportions constrains (true, false)

            //Add constrain image next to dialog
            this.groupDlgUnitValImage = this.groupUnitVal.add("image", undefined, this.imageCnstrnsProportionFalse);
            this.groupDlgUnitValImage.alignment = "right";

    //Constrains proportions
    this.constrainsProportionsCheckbox = this.panelChangeFile.add("checkbox", undefined, "Same Height and Width");

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
