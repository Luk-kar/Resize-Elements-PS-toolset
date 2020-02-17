
    ///2^n canvas
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;
    this.panelChangeFile.add("statictext");

    this.panelExplain = createPanelUI(this.panelChangeFile, undefined, "center");
    this.panelExplain.title = this.panelExplain.add("statictext", undefined, "Now, here will be excuted scriptListener for choosed all files");
    this.panelExplain.title.characters = this.panelWidth + 8;

    this.panelChangeFile.add("statictext");
