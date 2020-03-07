function GuiBuilderSettingsPanel() {

    this.buildSettingsPanel();
}

GuiBuilderSettingsPanel.prototype.buildSettingsPanel = function() {

    this.settingsWindow = new Window("dialog", "Enabled/Disabled");
    this.settingsWindow.alignChildren = "left";


    this.PNGbyDefault = this.settingsWindow.add("group");
    this.PNGbyDefault.btn = this.PNGbyDefault.add("button", [0,80,290,101], '"Filter files by PNG" By default');

    var PNGbyDefault_boolValue = readValueOfSeetingsFromPrefFile(prefFileKeys.filterByPNG, appData.preferencesFile, userDataFolder);
    this.PNGbyDefault.title = this.PNGbyDefault.add("statictext", undefined, PNGbyDefault_boolValue);


    this.DoNotShowCloseOpenedFiles= this.settingsWindow.add("group");
    this.DoNotShowCloseOpenedFiles.btn = this.DoNotShowCloseOpenedFiles.add("button", [0,40,290,61], '"Do you want to close all opened files?" Dialog');

    var DoNotShowCloseOpenedFiles_boolValue = readValueOfSeetingsFromPrefFile(prefFileKeys.closeDialogOpenFiles, appData.preferencesFile, userDataFolder);
    this.DoNotShowCloseOpenedFiles.title = this.DoNotShowCloseOpenedFiles.add("statictext", undefined, DoNotShowCloseOpenedFiles_boolValue);


    this.logFiles = this.settingsWindow.add("group");
    this.logFiles.btn = this.logFiles.add("button", [205,80,495,101], '"' + appData.preferencesFile + "'" + " Log");

    var logFiles_Value = readValueOfSeetingsFromPrefFile(prefFileKeys.changedFileListLog, appData.preferencesFile, userDataFolder);
    this.logFiles.title = this.logFiles.add("statictext", undefined, logFiles_Value);

    this.btnReturn = this.settingsWindow.add("button", [205,120,495,141], "Return");
}

GuiBuilderSettingsPanel.prototype.showSettingPanel = function () {
    this.settingsWindow.show();
}