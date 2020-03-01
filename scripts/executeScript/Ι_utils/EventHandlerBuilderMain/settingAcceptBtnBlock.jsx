EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function() { //this object has to be declared as function

        if ((UI.groupWidth.numb.text.match(/[0-9]+$/) !== null) && (UI.groupHeight.numb.text.match(/[0-9]+$/) !== null) &&
            ((parseInt(UI.groupWidth.numb.text, 10) !== 0) || (parseInt(UI.groupHeight.numb.text, 10) !== 0)) && //there is only one possible bug when is equasion = 0, e. g. passing value = 1-1 = 0. In worst case scenario it happens nothing.
            ( (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true && !isUndefined(self.sourceFilesToProcess) && (self.sourceFilesToProcess.length > 0)) ||
            (UI.btnRadSourceFiles.chooseOpenedFiles.value === true) )) {

            UI.btnAccept.enabled = true;
    
        } else {

            UI.btnAccept.enabled = false;
        }
    
    }
}