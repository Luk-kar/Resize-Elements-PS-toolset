function GuiBuilderControlPanel() {

    this.buildControlPanel();
}

GuiBuilderControlPanel.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Modify Elements");

    this.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.btnSetCanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Set canvas")

    this.btnAddCanvasByBiggestEdges = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Set canvas by biggest edges")

    this.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.btnTrimCanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Trim canvas");

    this.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Add resize image");

    this.btnSetImageSize = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Set image size");

    this.btnSettings = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Settings");

    this.btnAbout = this.controlPanelWindow.add("button", [205, 80, 395, 101], "About");

    this.btnClose = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

GuiBuilderControlPanel.prototype.showControlPanel = function () {
    this.controlPanelWindow.show();
}