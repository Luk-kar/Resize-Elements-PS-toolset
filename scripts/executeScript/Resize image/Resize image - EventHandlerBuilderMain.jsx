EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function checkingIfWidthAndHeightIsNot0UnlockingBtn() {

        if ((UI.groupWidth.numb.text.match(/[0-9]+$/) !== null) && (UI.groupHeight.numb.text.match(/[0-9]+$/) !== null) &&
            ((parseInt(UI.groupWidth.numb.text, 10) !== 0) || (parseInt(UI.groupHeight.numb.text, 10) !== 0)) ) { //there is only one possible bug when is equasion = 0, e. g. passing value = 1-1 = 0. In worst case scenario it happens nothing.
    
            UI.btnAccept.enabled = true;
    
        } else {
    
            UI.btnAccept.enabled = false;
        }
    
    }

    if (typeof self.lockingUnlockingAcceptBtn !== "function") {
        throw new Error('Object "self.lockingUnlockingAcceptBtn" is not a function');
    }
}

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

        return self.sourceFilesToProcess; // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow
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
    
        if ( isNaN(sumWidth) ) {
            throw new Error ("object is not a Number");
        }
        if ( isNaN(sumHeight) ) {
            throw new Error ("object is not a Number");
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

EventHandlerBuilderMain.prototype.onGrpWidthNumb = function() {
    var UI = this.UI;
    var self = this;

    blockKeysInEdittext(UI.groupWidth.numb);

    UI.groupWidth.numb.onChanging = function() {

        sameInputField(UI.constrainsProportionsCheckbox, UI.groupWidth.numb, UI.groupHeight.numb);

        self.lockingUnlockingAcceptBtn();
    }
}

EventHandlerBuilderMain.prototype.onGrpWidthUnitsDropDown  = function() {
    var UI = this.UI;

    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
    UI.groupWidth.unitsDropDown.onChange = function() {

        sameDropDown(UI.groupWidth.unitsDropDown, UI.groupHeight.unitDropDown);
    }

}

EventHandlerBuilderMain.prototype.onGrpHeightNumb = function() {
    var UI = this.UI;
    var self = this;

    blockKeysInEdittext(UI.groupHeight.numb);

    //Group Height
    UI.groupHeight.numb.onChanging = function() {

        sameInputField(UI.constrainsProportionsCheckbox, UI.groupHeight.numb, UI.groupWidth.numb);

        self.lockingUnlockingAcceptBtn();
    }
}

EventHandlerBuilderMain.prototype.onGrpHeightUnitDropDown = function() {
    var UI = this.UI;

    UI.groupHeight.unitDropDown.onChange = function() {
        sameDropDown(UI.groupHeight.unitDropDown, UI.groupWidth.unitsDropDown);
    }
}

EventHandlerBuilderMain.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value.\n" +
                        "Only characters avaible are: digits: [0-9] and signs: '-', '+'.\n" + 
                        "The only accepted value inside input field is integer."

    UI.groupWidth.imageTooltip.helpTip = tooltipValue;
    UI.groupHeight.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilderMain.prototype.onGrpDlgUnitValImage = function() {
    var UI = this.UI;

    createTooltipToImage(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);
}

EventHandlerBuilderMain.prototype.onConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.onClick = function() {
        //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
        createTooltipToImage(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);

        //Set the same "highest" value in "Height" and "Width"
        if (UI.constrainsProportionsCheckbox.value === true) {
            //If Height and Width is negative or equal 0, it set in both most negative number
            if((parseInt(UI.groupWidth.numb.text, 10) <= 0) && (parseInt(UI.groupHeight.numb.text, 10) <= 0)) {
                if (parseInt(UI.groupWidth.numb.text, 10) < parseInt(UI.groupHeight.numb.text, 10)) {
                    UI.groupWidth.numb.onChanging();
                }
                //If some value is positive, set in both most positive number
                else {
                    UI.groupHeight.numb.onChanging();
                }
            //If all values are positive set the highest one
            } else if ((parseInt(UI.groupWidth.numb.text, 10) > 0) || (parseInt(UI.groupHeight.numb.text, 10) > 0)) {
                if (parseInt(UI.groupWidth.numb.text, 10) > parseInt(UI.groupHeight.numb.text, 10)) {
                    UI.groupWidth.numb.onChanging();
                } else {
                    UI.groupHeight.numb.onChanging();
                }
            }
        }
    }

}

EventHandlerBuilderMain.prototype.tooltipConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.helpTip =  "Check to constrain Height and Width";
}

