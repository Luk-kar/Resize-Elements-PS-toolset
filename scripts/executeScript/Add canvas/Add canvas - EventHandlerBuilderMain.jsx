EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function checkingIfWidthAndHeightIsNot0UnlockingBtn() {

        if ((UI.groupWidth.numb.text.match(/^[0-9]+$/) !== null) && (UI.groupHeight.numb.text.match(/^[0-9]+$/) !== null) &&
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

EventHandlerBuilderMain.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value.\n" +
                        "Only characters avaible are: digits: [0-9] and signs: '-', '+'.\n" + 
                        "The only accepted value inside input field is integer."

    UI.groupWidth.imageTooltip.helpTip = tooltipValue;
    UI.groupHeight.imageTooltip.helpTip = tooltipValue;
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

EventHandlerBuilderMain.prototype.onGrpDlgUnitValImage = function() {
    var UI = this.UI;

    createTooltipToImage(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);
}

EventHandlerBuilderMain.prototype.onAnchorButtons = function() {
    var UI = this.UI;
    var self = this;

    //Default anchor position value
    self.anchorPostionValue = AnchorPosition.MIDDLECENTER;

    var anchorPositionButtons = new Array;
    anchorPositionButtons.push(UI.anchorPositionTOPLEFT, UI.anchorPositionTOPCENTER, UI.anchorPositionTOPRIGHT, UI.anchorPositionMIDDLELEFT, UI.anchorPositionMIDDLECENTER, UI.anchorPositionMIDDLERIGHT, UI.anchorPositionBOTTOMLEFT, UI.anchorPositionBOTTOMCENTER, UI.anchorPositionBOTTOMRIGHT);

    //Adding functionality to buttons in anchor box
    UI.anchorPositionTOPLEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPLEFT, AnchorPosition.TOPLEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPCENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPCENTER, AnchorPosition.TOPCENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionTOPRIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionTOPRIGHT, AnchorPosition.TOPRIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionMIDDLELEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLELEFT, AnchorPosition.MIDDLELEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLECENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLECENTER, AnchorPosition.MIDDLECENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionMIDDLERIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionMIDDLERIGHT, AnchorPosition.MIDDLERIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}

    UI.anchorPositionBOTTOMLEFT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMLEFT, AnchorPosition.BOTTOMLEFT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMCENTER.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMCENTER, AnchorPosition.BOTTOMCENTER, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
    UI.anchorPositionBOTTOMRIGHT.onClick = function() {self.anchorPostionValue = anchorSetingNew(UI.anchorPositionBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT, anchorPositionButtons, UI.imageAnchorTrue, UI.imageAnchorFalse)}
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

EventHandlerBuilderMain.prototype.savingBGandFGtoRestoreLater = function() {
    var self = this;

    ///Saving BG and FG bucket color
    //Foregound bucket color
    self.bgColor = new SolidColor();
    self.bgColor.rgb.red = app.backgroundColor.rgb.red;
    self.bgColor.rgb.green = app.backgroundColor.rgb.green;
    self.bgColor.rgb.blue = app.backgroundColor.rgb.blue;

    //Background bucket color
    self.fgColor = new SolidColor();
    self.fgColor.rgb.red = app.foregroundColor.rgb.red;
    self.fgColor.rgb.green = app.foregroundColor.rgb.green;
    self.fgColor.rgb.blue = app.foregroundColor.rgb.blue;

}

EventHandlerBuilderMain.prototype.onCanvExtendColorDropDwn = function() {
    var UI = this.UI;
    var self = this;

    UI.canvExtendColor.dropDwn.onChange = function() {
        var canvExtendColorDropDwn = UI.canvExtendColor.dropDwn.selection.toString();//Full list to select canvExtendColor.values

        if (canvExtendColorDropDwn === "Foreground") { //:1

            app.foregroundColor = self.bgColor;
            app.backgroundColor = self.fgColor;

        } else if (canvExtendColorDropDwn === "Background") { //:2

            app.foregroundColor = self.fgColor;
            app.backgroundColor = self.bgColor;

        } else if (canvExtendColorDropDwn === "White") { //:3

            app.backgroundColor.rgb.red = 255;
            app.backgroundColor.rgb.green = 255;
            app.backgroundColor.rgb.blue = 255;

        } else if (canvExtendColorDropDwn === "Black") { //:4

            app.backgroundColor.rgb.red = 0;
            app.backgroundColor.rgb.green = 0;
            app.backgroundColor.rgb.blue = 0;

        } else if (canvExtendColorDropDwn === "Grey") { //:5

            app.backgroundColor.rgb.red = 128;
            app.backgroundColor.rgb.green = 128;
            app.backgroundColor.rgb.blue = 128;

        } else if (canvExtendColorDropDwn === "Select color") { //:6

            showColorPicker();
            app.backgroundColor = app.foregroundColor;
            app.foregroundColor = self.fgColor;

        } //else if (canvExtendColorDropDwn === "Left upper corner color") {leftUpperCornerColorBGSet() invoked in function changeFileAndSave} //:7
    }

    var occurrenceIFCount = UI.canvExtendColor.dropDwn.onChange.toString().match(/if \(/gm).length;

    if (UI.canvExtendColor.dropDwn.children.length !== occurrenceIFCount) { //Update this value if you make any changes Look↑↑↑
        throw new Error("Not all dropdowns items have assigned outcomes")
    }
}

EventHandlerBuilderMain.prototype.tooltipCanvExtendColor = function() {
    var UI = this.UI;

    UI.canvExtendColor.imageTooltip.helpTip = "Color is extended only in files with background layer";
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
    
        if( doesItHaveBackgroundLayer() ) {// To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet(UI.groupWidth.unitsDropDown.selection.toString() === "Left upper corner color");
    
        }
    
        var doc = app.activeDocument;
    
        var mathWidthAndHeightResult = mathSumWidthAndHeight(self.units, UI.groupWidth.numb.text, UI.groupHeight.numb.text, doc);
        var sumWidth = mathWidthAndHeightResult[1];
        var sumHeight = mathWidthAndHeightResult[0];
    
        if ( isNaN(sumWidth) ) {
            throw new Error ("object is not a Number"); // Giving other input value than typeof "number" in resizeCanvas() couses bug in which canvas is trimed to 1px in respective axis.
        }
        if ( isNaN(sumHeight) ) {
            throw new Error ("object is not a Number"); // Giving other input value than typeof "number" in resizeCanvas() couses bug in which canvas is trimed to 1px in respective axis.
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
