#include "../Ι_utils/EventHandlerBuilderMain/savingBGandFGtoRestoreLater.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onCanvExtendColorDropDwn.jsx";

EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function checkingIfAreAnyDocsToProcess() { //this object has to be declared as function

        UI.btnAccept.enabled = true;

        if ((UI.btnRadSourceFiles.chooseFilesSourceFold.value === true || UI.btnRadDestFold.same.value === true) && 
            (typeof self.sourceFilesToProcess === "undefined" || self.sourceFilesToProcess.length === 0)  ||
            (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text === "Destination folder...")
            ){

            UI.btnAccept.enabled = false;
        }
    }
}


EventHandlerBuilderMain.prototype.onValueLowest = function() {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(UI.groupBiggerThan.valueLowest,
                     ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                     'Minus', 'Escape', 'Backspace', 'Enter']);

    UI.groupBiggerThan.valueLowest.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        restrictValueUpTo(UI.maxResValue, UI.groupBiggerThan.valueLowest);

        self.lockingUnlockingAcceptBtn();
    }

    UI.groupBiggerThan.valueLowest.onChange = function() {

        setMinimalValueAt1(UI.groupBiggerThan.valueLowest);

        if(parseInt(UI.groupLowerThan.valueHighest.text, 10) < parseInt(UI.groupBiggerThan.valueLowest.text, 10)) {
            alert('"bigger than:" value can' + "'" + '"t be higher than "smaller than:" value')
            UI.groupBiggerThan.valueLowest.text = UI.groupLowerThan.valueHighest.text;
        }
    }
}

EventHandlerBuilderMain.prototype.tooltipvalueLowestAndValueHighest = function() {
    var UI = this.UI;

    var tooltipValue = "Written value in any input box has to be bigger than 1px and smaller than " + UI.maxResValue + 'px';

    UI.groupBiggerThan.imageTooltip.helpTip = tooltipValue;
    UI.groupLowerThan.imageTooltip.helpTip = tooltipValue;
}

EventHandlerBuilderMain.prototype.tooltipCanvExtendColor = function() {
    var UI = this.UI;

    UI.canvExtendColor.imageTooltip.helpTip = "Color is extended only in files with background layer";
}

EventHandlerBuilderMain.prototype.onValueHighest = function() {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(UI.groupLowerThan.valueHighest, 
              ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'Minus', 'Escape', 'Backspace', 'Enter']);

    //Group Height
    UI.groupLowerThan.valueHighest.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        restrictValueUpTo(UI.maxResValue, UI.groupLowerThan.valueHighest);

        self.lockingUnlockingAcceptBtn();
    }

    UI.groupLowerThan.valueHighest.onChange = function() {

        getRidOfTooMuch0AtFront(this);

        setMinimalValueAt1(UI.groupLowerThan.valueHighest);

        if(parseInt(UI.groupLowerThan.valueHighest.text, 10) < parseInt(UI.groupBiggerThan.valueLowest.text, 10)) {
            alert('"smaller than:" value can' + "'" + '"t be lower than "bigger than:" value')
            UI.groupLowerThan.valueHighest.text = UI.groupBiggerThan.valueLowest.text;
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function filteringFilesByHeightAndWidthWithoutOpeningThemInPS() { // https://stackoverflow.com/questions/60191804/getting-width-and-height-of-image-without-need-of-opening-it-in-ps-cs6-script?noredirect=1#comment106489010_60191804

        if (typeof self.sourceFilesToProcess !== "undefined" && self.sourceFilesToProcess.length > 0) {

            ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

            var sourceFilesTemp = new Array;

            for(var i = 0; i < self.sourceFilesToProcess.length; i++) {

                var file = new XMPFile(File(self.sourceFilesToProcess[i]).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ);

                var xmp = file.getXMP();

                if( xmp.doesPropertyExist(XMPConst.NS_EXIF, "PixelXDimension" ) ) {

                    var width = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelXDimension" ), 10);
                
                    var height = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelYDimension" ), 10);
                
                    var highestValueSide = Math.max( width, height );

                    if (highestValueSide >= parseInt(UI.groupBiggerThan.valueLowest.text, 10) && highestValueSide <= parseInt(UI.groupLowerThan.valueHighest.text, 10) ) { 
                        sourceFilesTemp.push(self.sourceFilesToProcess[i]);
                    }
                } else { // This files does not have EXIF dimensions, so they will be checked during opening files
                    sourceFilesTemp.push(self.sourceFilesToProcess[i]);
                }    
            }
            return sourceFilesTemp;
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function TwotoNCanvas() {

        var doc = app.activeDocument;

        var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
        var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string

        var highestValueSide = Math.max(activeDocWidth, activeDocHeight);

        if (highestValueSide < parseInt(UI.groupBiggerThan.valueLowest.text, 10) || highestValueSide > parseInt(UI.groupLowerThan.valueHighest.text, 10) ) {
            return "continue";
        }
    
        if( doesItHaveBackgroundLayer() ) { // To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet(UI.canvExtendColor.dropDwn.selection.toString() === "Left upper corner color");
    
        }

        var ValueOfSides = nearestPow2( highestValueSide );

        if (ValueOfSides > UI.maxResValue) { //safety valve if for some weird reason value is higher // note: highest value to pass is 29 000 acording to documentation
            ValueOfSides = UI.maxResValue;
        }
    
        if ( isNaN(ValueOfSides) ) { // Giving other input value than typeof "number" in resizeCanvas() couses bug in which canvas is trimed to 1px in respective axis.
            throw new Error ("Object is not a number, retrieved value of biggest side should be numerical");
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


