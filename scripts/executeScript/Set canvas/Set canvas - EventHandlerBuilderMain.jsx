/*
using isUndefined() from "../../settings/settings - functions.jsx"
using anchorSetingNew() from "./anchorSetingNew.jsx
using ErrorDiffrentUnitTypes() from "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx"
using doesItHaveBackgroundLayer() from "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx"
using leftUpperCornerColorBGSet() from "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx"
suing mathSumWidthAndHeight() from "../Ι_utils/functions/mathSumWidthAndHeight.jsx"
*/

#include "../Ι_utils/EventHandlerBuilderMain/settingAcceptBtnBlock.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/savingBGandFGtoRestoreLater.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onCanvExtendColorDropDwn.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGroupNumb.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipWidthAndHeightImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGrpDlgUnitValImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onConstrainsProportionsCheckbox.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipConstrainsProportionsCheckbox.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipCanvExtendColor.jsx";

EventHandlerBuilderMain.prototype.onValueLowest = function() {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(UI.groupBiggerThan.valueLowest,
                     ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                     'Escape', 'Backspace', 'Enter']);

    UI.groupBiggerThan.valueLowest.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        restrictValueUpTo(UI.maxResValue, this);

        self.lockingUnlockingAcceptBtn();

    }

    UI.groupBiggerThan.valueLowest.onChange = function() {

        setMinimalValueAt(0, this);

        if(parseInt(UI.groupLowerThan.valueHighest.text, 10) - 2 < parseInt(UI.groupBiggerThan.valueLowest.text, 10)) {
            alert('"bigger than:" value can' + "'" + '"t be higher than "smaller than:" value')
            UI.groupBiggerThan.valueLowest.text = parseInt(UI.groupLowerThan.valueHighest.text, 10) -2; // between this two values you have to have 2 intreger diffrence, becouse UI.groupBiggerThan.valueLowest.text < x > UI.groupLowerThan.valueHighest.text
        }
    }
}

EventHandlerBuilderMain.prototype.tooltipvalueLowestAndValueHighest = function() {
    var UI = this.UI;

    var tooltipValue = "Written value in any input box has to be bigger than 0 px and smaller than " + UI.maxResValue + 'px\n' +
    "Filtered files are not updated dynamicaly in preview at the bottom of window, check log to be sure which files were processed";

    UI.groupBiggerThan.imageTooltip.helpTip = tooltipValue;
    UI.groupLowerThan.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilderMain.prototype.onValueHighest = function() {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(UI.groupLowerThan.valueHighest, 
              ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'Escape', 'Backspace', 'Enter']);

    //Group Height
    UI.groupLowerThan.valueHighest.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        restrictValueUpTo(UI.maxResValue, this);

        self.lockingUnlockingAcceptBtn();
    }

    UI.groupLowerThan.valueHighest.onChange = function() {

        setMinimalValueAt(2, this); // bug engine does not see object if value UI.groupLowerThan.valueHighest.text === "0";

        if(parseInt(UI.groupLowerThan.valueHighest.text, 10) < parseInt(UI.groupBiggerThan.valueLowest.text, 10) + 2) {
            alert('"smaller than:" value can' + "'" + '"t be lower than "bigger than:" value')
            UI.groupLowerThan.valueHighest.text = parseInt(UI.groupBiggerThan.valueLowest.text, 10) + 2;
        }
    }
}

EventHandlerBuilderMain.prototype.tooltipvalueLowestAndValueHighest = function() {
    var UI = this.UI;

    var tooltipValue = "Written value in any input box has to be bigger than 0 px and smaller than " + UI.maxResValue + 'px\n' +
    "Filtered files are not updated dynamicaly in preview at the bottom of window, check log to be sure which files were processed";

    UI.groupBiggerThan.imageTooltip.helpTip = tooltipValue;
    UI.groupLowerThan.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilderMain.prototype.onAnchorButtons = function() {
    var UI = this.UI;
    var self = this;

    //Default anchor position value
    self.anchorPostionValue = AnchorPosition.MIDDLECENTER;

    var anchorPositionButtons = [UI.anchorPositionTOPLEFT, UI.anchorPositionTOPCENTER, UI.anchorPositionTOPRIGHT, UI.anchorPositionMIDDLELEFT, UI.anchorPositionMIDDLECENTER, UI.anchorPositionMIDDLERIGHT, UI.anchorPositionBOTTOMLEFT, UI.anchorPositionBOTTOMCENTER, UI.anchorPositionBOTTOMRIGHT];
    var anchorAtributes = [AnchorPosition.TOPLEFT, AnchorPosition.TOPCENTER, AnchorPosition.TOPRIGHT, AnchorPosition.MIDDLELEFT, AnchorPosition.MIDDLECENTER, AnchorPosition.MIDDLERIGHT, AnchorPosition.BOTTOMLEFT, AnchorPosition.BOTTOMCENTER, AnchorPosition.BOTTOMRIGHT];

    //Adding functionality to buttons in anchor box
    for (var i = 0; i < anchorPositionButtons.length; i++) {
        
        var button = anchorPositionButtons[i];

        button.onClick = function() {self.anchorPostionValue = anchorSetingNew(this, anchorAtributes, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)} //You can't pass into function single particular value from array, you have to pass array into the function and later filter needed object from that array. If you pass array[i] then you pass to all functions last object from that array. 
    }
}

EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function() { //this object has to be declared as function

        if (((UI.btnRadSourceFiles.chooseOpenedFiles.value === true) || 
            (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true && !isUndefined(self.sourceFolderFilesToProcess) && (self.sourceFolderFilesToProcess.length > 0))) && 
                ((UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")) &&
                (parseInt(UI.groupWidth.numb.text, 10) > 0 && parseInt(UI.groupHeight.numb.text, 10) > 0)
        ) {

            UI.btnAccept.enabled = true;
    
        } else {

            UI.btnAccept.enabled = false;
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function setUnitForAddCanvas() {
        if (!isUndefined(self.sourceFolderFilesToProcess) && self.sourceFolderFilesToProcess.length > 0) {

            return preFilterFilesToProcess(self, UI);
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function SetCanvas() {

        if( doesItHaveBackgroundLayer() && (UI.canvExtendColor.dropDwn.selection.toString() === "Left upper corner color")) {// To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet();
        }
    
        var doc = app.activeDocument;
        var setWidth = parseInt(UI.groupWidth.numb.text, 10);
        var setHeight = parseInt(UI.groupHeight.numb.text, 10);
    
        if ( isNaN(setWidth) || setWidth <= 0 || isNaN(setHeight) || setHeight <= 0) {
            throw new Error ("object is not a Number. Width of file or added value or both should be numerical");
        }

        var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
        var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string 

        var highestValueSide = Math.max(activeDocWidth, activeDocHeight);

        if (highestValueSide < parseInt(UI.groupBiggerThan.valueLowest.text, 10) || highestValueSide > parseInt(UI.groupLowerThan.valueHighest.text, 10) ) {
            return "continue";
        }

        var unit = "PX"
    
        doc.resizeCanvas(UnitValue(setWidth, unit), UnitValue(setHeight, unit), self.anchorPostionValue);
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function returnInitialBackgroundAndForeground() {
        app.foregroundColor = self.fgColor;
        app.backgroundColor = self.bgColor;
    }
}

