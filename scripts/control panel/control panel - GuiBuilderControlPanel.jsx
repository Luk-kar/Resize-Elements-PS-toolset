function GuiBuilderControlPanel() {

    this.buildControlPanel();
}

GuiBuilderControlPanel.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Resize Elements");

    this.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.btnNameOfModule = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Add to canvas by biggest edges")

    this.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Resize image");

    this.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.btnSettings = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Settings");

    this.btnClose = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

GuiBuilderControlPanel.prototype.showControlPanel = function () {
    this.controlPanelWindow.show();
}