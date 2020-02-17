#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

#include "./scripts/common functions.jsx"

function GuiBuilderControlPanel() {

    this.buildControlPanel();
}

GuiBuilderControlPanel.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Control panel");

    this.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Resize image");

    this.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.btnSettings = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Settings");

    this.btnClose = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

//================================================================================================================================

function EventHandlerBuilderControlPanel(UIctrlPanel) {
    this.UIctrlPanel = UIctrlPanel;
}

EventHandlerBuilderControlPanel.prototype.onBtnAddCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnAddCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Add canvas";
        checkIfScriptNameIsRight(executeScript);

        #include "./scripts/Add canvas/Add canvas - functions.jsx";
        #include "./scripts/Add canvas/Add canvas - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnResizeImage = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnResizeImage.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Resize image";
        checkIfScriptNameIsRight(executeScript);

        #include "./scripts/Resize image/Resize image - functions.jsx";
        #include "./scripts/Resize image/Resize image - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtn2toNcanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btn2toNcanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "2^n canvas";
        checkIfScriptNameIsRight(executeScript);

        #include "./scripts/2^n canvas/2^n canvas - functions.jsx";
        #include "./scripts/2^n canvas/2^n canvas - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnPanelSettings = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnSettings.onClick = function () {

        UIctrlPanel.controlPanelWindow.close();

        #include "./scripts/settings.jsx"
    }
}

EventHandlerBuilderControlPanel.prototype.onBtnClose = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnClose.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
    }
}

GuiBuilderControlPanel.prototype.showControlPanel = function () {
    this.controlPanelWindow.show();
}

function checkIfScriptNameIsRight(executeScript) {
    if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
        throw new Error("Wrongly formated name. It should consist of a verb and a noun");
    }
}

function controlPanel() {

    var UIctrlPanel =  new GuiBuilderControlPanel();

    UIctrlPanel.buildControlPanel();

//================================================================================================================================

    var eventHandler = new EventHandlerBuilderControlPanel( UIctrlPanel );

    eventHandler.onBtnAddCanvas();

    eventHandler.onBtnResizeImage();

    eventHandler.onBtn2toNcanvas();

    eventHandler.onBtnPanelSettings();

    eventHandler.onBtnClose();

    UIctrlPanel.showControlPanel();

}

controlPanel();
