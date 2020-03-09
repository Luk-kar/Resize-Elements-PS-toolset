/**
 * Photoshop script written by Karol Łukaszczyk, 01.2020
 * Permits you to use, modify, and distribute this file
 */

#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

#include "./scripts/settings/settings - functions.jsx"; // Some functions are used both in main and in settings

#include "./scripts/control panel/control panel - GuiBuilderControlPanel.jsx"; // For all UIctrlPanel objects

#include "./scripts/control panel/control panel - EventHandlerBuilderControlPanel.jsx"; // For all eventHandler objects

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
