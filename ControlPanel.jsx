function GuiBuilderControlPln() {

    this.buildControlPanel();
}

GuiBuilderControlPln.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Control panel");

    this.controlPanelWindow.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.controlPanelWindow.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Resize image");

    this.controlPanelWindow.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.controlPanelWindow.btnCancel = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

//================================================================================================================================

function EventHandlerBuilderControlPln(UIpln) {
    this.UIpln = UIpln;
}

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnAddCanvas = function () {
    var UIpln = this.UIpln;
    UIpln.controlPanelWindow.btnAddCanvas.onClick = function () {
        UIpln.controlPanelWindow.close();
        var executeScript = "add canvas";

        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts - execute/Add canvas/functions.jsx";
        #include "./scripts - execute/Add canvas/EventHandlerBuilderMain.jsx";
        #include "main.jsx"

    };
};

GuiBuilderControlPln.prototype.showControlPanel = function () {
    this.controlPanelWindow.show();
};

function controlPanel() {

    var UIpln =  new GuiBuilderControlPln();

    UIpln.buildControlPanel();

//================================================================================================================================

    var eventHandler = new EventHandlerBuilderControlPln( UIpln );

    eventHandler.onControlPanelWindowBtnAddCanvas();

    UIpln.showControlPanel();

}

controlPanel();
