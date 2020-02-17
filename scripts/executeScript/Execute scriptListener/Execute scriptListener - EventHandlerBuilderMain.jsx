EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function someConditionBlockingButton() {

    // UI.btnAccept.enabled = true; // <=== button to block
    // UI.btnAccept.enabled = false; // <=== button to block
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function doSthAtBeginning() { 
        //nothing happen; this function has to be declared
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function scriptListenerFunc() {

        // insert code
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function doSthAtTheEnd() {
        //nothing happen; this function has to be declared
    }
}


