EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function() { //this object has to be declared as function

        if ((UI.groupWidth.numb.text.match(/[0-9]+$/) !== null) && (UI.groupHeight.numb.text.match(/[0-9]+$/) !== null) && 
        ((parseInt(UI.groupWidth.numb.text, 10) !== 0) || (parseInt(UI.groupHeight.numb.text, 10) !== 0)) && (
            (UI.btnRadSourceFiles.chooseOpenedFiles.value === true) && 
                ((UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")) ||
            (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true && !isUndefined(self.sourceFilesToProcess) && (self.sourceFilesToProcess.length > 0)) && (
                (UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")
            )
        )) {

            UI.btnAccept.enabled = true;
    
        } else {

            UI.btnAccept.enabled = false;
        }
    
    }
}