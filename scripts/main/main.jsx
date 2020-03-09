/*
Photoshop script written by Karol Łukaszczyk, 01.2020
Permits you to use, modify, and distribute this file according to licence
*/

/*
using from "../settings/settings - functions.jsx":
- appData
- prefFileKeys
- userDataFolder
*/

#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

//================================================================================================================================

#include "./main - functions.jsx"; // For to use for main module and it's children

#include "./main - GuiBuilderMain.jsx"; // For all UI objects

#include "./main - EventHandlerBuilderMain.jsx"; // For all EventHandler objects

main(executeScript, appData, prefFileKeys, userDataFolder);

function main(executeScript, appData, prefFileKeys, userDataFolder) {

    appDataBuilder(appData, prefFileKeys, userDataFolder);
    
    var UI = new GuiBuilderMain();

    UI.buildPanelSourceFiles();

    UI.buildPanelSourceFilesFilter(prefFileKeys.filterByPNG, appData.preferencesFile);

    UI.buildPanelDestinationFolder(executeScript);

    UI.buildPanelChangeFile(executeScript);

    UI.buildPanelInfoUI();

    UI.buildAcceptCancelReturnButtons();

//================================================================================================================================
    
    var eventHandler = new EventHandlerBuilderMain( UI );

    if (executeScript === "Add canvas") {
        #include "../executeScript/Add canvas/Add canvas - eventHandler.jsx";
    }

    if (executeScript === "Resize image"){
        #include "../executeScript/Resize image/Resize image - eventHandler.jsx"; 
    }

    if (executeScript === "2^n canvas"){
        #include "../executeScript/2^n canvas/2^n canvas - eventHandler.jsx"; 
    }

// Main mechanics -------------------------------------------------------------------------------------------------------------------

    eventHandler.onBtnRadChooseFilesActiveDocs();

    eventHandler.onBtnRadChooseFilesSourceFold();

    eventHandler.onBtnChooseFilesSourceFold();

    eventHandler.onFilterSourceFilesCheckboxPNG();

    eventHandler.onFilterSourceFilesCheckboxByExpression();

    eventHandler.onFilterSourceFilesByExpressionInput();

    eventHandler.onBtnRadDestFoldSame();

    eventHandler.onBtnRadDestFoldOther();

    eventHandler.onBtnChooseFilesDestFold();

    eventHandler.onBtnAccept(executeScript, appData, userDataFolder);

    eventHandler.onBtnCancel();

    eventHandler.onReturn();

    eventHandler.startSettingsUINumbofActiveDocs();

    UI.showMainWindow();

}




