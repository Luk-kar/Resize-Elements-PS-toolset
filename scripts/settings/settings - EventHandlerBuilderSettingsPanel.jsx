function EventHandlerBuilderSettingsPanel(UISetPanel) {
    this.UISetPanel = UISetPanel;
}

EventHandlerBuilderSettingsPanel.prototype.onPGNbyDefault = function(prefFileKeys_filterByPNG, appData_preferencesFile) {

    var UISetPanel = this.UISetPanel;
    var self = this;

    self.notify_filterSourceFilesCheckbox_PNG = false;

    UISetPanel.PNGbyDefault.btn.onClick = function() {

        var changedPreference = prefFileKeys_filterByPNG;

        setValuesOfPrefs(changedPreference, UISetPanel.PNGbyDefault.title, appData_preferencesFile, userDataFolder);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onDoNotShowCloseOpenedFiles = function(prefFileKeys_closeDialogOpenFiles, appData_preferencesFile) {

    var UISetPanel = this.UISetPanel;

    UISetPanel.DoNotShowCloseOpenedFiles.btn.onClick = function() {

        var changedPreference = prefFileKeys_closeDialogOpenFiles;

        setValuesOfPrefs(changedPreference, UISetPanel.DoNotShowCloseOpenedFiles.title, appData_preferencesFile, userDataFolder);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onLogFiles = function(prefFileKeys_changedFileListLog, appData_preferencesFile) {
    
    var UISetPanel = this.UISetPanel;

    UISetPanel.logFiles.btn.onClick = function() {

        var changedPreference = prefFileKeys_changedFileListLog;

        setValuesOfPrefs(changedPreference, UISetPanel.logFiles.title, appData_preferencesFile, userDataFolder);// Show user made change

    }
} 

EventHandlerBuilderSettingsPanel.prototype.onReturn = function() {

    var UISetPanel = this.UISetPanel;

    UISetPanel.btnReturn.onClick = function() {

        UISetPanel.settingsWindow.close();

        UIctrlPanel.controlPanelWindow.show();
    }
}