function GuiBuilderSettingsPln() {

    this.buildSettingsPanel();
}

GuiBuilderSettingsPln.prototype.buildSettingsPanel = function() {

    this.settingsWindow = new Window("dialog", "Enabled/Disabled");
    this.settingsWindow.alignChildren = "left";


    this.settingsWindow.PNGbyDefault = this.settingsWindow.add("group");
    this.settingsWindow.PNGbyDefault.btn = this.settingsWindow.PNGbyDefault.add("button", [0,80,290,101], '"Filter files by PNG" By default');

    var PNGbyDefault_ON_OFF = readValueOfSeetingsFromPrefFile('"FILTER BY PNG"- CHECKBOX = TRUE');
    this.settingsWindow.PNGbyDefault.title = this.settingsWindow.PNGbyDefault.add("statictext", undefined, PNGbyDefault_ON_OFF);


    this.settingsWindow.DoNotShowCloseOpenedFiles= this.settingsWindow.add("group");
    this.settingsWindow.DoNotShowCloseOpenedFiles.btn = this.settingsWindow.DoNotShowCloseOpenedFiles.add("button", [0,40,290,61], '"Do you want to close all opened files?" Dialog');

    var DoNotShowCloseOpenedFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG');
    this.settingsWindow.DoNotShowCloseOpenedFiles.title = this.settingsWindow.DoNotShowCloseOpenedFiles.add("statictext", undefined, DoNotShowCloseOpenedFiles_ON_OFF);


    this.settingsWindow.logFiles = this.settingsWindow.add("group");
    this.settingsWindow.logFiles.btn = this.settingsWindow.logFiles.add("button", [205,80,495,101], '"scriptUI_changedFilesList.txt" Log');

    var logFiles_ON_OFF = readValueOfSeetingsFromPrefFile('"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG');
    this.settingsWindow.logFiles.title = this.settingsWindow.logFiles.add("statictext", undefined, logFiles_ON_OFF);

    this.settingsWindow.btnReturn = this.settingsWindow.add("button", [205,120,495,141], "Return");
}

//================================================================================================================================

function EventHandlerBuilderSettingsPln(UISetpln) {
    this.UISetpln = UISetpln;
}

EventHandlerBuilderSettingsPln.prototype.onPGNbyDefault = function() {

    var UISetpln = this.UISetpln;
    var self = this;

    self.notify_filterSourceFilesCheckbox_PNG = false;

    UISetpln.settingsWindow.PNGbyDefault.btn.onClick = function() {

        var changedPreference = '"FILTER BY PNG"- CHECKBOX = TRUE';

        setValuesOfPrefs(changedPreference, UISetpln.settingsWindow.PNGbyDefault.title);// Show user made change

    }
}

EventHandlerBuilderSettingsPln.prototype.onDoNotShowCloseOpenedFiles = function() {

    var UISetpln = this.UISetpln;

    UISetpln.settingsWindow.DoNotShowCloseOpenedFiles.btn.onClick = function() {

        var changedPreference = '"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG';

        setValuesOfPrefs(changedPreference, UISetpln.settingsWindow.DoNotShowCloseOpenedFiles.title);// Show user made change

    }
}

EventHandlerBuilderSettingsPln.prototype.onLogFiles = function() {
    
    var UISetpln = this.UISetpln;

    UISetpln.settingsWindow.logFiles.btn.onClick = function() {

        var changedPreference = '"SCRIPTUI_CHANGEDFILESLIST.TXT"- WRITE LOG';

        setValuesOfPrefs(changedPreference, UISetpln.settingsWindow.logFiles.title);// Show user made change

    }
} 

EventHandlerBuilderSettingsPln.prototype.onReturn = function() {

    var UISetpln = this.UISetpln;

    UISetpln.settingsWindow.btnReturn.onClick = function() {

        UISetpln.settingsWindow.close();

        UIctrlPln.controlPanelWindow.show();
    }
}

GuiBuilderSettingsPln.prototype.showSettingPanel = function () {
    this.settingsWindow.show();
}

settingsPanel()

function settingsPanel() {

appDataBuilder();

//================================================================================================================================

var UISetpln =  new GuiBuilderSettingsPln();

UISetpln.buildSettingsPanel();

//================================================================================================================================

var eventHandler = new EventHandlerBuilderSettingsPln( UISetpln );

eventHandler.onPGNbyDefault();

eventHandler.onDoNotShowCloseOpenedFiles();

eventHandler.onLogFiles();

eventHandler.onReturn();

UISetpln.showSettingPanel();

}