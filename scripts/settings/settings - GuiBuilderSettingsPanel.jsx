function GuiBuilderSettingsPanel() {

    this.buildSettingsPanel();
}

GuiBuilderSettingsPanel.prototype.buildSettingsPanel = function() {

    this.settingsWindow = new Window("dialog", "Enabled/Disabled");
    this.settingsWindow.alignChildren = "left";


    this.PNGbyDefault = this.settingsWindow.add("group");
    this.PNGbyDefault.btn = this.PNGbyDefault.add("button", [0,80,290,101], '"Filter files by PNG" By default');

    var PNGbyDefault_boolValue = readValueOfSeetingsFromPrefFile('"FILTER BY PNG"- CHECKBOX TRUE');
    this.PNGbyDefault.title = this.PNGbyDefault.add("statictext", undefined, PNGbyDefault_boolValue);


    this.DoNotShowCloseOpenedFiles= this.settingsWindow.add("group");
    this.DoNotShowCloseOpenedFiles.btn = this.DoNotShowCloseOpenedFiles.add("button", [0,40,290,61], '"Do you want to close all opened files?" Dialog');

    var DoNotShowCloseOpenedFiles_boolValue = readValueOfSeetingsFromPrefFile('"DO YOU WANT TO CLOSE ALL OPENED FILES"- DIALOG');
    this.DoNotShowCloseOpenedFiles.title = this.DoNotShowCloseOpenedFiles.add("statictext", undefined, DoNotShowCloseOpenedFiles_boolValue);


    this.logFiles = this.settingsWindow.add("group");
    this.logFiles.btn = this.logFiles.add("button", [205,80,495,101], '"scriptUI_changedFilesList.log" Log');

    var logFiles_Value = readValueOfSeetingsFromPrefFile('"SCRIPTUI_CHANGEDFILESLIST.LOG"- WRITE LOG');
    this.logFiles.title = this.logFiles.add("statictext", undefined, logFiles_Value);

    this.btnReturn = this.settingsWindow.add("button", [205,120,495,141], "Return");
}

GuiBuilderSettingsPanel.prototype.showSettingPanel = function () {
    this.settingsWindow.show();
}