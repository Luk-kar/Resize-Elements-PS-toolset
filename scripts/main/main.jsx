////////////////////////////////////////////////////////////////////////////
// Photoshop script written by Karol Łukaszczyk, 01.2020
// Permits you to use, modify, and distribute this file
/////////////////////////////////////////////////////////////////////////////

#target photoshop

$.level = 1; // Debugging level, Level: 0 - No Break, 1 - Break, 2 - Immediate Break

//================================================================================================================================

#include "./main - functions.jsx";

#include "./main - GuiBuilderMain.jsx";

#include "./main - EventHandlerBuilderMain.jsx";

main(executeScript);

function main(executeScript) {

    appDataBuilder();
    
    var UI = new GuiBuilderMain();

    UI.buildPanelSourceFiles();

    UI.buildPanelSourceFilesFilter();

    UI.buildPanelDestinationFolder();

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

    eventHandler.onBtnAccept(executeScript, userDataFolder);

    eventHandler.onBtnCancel();

    eventHandler.onReturn();

    eventHandler.startSettingsUINumbofActiveDocs();

    UI.showMainWindow();

}




