﻿/*********************************************************************************
Photoshop script written by Karol Łukaszczyk, 01.2020
Permits you to use, modify, and distribute this file according to licence
**********************************************************************************/

/*
using from "../control panel/control panel - EventHandlerBuilderControlPanel.jsx":
- executeScript

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

    app.displayDialogs = DialogModes.NO; // to avoid bugs with pop-up windows

    // set units to px to read values of active docs later
    var currentUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

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

    if (executeScript === "2^n canvas"){
        #include "../executeScript/2^n canvas/2^n canvas - eventHandler.jsx"; 
    }

    if (executeScript === "Set canvas by biggest edges"){
        #include "../executeScript/Set canvas by biggest edges/Set canvas by biggest edges - eventHandler.jsx";
    }

    if (executeScript === "Set canvas"){
        #include "../executeScript/Set canvas/Set canvas - eventHandler.jsx";
    }

    if (executeScript === "Trim canvas"){
        #include "../executeScript/Trim canvas/Trim canvas - eventHandler.jsx";
    }

    if (executeScript === "Add resize image"){
        #include "../executeScript/Add resize image/Add resize image - eventHandler.jsx"; 
    }

    if (executeScript === "Set image size"){ // <== Add code below
        #include "../executeScript/Set image size/Set image size - eventHandler.jsx";
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




