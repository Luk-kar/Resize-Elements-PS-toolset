function EventHandlerBuilderSettingsPanel(UISetPanel) {
    this.UISetPanel = UISetPanel;
}

EventHandlerBuilderSettingsPanel.prototype.onPGNbyDefault = function() {

    var UISetPanel = this.UISetPanel;
    var self = this;

    self.notify_filterSourceFilesCheckbox_PNG = false;

    UISetPanel.PNGbyDefault.btn.onClick = function() {

        var changedPreference = '"FILTER BY PNG"- CHECKBOX = TRUE';

        setValuesOfPrefs(changedPreference, UISetPanel.PNGbyDefault.title);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onDoNotShowCloseOpenedFiles = function() {

    var UISetPanel = this.UISetPanel;

    UISetPanel.DoNotShowCloseOpenedFiles.btn.onClick = function() {

        var changedPreference = '"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG';

        setValuesOfPrefs(changedPreference, UISetPanel.DoNotShowCloseOpenedFiles.title);// Show user made change

    }
}

EventHandlerBuilderSettingsPanel.prototype.onLogFiles = function() {
    
    var UISetPanel = this.UISetPanel;

    UISetPanel.logFiles.btn.onClick = function() {

        var changedPreference = '"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG';

        setValuesOfPrefs(changedPreference, UISetPanel.logFiles.title);// Show user made change

    }
} 

EventHandlerBuilderSettingsPanel.prototype.onReturn = function() {

    var UISetPanel = this.UISetPanel;

    UISetPanel.btnReturn.onClick = function() {

        UISetPanel.settingsWindow.close();

        UIctrlPanel.controlPanelWindow.show();
    }
}