    this.maxResValue = 8192;
    
    ///2^n canvas
    this.pnlChangeFile = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlChangeFile.title = this.pnlChangeFile.add("statictext", undefined, executeScript + ":");
    this.pnlChangeFile.title.graphics.font = this.pnlTitleFont;

    //Group dialog units value

    this.grpBiggerThan = createGroupUI(this.pnlChangeFile, undefined, "left", "left");

    this.grpBiggerThan.title001 = this.grpBiggerThan.add("statictext", undefined, "For images bigger than:");
    this.grpBiggerThan.title001.characters = 18;

    this.grpBiggerThan.valueLowest = this.grpBiggerThan.add("edittext", undefined, "1");
    this.grpBiggerThan.valueLowest.characters = 4;

    this.grpBiggerThan.title002 = this.grpBiggerThan.add("statictext", undefined, "px");

    this.grpBiggerThan.imageTooltip = this.grpBiggerThan.add("image", undefined, this.imageInfHov);

//------------------------------------------------------------------------------

    this.grpLowerThan = createGroupUI(this.pnlChangeFile, undefined, "left", "left");

    this.grpLowerThan.title001 = this.grpLowerThan.add("statictext", undefined, "and also smaller than:");
    this.grpLowerThan.title001.characters = 18;

    this.grpLowerThan.valueHighest = this.grpLowerThan.add("edittext", undefined, this.maxResValue);
    this.grpLowerThan.valueHighest.characters = 4;

    this.grpLowerThan.title002 = this.grpLowerThan.add("statictext", undefined, "px");

    this.grpLowerThan.imageTooltip = this.grpLowerThan.add("image", undefined, this.imageInfHov);

    //Canvas color extension

    this.canvExtendColor = this.pnlChangeFile.add("group");

        this.canvExtendColor.title = this.canvExtendColor.add("statictext", undefined, "Canvas extension color:");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Select color",
                                    "Left upper corner color"
                                    ]; // conditions in onCanvExtendColorDropDwn(); Can't be part of UI object, becouse of bug in the next line

        this.canvExtendColor.dropDwn = this.canvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColor.dropDwn.selection = 1;

        this.canvExtendColor.imageTooltip = this.canvExtendColor.add("image", undefined, this.imageInfHov);

    this.marginesSpaceBottom = this.pnlChangeFile.add("statictext");


    //Images display number with fulfilling resolution conditions
    this.pnlImagesFulfillingResConditions = createPanelUI(this.pnlChangeFile, undefined, "left");

        this.pnlImagesFulfillingResConditions.title = this.pnlImagesFulfillingResConditions.add("statictext", undefined, "Max image resolution input is " + this.maxResValue.toString() + " px in both sides"); // To make visually diffrence than other modules
        this.pnlImagesFulfillingResConditions.title.characters = this.panelWidth + 8;
