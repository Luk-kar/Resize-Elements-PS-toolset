#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx";

#include "../Ι_utils/functions/allowMinusOnlyAtFront.jsx";

#include "../Ι_utils/functions/setMaxNumber.jsx";

#include "../Ι_utils/functions/sameInputField.jsx";

#include "../Ι_utils/functions/setDropdownSelectionFromEvent.jsx";

#include "../Ι_utils/functions/changeTooltipAndImageAccordingToState.jsx";

#include "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx";

#include "../Ι_utils/functions/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

#include "../Ι_utils/functions/restrictValueUpTo.jsx";

#include "../Ι_utils/functions/setMinimalValueAt.jsx";

#include "../Ι_utils/functions/anchorSetingNew.jsx";

// https://stackoverflow.com/questions/60191804/getting-currentWidth-and-currentHeight-of-image-without-need-of-opening-it-in-ps-cs6-script?noredirect=1#comment106489010_60191804
function preFiletrFilesToProcess(self, UI) {
    
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

    var sourceFilesTemp = new Array;

    var biggestWidth = 0;
    var biggestHeight = 0;

    for (var i = 0; i < self.sourceFolderFilesToProcess.length; i++) {

        var file = new XMPFile(File(self.sourceFolderFilesToProcess[i]).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ);

        var xmp = file.getXMP();

        if (xmp.doesPropertyExist(XMPConst.NS_EXIF, "PixelXDimension")) {

            var currentWidth = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelXDimension"), 10);

            var currentHeight = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelYDimension"), 10);

            var highestValueSide = Math.max(currentWidth, currentHeight);

            if (highestValueSide >= parseInt(UI.groupBiggerThan.valueLowest.text, 10) && highestValueSide <= parseInt(UI.groupLowerThan.valueHighest.text, 10)) {
                sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
            }

            if (biggestWidth < currentWidth) {
                biggestWidth = currentWidth;
            }
            if (biggestHeight < currentHeight) {
                biggestHeight = currentHeight;
            }

        } else { // This files does not have EXIF dimensions, so they will be checked during opening files

            var activeDoc = open(File(self.sourceFolderFilesToProcess[i]));
            var activeDocWidth = parseInt(activeDoc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
            var activeDocHeight = parseInt(activeDoc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string

            if (biggestWidth < activeDocWidth) {
                biggestWidth = activeDocWidth;
            }
            if (biggestHeight < activeDocHeight) {
                biggestHeight = activeDocHeight;
            }
            activeDoc.close();
            sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
        }
    }

    alert(self.biggestWidth)
    alert(self.biggestHeight)

    self.biggestWidth = biggestWidth;
    self.biggestHeight = biggestHeight;
    return sourceFilesTemp;
}