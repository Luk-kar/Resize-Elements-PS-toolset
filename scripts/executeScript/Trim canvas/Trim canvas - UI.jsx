// Here you create UI for your module
// Look at "Add canvas - UI.jsx" as example

    //Code below is injected in PanelChangeFile
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;
    this.panelChangeFile.add("statictext");

    //Group dialog selecting by size

    this.groupBiggerThan = createGroupUI(this.panelChangeFile, undefined, "left", "left");

    this.groupBiggerThan.title001 = this.groupBiggerThan.add("statictext", undefined, "For images bigger than:");
    this.groupBiggerThan.title001.characters = 18;

    this.groupBiggerThan.valueLowest = this.groupBiggerThan.add("edittext", undefined, "0");
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

    this.groupLowerThan.marginesSpaceBottom = this.panelChangeFile.add("statictext", undefined, "");