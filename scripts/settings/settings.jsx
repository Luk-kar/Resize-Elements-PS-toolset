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

eventHandler.onPGNbyDefault(prefFileKeys.filterByPNG, appData.preferencesFile);

eventHandler.onDoNotShowCloseOpenedFiles(prefFileKeys.closeDialogOpenFiles, appData.preferencesFile);

eventHandler.onLogFiles(prefFileKeys.changedFileListLog, appData.preferencesFile);

eventHandler.onReturn();

UISetPanel.showSettingPanel();

}