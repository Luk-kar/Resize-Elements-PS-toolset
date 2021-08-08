/*
using isUndefined() from "../../settings/settings - functions.jsx"
using restrictInputKeys() from "../Ι_utils/functions/restrictInputKeys.jsx"
using getRidOfTooMuch0AtFront() from "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx"
using restrictValueUpTo() from "./2^n canvas - functions.jsx"
using setMinimalValueAt() from "./2^n canvas - functions.jsx"
using doesItHaveBackgroundLayer() from "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx"
using leftUpperCornerColorBGSet() from "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx"
using nearestPow2() from "./2^n canvas - functions.jsx"
*/

#include "../Ι_utils/EventHandlerBuilderMain/savingBGandFGtoRestoreLater.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/onCanvExtendColorDropDwn.jsx";

#include "../Ι_utils/EventHandlerBuilderMain/tooltipCanvExtendColor.jsx";

EventHandlerBuilderMain.prototype.settingAcceptBtnBlock = function() {

    var UI = this.UI;
    var self = this;

    self.lockingUnlockingAcceptBtn = function() { //this object has to be declared as function

        if (((UI.btnRadSourceFiles.chooseOpenedFiles.value === true) || 
            (UI.btnRadSourceFiles.chooseFilesSourceFold.value === true && !isUndefined(self.sourceFolderFilesToProcess) && (self.sourceFolderFilesToProcess.length > 0))) && 
                ((UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")) 
        ) {

            UI.btnAccept.enabled = true;
    
        } else {

            UI.btnAccept.enabled = false;
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

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveStartingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.startingFunction = function filteringFilesByHeightAndWidthWithoutOpeningThemInPS() { // https://stackoverflow.com/questions/60191804/getting-width-and-height-of-image-without-need-of-opening-it-in-ps-cs6-script?noredirect=1#comment106489010_60191804

        if (!isUndefined(self.sourceFolderFilesToProcess) && self.sourceFolderFilesToProcess.length > 0) {

            ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

            var sourceFilesTemp = new Array;

            for(var i = 0; i < self.sourceFolderFilesToProcess.length; i++) {

                var file = new XMPFile(File(self.sourceFolderFilesToProcess[i]).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ);

                var xmp = file.getXMP();

                if( xmp.doesPropertyExist(XMPConst.NS_EXIF, "PixelXDimension" ) ) {

                    var width = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelXDimension" ), 10);
                
                    var height = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelYDimension" ), 10);
                
                    var highestValueSide = Math.max( width, height );

                    if (highestValueSide >= parseInt(UI.groupBiggerThan.valueLowest.text, 10) && highestValueSide <= parseInt(UI.groupLowerThan.valueHighest.text, 10) ) { 
                        sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
                    }
                } else { // This files does not have EXIF dimensions, so they will be checked during opening files
                    sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
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
    
        if( doesItHaveBackgroundLayer() && (UI.canvExtendColor.dropDwn.selection.toString() === "Left upper corner color")) { // To avoid bug with picking empty layer
    
            leftUpperCornerColorBGSet();
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


