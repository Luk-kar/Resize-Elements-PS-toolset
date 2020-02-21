    this.maxResValue = 8192;
    
    ///2^n canvas
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;

    //Group dialog units value

    this.groupBiggerThan = createGroupUI(this.panelChangeFile, undefined, "left", "left");

    this.groupBiggerThan.title001 = this.groupBiggerThan.add("statictext", undefined, "For images bigger than:");
    this.groupBiggerThan.title001.characters = 18;

    this.groupBiggerThan.valueLowest = this.groupBiggerThan.add("edittext", undefined, "1");
    this.groupBiggerThan.valueLowest.characters = 4;

    this.groupBiggerThan.title002 = this.groupBiggerThan.add("statictext", undefined, "px");

    this.groupBiggerThan.imageTooltip = this.groupBiggerThan.add("image", undefined, this.imageInfHov);

//------------------------------------------------------------------------------

    this.groupLowerThan = createGroupUI(this.panelChangeFile, undefined, "left", "left");

    this.groupLowerThan.title001 = this.groupLowerThan.add("statictext", undefined, "and also smaller than:");
    this.groupLowerThan.title001.characters = 18;

    this.groupLowerThan.valueHighest = this.groupLowerThan.add("edittext", undefined, this.maxResValue);
    this.groupLowerThan.valueHighest.characters = 4;

    this.groupLowerThan.title002 = this.groupLowerThan.add("statictext", undefined, "px");

    this.groupLowerThan.imageTooltip = this.groupLowerThan.add("image", undefined, this.imageInfHov);

    //Canvas color extension

    this.canvExtendColor = this.panelChangeFile.add("group");

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

    this.marginesSpaceBottom = this.panelChangeFile.add("statictext");
    this.marginesSpaceBottom.characters = this.panelWidth + 13;

