EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function someConditionBlockingButton() {

    // UI.btnAccept.enabled = true; // <=== button to unblock
    // UI.btnAccept.enabled = false; // <=== button to block
    // Look at Add canvas - EventHandlerBuilderMain as example
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function doSthAtBeginning() { 
        // This function has to be declared
        // This function is used BEFORE you open any file
        // Look at Add canvas - EventHandlerBuilderMain as example
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function scriptListenerFunc() {

        // This function is used when file is open
        // Look at Add canvas - EventHandlerBuilderMain as example
        // Check also scriptListener download.adobe.com/pub/adobe/photoshop/win/13.x/Win_Scripting_Plug-In.zip
        // And how to use it https://blogs.adobe.com/crawlspace/2006/05/installing_and_1.html
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function doSthAtTheEnd() {
        // This function has to be declared
        // This function is used AFTER you opened, changed and saved all files
        // Look at Add canvas - EventHandlerBuilderMain as example
    }
}