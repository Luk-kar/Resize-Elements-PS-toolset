EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function checkingIfAreAnyDocsToProcess() {

        if (UI.btnRadSourceFiles.chooseOpenedFiles === true) {

            if (docsOpenedFiles().length > 0) { //todo
        
                UI.btnAccept.enabled = true;
        
            } else if (docsOpenedFiles().length === 0) {
        
                UI.btnAccept.enabled = false;
            }

        } else if (UI.btnRadSourceFiles.chooseFilesSourceFold === true) {

            if (self.sourceFilesToProcess.length > 0) {

                UI.btnAccept.enabled = true;

            } else if (self.sourceFilesToProcess.length === 0) {

                UI.btnAccept.enabled = false;
            }
        }

    }

    if (typeof self.lockingUnlockingAcceptBtn !== "function") {
        throw new Error('Object "self.lockingUnlockingAcceptBtn" is not a function');
    }
}

EventHandlerBuilderMain.prototype.onValueLowest = function() {
    var UI = this.UI;
    var self = this;

    blockKeysInEdittext(UI.grpBiggerThan.valueLowest);

    UI.grpBiggerThan.valueLowest.onChanging = function() {

        //filter by lowest and highest value
        //Update infoUI

        self.lockingUnlockingAcceptBtn();
    }
}

EventHandlerBuilderMain.prototype.tooltipvalueLowestAndValueHighest = function() {
    var UI = this.UI;

    var tooltipValue = "Written value in any input box has to be bigger than 0px and smaller than " + UI.maxResValue + 'px\nNot written value and "0" causes that any value is accepted';

    UI.grpBiggerThan.imageTooltip.helpTip = tooltipValue;
    UI.grpLowerThan.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilderMain.prototype.tooltipCanvExtendColor = function() {
    var UI = this.UI;

    UI.canvExtendColor.imageTooltip.helpTip = "Color is extended only in files with background layer";
}

EventHandlerBuilderMain.prototype.onValueHighest = function() {
    var UI = this.UI;
    var self = this;

    blockKeysInEdittext(UI.grpLowerThan.valueHighest);

    //Group Height
    UI.grpLowerThan.valueHighest.onChanging = function() {

        //filter by lowest and highest value
        //Update infoUI

        self.lockingUnlockingAcceptBtn();
    }
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

    if (UI.canvExtendColor.dropDwn.children.length !== 7) { //Update this value if you make any changes Look↑↑↑
        throw new Error("Not all dropdowns items have assigned outcomes")
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function doNothingAtTheBeginning() {
        //nothing happen; this function has to be declared
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function TwotoNCanvas() {
    
        if( itHasBackgroundLayerChecker() ) {// To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet(UI.grpWidth.unitsDropDown.selection.toString() === "Left upper corner color");
    
        }
    
        var doc = app.activeDocument;

        var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10);
        var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10);

        var highestValueSide = Math.max(activeDocWidth, activeDocHeight);

        var ValueOfSides = nearestPow2( highestValueSide );

        if (ValueOfSides > UI.maxResValue) { //safety valve if for some weird reason value is higher // note: highest value to pass is 29 000 acording to documentation
            ValueOfSides = UI.maxResValue;
        }
    
        if ( isNaN(ValueOfSides) ) {
            throw new Error ("object is not a Number");
        }
    
        doc.resizeCanvas(UnitValue(ValueOfSides, "PX"), UnitValue(ValueOfSides, "PX"), AnchorPosition.MIDDLECENTER);
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function doNothingAtTheEnd() {
        //nothing happen; this function has to be declared
    }
}

