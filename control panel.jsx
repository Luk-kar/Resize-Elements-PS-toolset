#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

#include "./scripts/common functions.jsx";

#include "./scripts/control panel/control panel - GuiBuilderControlPanel.jsx";

#include "./scripts/control panel/control panel - EventHandlerBuilderControlPanel.jsx";

function main() {

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

main();
