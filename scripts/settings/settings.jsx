#include "./settings - GuiBuilderSettingsPanel.jsx";

#include "./settings - EventHandlerBuilderSettingsPanel.jsx";

settingsPanel()

function settingsPanel() {

appDataBuilder();

//================================================================================================================================

var UISetPanel =  new GuiBuilderSettingsPanel();

UISetPanel.buildSettingsPanel();

//================================================================================================================================

var eventHandler = new EventHandlerBuilderSettingsPanel( UISetPanel );

eventHandler.onPGNbyDefault();

eventHandler.onDoNotShowCloseOpenedFiles();

eventHandler.onLogFiles();

eventHandler.onReturn();

UISetPanel.showSettingPanel();

}