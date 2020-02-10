#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

function GuiBuilderControlPln() {

    this.buildControlPanel();
}

GuiBuilderControlPln.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Control panel");

    this.controlPanelWindow.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.controlPanelWindow.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Resize image");

    this.controlPanelWindow.btnNto2canvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.controlPanelWindow.btnClose = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

//================================================================================================================================

function EventHandlerBuilderControlPln(UIpln) {
    this.UIpln = UIpln;
}

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnAddCanvas = function () {
    var UIpln = this.UIpln;
    UIpln.controlPanelWindow.btnAddCanvas.onClick = function () {
        UIpln.controlPanelWindow.close();
        
        var executeScript = "Add canvas";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/Add canvas/functions.jsx";
        #include "./scripts/Add canvas/EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    };
};

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnResizeImage = function () {
    var UIpln = this.UIpln;
    UIpln.controlPanelWindow.btnResizeImage.onClick = function () {
        UIpln.controlPanelWindow.close();
        
        var executeScript = "Resize image";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/Resize image/functions.jsx";
        #include "./scripts/Resize image/EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    };
};

EventHandlerBuilderControlPln.prototype.onControlPanelWindowbtnNto2canvas = function () {
    var UIpln = this.UIpln;
    UIpln.controlPanelWindow.btnNto2canvas.onClick = function () {
        UIpln.controlPanelWindow.close();
        
        var executeScript = "n^2 canvas";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/n^2 canvas/functions.jsx";
        #include "./scripts/n^2 canvas/EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    };
};

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnClose = function () {
    var UIpln = this.UIpln;

    UIpln.controlPanelWindow.btnClose.onClick = function () {
        UIpln.controlPanelWindow.close();
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

    eventHandler.onControlPanelWindowBtnResizeImage();

    eventHandler.onControlPanelWindowbtnNto2canvas();

    eventHandler.onControlPanelWindowBtnClose();

    UIpln.showControlPanel();

}

controlPanel();
