#include "../Ι_utils/EventHandlerBuilderMain/settingAcceptBtnBlock.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/savingBGandFGtoRestoreLater.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onCanvExtendColorDropDwn.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGroupNumb.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGroupUnitsDropDown.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipWidthAndHeightImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGrpDlgUnitValImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onConstrainsProportionsCheckbox.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipConstrainsProportionsCheckbox.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipCanvExtendColor.jsx";


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

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function setUnitForAddCanvas() {
        //full list is in var AddCanvasDocUnits
        var unitsTypes = [
            ["ADD PX", "PX"],
            ["ADD %", "PERCENT"],
        ];
        ErrorDiffrentUnitTypes(UI.groupWidth.unitsDropDown, unitsTypes);
    
        self.units = unitsTypes[parseInt(UI.groupWidth.unitsDropDown.selection, 10)][1];

        return self.sourceFilesToProcess; // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function AddCanvas() {

        if( doesItHaveBackgroundLayer() && (UI.canvExtendColor.dropDwn.selection.toString() === "Left upper corner color")) {// To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet();
        }
    
        var doc = app.activeDocument;
    
        var mathWidthAndHeightResult = mathSumWidthAndHeight(self.units, UI.groupWidth.numb.text, UI.groupHeight.numb.text, doc);
        var sumWidth = mathWidthAndHeightResult[1];
        var sumHeight = mathWidthAndHeightResult[0];
    
        if ( isNaN(sumWidth) || isNaN(sumHeight) ) {
            throw new Error ("object is not a Number. Width of file or added value or both should be numerical");
        }
    
        doc.resizeCanvas(UnitValue(sumWidth, self.units), UnitValue(sumHeight, self.units), self.anchorPostionValue);
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

