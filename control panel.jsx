#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

#include "./scripts/common functions.jsx"

function GuiBuilderControlPln() {

    this.buildControlPanel();
}

GuiBuilderControlPln.prototype.buildControlPanel = function () {

    this.controlPanelWindow = new Window("dialog", "Control panel");

    this.controlPanelWindow.btnAddCanvas = this.controlPanelWindow.add("button", [0, 80, 190, 101], "Add canvas");

    this.controlPanelWindow.btnResizeImage = this.controlPanelWindow.add("button", [0, 40, 190, 61], "Resize image");

    this.controlPanelWindow.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

    this.controlPanelWindow.btnSettings = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Settings");

    // this.controlPanelWindow.btnScriptListener = this.controlPanelWindow.add("button", [205, 80, 395, 101], "ScriptListener"); //Search by phrase ScriptListener to unblock

    this.controlPanelWindow.btnClose = this.controlPanelWindow.add("button", [205, 120, 395, 141], "Close");
};

//================================================================================================================================

function EventHandlerBuilderControlPln(UIctrlPln) {
    this.UIctrlPln = UIctrlPln;
}

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnAddCanvas = function () {
    var UIctrlPln = this.UIctrlPln;
    UIctrlPln.controlPanelWindow.btnAddCanvas.onClick = function () {
        UIctrlPln.controlPanelWindow.close();
        
        var executeScript = "Add canvas";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/Add canvas/Add canvas - functions.jsx";
        #include "./scripts/Add canvas/Add canvas - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnResizeImage = function () {
    var UIctrlPln = this.UIctrlPln;
    UIctrlPln.controlPanelWindow.btnResizeImage.onClick = function () {
        UIctrlPln.controlPanelWindow.close();
        
        var executeScript = "Resize image";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/Resize image/Resize image - functions.jsx";
        #include "./scripts/Resize image/Resize image - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPln.prototype.onControlPanelWindowbtn2toNcanvas = function () {
    var UIctrlPln = this.UIctrlPln;
    UIctrlPln.controlPanelWindow.btn2toNcanvas.onClick = function () {
        UIctrlPln.controlPanelWindow.close();
        
        var executeScript = "2^n canvas";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/2^n canvas/2^n canvas - functions.jsx";
        #include "./scripts/2^n canvas/2^n canvas - EventHandlerBuilderMain.jsx";
        #include "./scripts/main.jsx"

    }
}

EventHandlerBuilderControlPln.prototype.onPanelSettings = function () {
    var UIctrlPln = this.UIctrlPln;

    UIctrlPln.controlPanelWindow.btnSettings.onClick = function () {

        UIctrlPln.controlPanelWindow.close();

        #include "./scripts/settings.jsx"
    }
}
/*
EventHandlerBuilderControlPln.prototype.onPanelScriptListener = function () {
    var UIctrlPln = this.UIctrlPln;

    UIctrlPln.controlPanelWindow.btnScriptListener.onClick = function () {
        UIctrlPln.controlPanelWindow.close();

        var executeScript = "Execute scriptListener";
        if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
            throw new Error("Wrongly formated name. It should consist of a verb and a noun");
        }

        #include "./scripts/Execute scriptListener/Execute scriptListener - functions.jsx"
        #include "./scripts/Execute scriptListener/Execute scriptListener - EventHandlerBuilderMain.jsx"
        #include "./scripts/main.jsx"
    }
}
*/
EventHandlerBuilderControlPln.prototype.onControlPanelWindowBtnClose = function () {
    var UIctrlPln = this.UIctrlPln;

    UIctrlPln.controlPanelWindow.btnClose.onClick = function () {
        UIctrlPln.controlPanelWindow.close();
    }
}

GuiBuilderControlPln.prototype.showControlPanel = function () {
    this.controlPanelWindow.show();
}

function controlPanel() {

    var UIctrlPln =  new GuiBuilderControlPln();

    UIctrlPln.buildControlPanel();

//================================================================================================================================

    var eventHandler = new EventHandlerBuilderControlPln( UIctrlPln );

    eventHandler.onControlPanelWindowBtnAddCanvas();

    eventHandler.onControlPanelWindowBtnResizeImage();

    eventHandler.onControlPanelWindowbtn2toNcanvas();

    //eventHandler.onPanelScriptListener()

    eventHandler.onPanelSettings();

    eventHandler.onControlPanelWindowBtnClose();

    UIctrlPln.showControlPanel();

}

controlPanel();
