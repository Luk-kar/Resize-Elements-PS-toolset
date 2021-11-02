// https://stackoverflow.com/questions/60191804/getting-currentWidth-and-currentHeight-of-image-without-need-of-opening-it-in-ps-cs6-script?noredirect=1#comment106489010_60191804

function preFilterFilesToProcess(self, UI) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

    var sourceFilesTemp = new Array;

    for(var i = 0; i < self.sourceFolderFilesToProcess.length; i++) {

        var file = new XMPFile(File(self.sourceFolderFilesToProcess[i]).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ);

        var xmp = file.getXMP();

        if( xmp.doesPropertyExist(XMPConst.NS_EXIF, "PixelXDimension" ) ) {

            var width = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelXDimension" ), 10);
        
            var height = parseInt(xmp.getProperty(XMPConst.NS_EXIF, "PixelYDimension" ), 10);
        
            var highestValueSide = Math.max( width, height );

            if (highestValueSide >= parseInt(UI.groupBiggerThan.valueLowest.text, 10) && highestValueSide <= parseInt(UI.groupLowerThan.valueHighest.text, 10)) { 
                sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
            }
        } else { // This files does not have EXIF dimensions, so they will be checked during opening files
            sourceFilesTemp.push(self.sourceFolderFilesToProcess[i]);
        }    
    }
    return sourceFilesTemp; // returning this value is faster than checking if function returns "undefined" in main.jsx. Assigning execution heavy computing function self.startingFunction twice could be slow
}