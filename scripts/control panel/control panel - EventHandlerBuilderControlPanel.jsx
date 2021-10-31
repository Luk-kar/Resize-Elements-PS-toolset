function EventHandlerBuilderControlPanel(UIctrlPanel) {
    this.UIctrlPanel = UIctrlPanel;
}

EventHandlerBuilderControlPanel.prototype.onBtnAddCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnAddCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Add canvas";

        #include "../executeScript/Add canvas/Add canvas - functions.jsx";
        #include "../executeScript/Add canvas/Add canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnResizeImage = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnResizeImage.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Add resize image";

        #include "../executeScript/Add resize image/Add resize image - functions.jsx";
        #include "../executeScript/Add resize image/Add resize image - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtn2toNcanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btn2toNcanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "2^n canvas";

        #include "../executeScript/2^n canvas/2^n canvas - functions.jsx";
        #include "../executeScript/2^n canvas/2^n canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onbtnAddCanvasByBiggestEdges = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnAddCanvasByBiggestEdges.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Set canvas by biggest edges";

        #include "../executeScript/Set canvas by biggest edges/Set canvas by biggest edges - functions.jsx";
        #include "../executeScript/Set canvas by biggest edges/Set canvas by biggest edges - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx";

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnSetCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;
    UIctrlPanel.btnSetCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();
        
        var executeScript = "Set canvas";

        #include "../executeScript/Set canvas/Set canvas - functions.jsx";
        #include "../executeScript/Set canvas/Set canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx";

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnTrimCanvas = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnTrimCanvas.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();

        var executeScript = "Trim canvas";

        #include "../executeScript/Trim canvas/Trim canvas - functions.jsx";
        #include "../executeScript/Trim canvas/Trim canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx";
    }
}

EventHandlerBuilderControlPanel.prototype.onSetImageSize = function () {
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnSetImageSize.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();

        var executeScript = "Set image size";

        #include "../executeScript/Set image size/Set image size - functions.jsx";
        #include "../executeScript/Set image size/Set image size - EventHandlerBuilderMain.jsx";
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