/*
using from "../../control panel/control panel - EventHandlerBuilderControlPanel.jsx":
- executeScript
using from "../../main/main - functions.jsx":
- createPanelUI()
- createGroupUI()
*/

    //Code below is injected in PanelChangeFile
    this.maxResValue = 300000; //PS Max resolution

    ///Add canvas UI
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;

    //Group dialog selecting by size

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

    this.groupLowerThan.marginesSpaceBottom = this.panelChangeFile.add("statictext", undefined, "");

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
