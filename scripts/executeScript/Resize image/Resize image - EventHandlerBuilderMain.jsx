/*
using isUndefined() from "../../settings/settings - functions.jsx"
using ErrorDiffrentUnitTypes() "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx"
using mathSumWidthAndHeight() "../Ι_utils/functions/mathSumWidthAndHeight.jsx"
*/

#include "../Ι_utils/EventHandlerBuilderMain/settingAcceptBtnBlock.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGroupNumb.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGroupUnitsDropDown.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipWidthAndHeightImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onGrpDlgUnitValImage.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onConstrainsProportionsCheckbox.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipConstrainsProportionsCheckbox.jsx";


EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function setUnitForResizeImage() {
        //full list is in var canvResampleImageValues
        var canvResampleImageValues = [
                                    ["Nearest Neighbor (preserve hard edges)", ResampleMethod.NEARESTNEIGHBOR],
                                    ["Bilinear", ResampleMethod.BILINEAR],
                                    ["Bicubic (best for smooth gradients)", ResampleMethod.BICUBIC],
                                    ["Bicubic (best for enlargemenent)", ResampleMethod.BICUBICSMOOTHER],
                                    ["Bicubic (best for reduction)", ResampleMethod.BICUBICSHARPER],
                                    ["Bicubic Automatic", undefined] //if it is undefined it sets automatic value
                                    ];

        ErrorDiffrentUnitTypes(UI.canvResampleImage.dropDwn, canvResampleImageValues);

        self.resampleMethod = canvResampleImageValues[parseInt(UI.canvResampleImage.dropDwn.selection, 10)][1];

        //full list is in var AddCanvasDocUnits
        var unitsTypes = [
            ["ADD PX", "PX"],
            ["ADD %", "PERCENT"],
        ];

        ErrorDiffrentUnitTypes(UI.groupWidth.unitsDropDown, unitsTypes);
    
        self.units = unitsTypes[parseInt(UI.groupWidth.unitsDropDown.selection, 10)][1];

        return self.sourceFolderFilesToProcess; // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function resizeImage() {
    
        var doc = app.activeDocument;
    
        var mathWidthAndHeightResult = mathSumWidthAndHeight(self.units, UI.groupWidth.numb.text, UI.groupHeight.numb.text, doc);
        var sumWidth = mathWidthAndHeightResult[1];
        var sumHeight = mathWidthAndHeightResult[0];
    
        if ( isNaN(sumWidth) || isNaN(sumHeight) ) {
            throw new Error ("object is not a Number. Width of file or added value or both should be numerical");
        }

        doc.resizeImage(UnitValue(sumWidth, self.units), UnitValue(sumHeight, self.units), undefined, self.resampleMethod);
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function doNothingAtTheEnd() {
        //nothing happen; this function has to be declared
    }
}