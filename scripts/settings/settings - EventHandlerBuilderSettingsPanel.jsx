function EventHandlerBuilderSettingsPanel(UISetPanel) {
    this.UISetPanel = UISetPanel;
}

EventHandlerBuilderSettingsPanel.prototype.onPGNbyDefault = function() {

    var UISetPanel = this.UISetPanel;
    var self = this;

    self.notify_filterSourceFilesCheckbox_PNG = false;

    UISetPanel.PNGbyDefault.btn.onClick = function() {

        var changedPreference = prefFileKeys.filterByPNG;

        setValuesOfPrefs(changedPreference, UISetPanel.PNGbyDefault.title, userDataFolder);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onDoNotShowCloseOpenedFiles = function() {

    var UISetPanel = this.UISetPanel;

    UISetPanel.DoNotShowCloseOpenedFiles.btn.onClick = function() {

        var changedPreference = prefFileKeys.closeDialogOpenFiles;

        setValuesOfPrefs(changedPreference, UISetPanel.DoNotShowCloseOpenedFiles.title, userDataFolder);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onLogFiles = function() {
    
    var UISetPanel = this.UISetPanel;

    UISetPanel.logFiles.btn.onClick = function() {

        var changedPreference = prefFileKeys.changedFileListLog;

        setValuesOfPrefs(changedPreference, UISetPanel.logFiles.title, userDataFolder);// Show user made change

    }
} 

EventHandlerBuilderSettingsPanel.prototype.onReturn = function() {

    var UISetPanel = this.UISetPanel;

    UISetPanel.btnReturn.onClick = function() {

        UISetPanel.settingsWindow.close();

        UIctrlPanel.controlPanelWindow.show();
    }
}