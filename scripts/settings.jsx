function GuiBuilderSettingsPanel() {

    this.buildSettingsPanel();
}

GuiBuilderSettingsPanel.prototype.buildSettingsPanel = function() {

    this.settingsWindow = new Window("dialog", "Enabled/Disabled");
    this.settingsWindow.alignChildren = "left";


    this.PNGbyDefault = this.settingsWindow.add("group");
    this.PNGbyDefault.btn = this.PNGbyDefault.add("button", [0,80,290,101], '"Filter files by PNG" By default');

    var PNGbyDefault_ON_OFF = readValueOfSeetingsFromPrefFile('"FILTER BY PNG"- CHECKBOX = TRUE');
    this.PNGbyDefault.title = this.PNGbyDefault.add("statictext", undefined, PNGbyDefault_ON_OFF);


    this.DoNotShowCloseOpenedFiles= this.settingsWindow.add("group");
    this.DoNotShowCloseOpenedFiles.btn = this.DoNotShowCloseOpenedFiles.add("button", [0,40,290,61], '"Do you want to close all opened files?" Dialog');

    var DoNotShowCloseOpenedFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG');
    this.DoNotShowCloseOpenedFiles.title = this.DoNotShowCloseOpenedFiles.add("statictext", undefined, DoNotShowCloseOpenedFiles_ON_OFF);


    this.logFiles = this.settingsWindow.add("group");
    this.logFiles.btn = this.logFiles.add("button", [205,80,495,101], '"scriptUI_changedFilesList.txt" Log');

    var logFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG');
    this.logFiles.title = this.logFiles.add("statictext", undefined, logFiles_ON_OFF);

    this.btnReturn = this.settingsWindow.add("button", [205,120,495,141], "Return");
}

//================================================================================================================================

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

GuiBuilderSettingsPanel.prototype.showSettingPanel = function () {
    this.settingsWindow.show();
}

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