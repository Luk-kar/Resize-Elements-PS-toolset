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

#include "../Ι_utils/EventHandlerBuilderMain/onGroupNumb.jsx";

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

        setMinimalValueAt(2, this); //todo bug engine does not see object if value UI.groupLowerThan.valueHighest.text === "0";

        if(parseInt(UI.groupLowerThan.valueHighest.text, 10) < parseInt(UI.groupBiggerThan.valueLowest.text, 10) + 2) {
            alert('"smaller than:" value can' + "'" + '"t be lower than "bigger than:" value')
            UI.groupLowerThan.valueHighest.text = parseInt(UI.groupBiggerThan.valueLowest.text, 10) + 2;
        }
    }
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
                ((UI.btnRadDestFold.same.value === true) || (UI.btnRadDestFold.other.value === true && UI.btnChooseFilesDestFold.title.text !== "Destination folder...")) 
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

    self.startingFunction = function filteringFilesByHeightAndWidthWithoutOpeningThemInPS() { // https://stackoverflow.com/questions/60191804/getting-currentWidth-and-currentHeight-of-image-without-need-of-opening-it-in-ps-cs6-script?noredirect=1#comment106489010_60191804

        if (!isUndefined(self.sourceFolderFilesToProcess) && self.sourceFolderFilesToProcess.length > 0) {

            ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

            var sourceFilesTemp = new Array;

            var biggestWidth = 0;
            var biggestHeight = 0;

            for(var i = 0; i < self.sourceFolderFilesToProcess.length; i++) {

                var file = new XMPFile(File(self.sourceFolderFilesToProcess[i]).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ);

                var xmp = file.getXMP();

                if( xmp.doesPropertyExist(XMPConst.NS_EXIF, "PixelXDimension" ) ) {

                    var currentWidth = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelXDimension" ), 10);
                
                    var currentHeight = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelYDimension" ), 10);
                
                    var highestValueSide = Math.max( currentWidth, currentHeight );

                    if (highestValueSide >= parseInt(UI.groupBiggerThan.valueLowest.text, 10) && highestValueSide <= parseInt(UI.groupLowerThan.valueHighest.text, 10) ) { 
                        sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
                    }

                    if (biggestWidth < currentWidth) {
                        biggestWidth = currentWidth
                    }
                    if (biggestHeight < currentHeight) {
                        biggestHeight = currentHeight
                    }

                } else { // This files does not have EXIF dimensions, so they will be checked during opening files
                    sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
                }    
            }

            // check rest if not TIFF JPEG JPG PNG GIF what is biggest edge, check bmp, psd
            self.biggestWidth = biggestWidth;
            self.biggestHeight = biggestHeight;
            return sourceFilesTemp;
        }
    }
}

EventHandlerBuilderMain.prototype.settingChangeFile = function() {
    var UI = this.UI;
    var self = this;

    self.changeFile = function TwotoNCanvas() {

        var doc = app.activeDocument;

    }

    //     var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
    //     var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string

    //     var highestValueSide = Math.max(activeDocWidth, activeDocHeight);
    
    //     if( doesItHaveBackgroundLayer() && (UI.canvExtendColor.dropDwn.selection.toString() === "Left upper corner color")) { // To avoid bug with picking empty layer
    
    //         leftUpperCornerColorBGSet();
    //     }
    
    //     doc.resizeCanvas(UnitValue(ValueOfSides, "PX"), UnitValue(ValueOfSides, "PX"), AnchorPosition.MIDDLECENTER);
    // }
}

EventHandlerBuilderMain.prototype.settingChangeFileAndSaveEndingFunction = function() {
    var UI = this.UI;
    var self = this;

    self.endingFunction = function() {

        /*
        This function has to be declared, even if it is empty
        This function is used AFTER you opened, changed and saved all files
        Look at "Add canvas - EventHandlerBuilderMain.jsx" as example
        */
    }
}


