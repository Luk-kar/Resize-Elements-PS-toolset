function EventHandlerBuilderControlPanel(UIctrlPanel) {
    this.UIctrlPanel = UIctrlPanel;
}

EventHandlerBuilderControlPanel.prototype.onBtnAddCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnAddCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Add canvas";
        checkIfScriptNameIsRight(executeScript);

        #include "../executeScript/Add canvas/Add canvas - functions.jsx";
        #include "../executeScript/Add canvas/Add canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnResizeImage = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnResizeImage.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Resize image";
        checkIfScriptNameIsRight(executeScript);

        #include "../executeScript/Resize image/Resize image - functions.jsx";
        #include "../executeScript/Resize image/Resize image - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtn2toNcanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btn2toNcanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "2^n canvas";
        checkIfScriptNameIsRight(executeScript);

        #include "../executeScript/2^n canvas/2^n canvas - functions.jsx";
        #include "../executeScript/2^n canvas/2^n canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onbtnAddCanvasByBiggestEdges = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnAddCanvasByBiggestEdges.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Add to canvas by biggest edges";

        #include "../executeScript/Add to canvas by biggest edges/Add to canvas by biggest edges - functions.jsx";
        #include "../executeScript/Add to canvas by biggest edges/Add to canvas by biggest edges - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx";

    }
}

EventHandlerBuilderControlPanel.prototype.onbtnSetCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnSetCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Set canvas";

        #include "../executeScript/Set canvas/Set canvas - functions.jsx";
        #include "../executeScript/Set canvas/Set canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx";

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnPanelSettings = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnSettings.onClick = function () {

        UIctrlPanel.controlPanelWindow.close();

        #include "../settings/settings.jsx"
    }
}

EventHandlerBuilderControlPanel.prototype.onBtnClose = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnClose.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
    }
}

function checkIfScriptNameIsRight(executeScript) {
    if (executeScript.split(" ").length !== 2 || !executeScript.match(/[a-z]/i)) {
        throw new Error("Wrongly formated name. It should consist of a verb and a noun");
    }
}