
    ///2^n canvas
    this.pnlChangeFile = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlChangeFile.title = this.pnlChangeFile.add("statictext", undefined, executeScript + ":");
    this.pnlChangeFile.title.graphics.font = this.pnlTitleFont;
    this.pnlChangeFile.add("statictext");

    this.pnlExplain = createPanelUI(this.pnlChangeFile, undefined, "center");
    this.pnlExplain.title = this.pnlExplain.add("statictext", undefined, "Now, here will be excuted scriptListener for choosed all files");
    this.pnlExplain.title.characters = this.panelWidth + 8;

    this.pnlChangeFile.add("statictext");
