/*
using from "../settings/settings - functions.jsx":
- appData
- prefFileKeys
*/

#include "./settings - GuiBuilderSettingsPanel.jsx";

#include "./settings - EventHandlerBuilderSettingsPanel.jsx";

settingsPanel()

function settingsPanel() {

appDataBuilder(appData, prefFileKeys, userDataFolder);

//================================================================================================================================

var UISetPanel =  new GuiBuilderSettingsPanel(prefFileKeys, appData, userDataFolder);

UISetPanel.buildSettingsPanel(prefFileKeys, appData, userDataFolder);

//================================================================================================================================

var eventHandler = new EventHandlerBuilderSettingsPanel( UISetPanel );

eventHandler.onPGNbyDefault(prefFileKeys.filterByPNG, appData.preferencesFile);

eventHandler.onDoNotShowCloseOpenedFiles(prefFileKeys.closeDialogOpenFiles, appData.preferencesFile);

eventHandler.onLogFiles(prefFileKeys.changedFileListLog, appData.preferencesFile);

eventHandler.onReturn();

UISetPanel.showSettingPanel();

}