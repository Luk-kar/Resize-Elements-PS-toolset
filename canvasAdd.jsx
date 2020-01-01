#target photoshop

globals = {};

main();

function main() {

    ////Creating main UI
    var mainWindow = new Window("dialog", "Add canvas");
        //Creating group to populate with main UI
        var grpMain = mainWindow.add("group")

        var grpInfo = createGroup(grpMain, "column", "left");

            //Source files
            var plnSourceFiles = createPanel(grpInfo, undefined, "left");

                //Source files title
                var plnSourceFilesTitle = plnSourceFiles.add("statictext", undefined, "Source files:");

                //Creating radial button group
                var grpBtnRadSourceFiles = createGroup(plnSourceFiles, "column", "left", "left");

                    //Radial button choose active files/target folder
                    var btnRadChooseFilesActiveDocs = grpBtnRadSourceFiles.add("radiobutton", undefined, "Opened files");
                    var btnRadChooseFilesSourceFold = grpBtnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

                    //Add button to choose target folder
                    var grpBtnChooseFilesSourceFold = plnSourceFiles.add("group");

                    var btnChooseFilesSourceFold =  grpBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
                    var btnChooseFilesSourceFoldTitle = grpBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");
                    btnChooseFilesSourceFoldTitle.characters = 25;

        ///Destination folder UI
        var pnlDestFold = createPanel(grpInfo, undefined, "left");

            //Title
            var pnlDestFoldTitle = pnlDestFold.add("statictext", undefined, "Destination folder:");

            //Creating group radial button choose destination folder
            var grpBtnRadChooseFolder = createGroup(pnlDestFold, "column", "left");

                //Radial buttons choose destination folder
                var btnRadFolderSame = grpBtnRadChooseFolder.add("radiobutton", undefined, "Add canvas in the same folder");
                var btnRadFolderOther = grpBtnRadChooseFolder.add("radiobutton", undefined, "Add canvas and copy files to other folder");

            //Browse button destination folder
            var grpBtnDestFold = pnlDestFold.add("group");

            var btnDestFold = grpBtnDestFold.add("button", undefined, "Browse...");
            var btnDestFoldTitle = grpBtnDestFold.add("statictext", undefined, "Destination folder...");
            btnDestFoldTitle.characters = 25;

        ///Add canvas UI
        var pnlAddCanvas = createPanel(grpInfo, undefined, "left");

            //Title
            var pnlAddCanvasTitle = pnlAddCanvas.add("statictext", undefined, "Add canvas");

            //Group units value
            var grpUnitVal = pnlAddCanvas.add("group");
            //grpUnitVal.alignment = "left";

                //Group dialog units value
                grpUnitValDlg = createGroup(grpUnitVal, "column", "left");

                    //Group width
                    var grpWidth = grpUnitValDlg.add("group");

                        //Edittext: Width
                        var grpWidthText = grpWidth.add("statictext", undefined, "Width:  ");
                        var grpWidthNumb =  grpWidth.add("edittext", undefined, 0);
                        grpWidthNumb.characters = 9;

                        //Dropdownlist: Add PX, add %
                        var AddCanvasDocUnits = ["ADD PX", "ADD %"];
                        var grpWidthUnitsDropDown = grpWidth.add("dropdownlist", undefined, AddCanvasDocUnits);
                        grpWidthUnitsDropDown.selection = 0;

                        //Crating path to image folder
                        var scriptPath = $.fileName;
                        var scriptPathString = scriptPath.toString().replace(/\\/g, '/').slice(0, -13); // -13 is the lenght of the script file name

                        //Image: InfoHover.png
                        const imageInfHov = File(scriptPathString + "InfoHover.png");
                        var toolTipWidthImage = grpWidth.add("image", undefined, imageInfHov);

                    //Group height
                    var grpHeight = grpUnitValDlg.add("group");

                        //Edittext: Height
                        var grpHeightText = grpHeight.add("statictext", undefined, "Height: ");
                        var grpHeightNumb =  grpHeight.add("edittext", undefined, 0);
                        grpHeightNumb.characters = 9;

                        //Dropdownlist: Add PX, add %
                        grpHeightUnitDropDown = grpHeight.add("dropdownlist", undefined, AddCanvasDocUnits);
                        grpHeightUnitDropDown.selection = 0;

                        //Image: InfoHover.png
                        var toolTipHeightImage = grpHeight.add("image", undefined, imageInfHov);

                //Graphic element proportions constrains (true, false)

                    //Uplaoding constrains images next Width and Height dialog groups
                    const imageCnstrnsProportionFalse = File(scriptPathString + "ConstrPropFalse.png");
                    const imageCnstrnsProportionTrue = File(scriptPathString + "ConstrPropTrue.png");

                    //Add constrain image next to dialog
                    var grpDlgUnitValImage = grpUnitVal.add("image", undefined, imageCnstrnsProportionFalse);
                    grpDlgUnitValImage.alignment = "right";

            //Anchor display
            var grpAnchorMarginesSpaceTop =  pnlAddCanvas.add("group");

            var grpAnchor = pnlAddCanvas.add("group");
            var grpAnchorTitle = grpAnchor.add("statictext", undefined, "Anchor: ");
            grpAnchorTitle.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

                //Creating anchor group box
                var grpAnchorBoxBtns = createGroup(grpAnchor, "column");

                //Creating anchor gorup lines inside box
                var grpAnchorBoxBtnsLine001 = grpAnchorBoxBtns.add("group");
                var grpAnchorBoxBtnsLine002 = grpAnchorBoxBtns.add("group");
                var grpAnchorBoxBtnsLine003 = grpAnchorBoxBtns.add("group");

                    //Image: imageAnchorTrue.png and imageAnchorFalse.png
                    const imageAnchorTrue = File(scriptPathString + "anchorPointerTrue.png");
                    const imageAnchorFalse = File(scriptPathString + "anchorPointerFalse.png");

                    //Adding 001 line of buttons
                    var anchorPositionTOPLEFT = grpAnchorBoxBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionTOPCENTER = grpAnchorBoxBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionTOPRIGHT = grpAnchorBoxBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 002 line of buttons
                    var anchorPositionMIDDLELEFT = grpAnchorBoxBtnsLine002.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionMIDDLECENTER = grpAnchorBoxBtnsLine002.add("iconbutton", undefined, imageAnchorTrue);
                    var anchorPositionMIDDLERIGHT = grpAnchorBoxBtnsLine002.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 003 line of buttons
                    var anchorPositionBOTTOMLEFT = grpAnchorBoxBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionBOTTOMCENTER = grpAnchorBoxBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionBOTTOMRIGHT = grpAnchorBoxBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);
            
            var grpAnchorMarginesSpaceBottom =  pnlAddCanvas.add("group");

            //Constrains proportions
            var constrainsProportionsCheckbox = pnlAddCanvas.add("checkbox", undefined, "Same Height and Width");

            //Canvas color extension
            var grpCanvExtendColor = pnlAddCanvas.add("group");

                var grpCanvExtendColorText = grpCanvExtendColor.add("statictext", undefined, "Canvas extension color: ");

                var canvExtendColorValues = ["Foreground", "Background", "White", "Black", "Grey", "Other..."];
                var canvExtendColorDropDwn = grpCanvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
                canvExtendColorDropDwn.selection = 1;

        ///Info UI

        
        //Creating panel to display to files
        var pnlDocInfo = createPanel(grpInfo, undefined, "left");
        
        //Number of files displayed in "Info UI"
        var numbOfDisplayedFiles = 2;

        //Creating empty lines of text to fill with files names
        var plnDocInfoLines = new Array;

        for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) {
            plnDocInfoLines[i] = pnlDocInfo.add("statictext");
            plnDocInfoLines[i].characters = 38;
        }

    ////Buttons validation UI

    //Creating button group
    var grpBtns = createGroup(grpMain, "column", undefined, [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP]);

        //Accept button
        var btnAccept = grpBtns.add("button", undefined, "Accept");
        //Cancel button
        var btnCancel = grpBtns.add("button", undefined, "Close");

//-------------------------------------------------------------------------------------------------------------------------------

    ////Buttons functionality

        ///Choose files buttons
            //Radial buttons choose files

                //Opened files in PS
                btnRadChooseFilesActiveDocs.onClick = function() {

                    //Disabled "Source folder..." button
                    btnChooseFilesSourceFold.enabled = false;
                    btnChooseFilesSourceFoldTitle.enabled = false;

                    //Disabled "Destination folder"" panel title
                    pnlDestFoldTitle.enabled = false;

                    //Disabled radButton destination folder
                    btnRadFolderSame.enabled = false;
                    btnRadFolderOther.enabled = false;

                    //Disabled "destination folder..." button            
                    btnDestFold.enabled = false;
                    btnDestFoldTitle.enabled = false;

                    //Anabled Add canvas panel
                    if (pnlAddCanvas.enabled === false) pnlAddCanvas.enabled = true;

                    infoUItoDisplay(docsOpenedNames(numbOfDisplayedFiles), documents.length, numbOfDisplayedFiles, pnlDocInfo, plnDocInfoLines);

                    checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);
                }

                //Choose source folder
                btnRadChooseFilesSourceFold.onClick = function() {

                    //Anabled "Source folder..." button
                    btnChooseFilesSourceFold.enabled = true;
                    btnChooseFilesSourceFoldTitle.enabled = true;

                    //Until there is no choosed folder you have only ability to browse source folder
                    if (btnChooseFilesSourceFoldTitle.text === "Source folder...") {
                        //Disabled "Destination folder"" panel title
                        pnlDestFoldTitle.enabled = false;

                        //Disabled radButtons destination folder
                        btnRadFolderSame.enabled = false;
                        btnRadFolderOther.enabled = false;

                        //Disabled "destination folder..." button
                        btnDestFold.enabled = false;
                        btnDestFoldTitle.enabled = false;

                        //Button accept disabled if you do not any values to Height and Width dialog
                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                        //Disabled Add canvas panel
                        pnlAddCanvas.enabled = false;

                        //Uptade info UI with files from source folder
                        infoUItoDisplay(undefined, undefined, numbOfDisplayedFiles, pnlDocInfo, plnDocInfoLines);

                        btnAccept.enabled = false;
                    
                    //When you have choosed source folder
                    } else {
                        //Anabled "Destination folder"" panel title
                        pnlDestFoldTitle.enabled = true;

                        //Anabled radButton destination folder
                        btnRadFolderSame.enabled = true;
                        btnRadFolderOther.enabled = true;

                        if (btnRadFolderOther.value == false) btnRadFolderSame.value = true;
                        else {
                            btnDestFold.enabled = true;
                            btnDestFoldTitle.enabled = true;
                        }

                        //Button seeting accept button to true
                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                        //Uptade info UI with files from source folder
                        infoUItoDisplay(globals.sourceFileNameDisplay, globals.sourceFileCounter, numbOfDisplayedFiles, pnlDocInfo, plnDocInfoLines);
                    }
                }

                //Start setting. If there is no active docs, set to choose folder
                if (app.documents.length === 0) {

                    btnRadChooseFilesActiveDocs.enabled = false;
                    btnRadChooseFilesSourceFold.notify();

                    btnRadFolderSame.value = true;
                    btnAccept.enabled = false;

                } else {

                    btnRadChooseFilesActiveDocs.notify();
                    var numbOfActiveDocuments = app.documents.length;
                   
                }

                //Browse source folder
                btnChooseFilesSourceFold.onClick = function() {

                    //Selection source folder from explorer
                    globals.sourceFolder = Folder.selectDialog("Select folder with files to process");
                    //Warning that you didn't choose any folder
                    if (globals.sourceFolder === null && btnChooseFilesSourceFoldTitle.text === "Source folder...") {
                        alert("You have not selected source folder");
                    //When you choose source folder
                    } else {
                        //Setting save option in source folder as default
                        btnRadFolderSame.value = true;

                        //Anabled choosing destination and changing values in add canvas panel
                        if (btnChooseFilesSourceFoldTitle.text !== "Source folder...") {

                            pnlDestFoldTitle.enabled = true;
                            btnRadFolderSame.enabled = true;
                            btnRadFolderOther.enabled = true;
                            
                            pnlAddCanvas.enabled = true;
                        }

                        //Creating empty of files in choosed folder
                        globals.sourceFilesPaths = [];

                        //Creating empty array of file list to open
                        globals.sourceFiles = [];

                        //Creating names to display in info UI
                        globals.sourceFileNameDisplay = new Array;

                        //Number of source files names displayed in info UI
                        globals.sourceFileCounter = 0;

                        //Filtering files to open from source folder
                        globals.sourceFiles = globals.sourceFolder.getFiles();
                        for(var i = 0; i < globals.sourceFiles.length; i++) {
                            //check to see if the target item is a file or folder
                            if(globals.sourceFiles[i] instanceof File) {
                                //Converting filename to a string
                                var sourceFilePath = globals.sourceFiles[i].toString();
                                //Checking proper files extensions
                                if(sourceFilePath.match(/.(jpg|tif|psd|bmp|gif|png)$/)) {
                                    //Storing target files paths to open and process in PS
                                    globals.sourceFilesPaths[i] = sourceFilePath;
                                    //Counting files to process
                                    globals.sourceFileCounter++;
                                }
                            }
                        }

                        //Creating files names to display in info UI
                        var sourceFolderLength = globals.sourceFolder.toString().length + 1;
                        var filesSourceToOpenCounter = 0;
                        //Adding files names to Array of sourceFileNameDisplay;
                        for (var i = 0; i < globals.sourceFilesPaths.length; i++) {
                            //Rid off of index of empty names in display
                            if ((globals.sourceFilesPaths[i] !== undefined) && (filesSourceToOpenCounter < (numbOfDisplayedFiles + 1))) {
                                // Make sure that index starts from 0
                                globals.sourceFileNameDisplay[filesSourceToOpenCounter] = globals.sourceFilesPaths[i];
                                //Calculating lenght of file name to extract from path file
                                var sourceFileNameLength = globals.sourceFileNameDisplay[filesSourceToOpenCounter].toString().length;
                                var sourceFolFileDiff = sourceFileNameLength - sourceFolderLength;
                                //Extracting name from path
                                globals.sourceFileNameDisplay[filesSourceToOpenCounter] = (globals.sourceFileNameDisplay[filesSourceToOpenCounter].toString().slice(-sourceFolFileDiff));
                                filesSourceToOpenCounter++;
                            }
                        }

                        //If you choosed folder with files
                        if (filesSourceToOpenCounter > 0) {

                            creatingPathString(btnChooseFilesSourceFoldTitle, globals.sourceFolder);

                            //Uptade info UI with files from source folder
                            infoUItoDisplay(globals.sourceFileNameDisplay, globals.sourceFileCounter, numbOfDisplayedFiles, pnlDocInfo, plnDocInfoLines);

                            //Enabling buttons
                            pnlDestFoldTitle.enabled = true;
                            btnRadFolderSame.enabled = true;
                            btnRadFolderOther.enabled = true;

                            pnlAddCanvas.enabled = true;

                            checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                            if (filesSourceToOpenCounter > 1) {
                                alert("In folder are " + globals.sourceFileCounter + " files");
                            } else {
                                alert("In folder is " + globals.sourceFileCounter + " file");
                            }

                        //If there is no files in choosed folder
                        } else {

                            alert("In choosed folder there is no files to process");

                            btnAccept.enabled = false;

                            btnChooseFilesSourceFoldTitle.text = "Source folder...";
                            btnRadFolderSame.enabled = false;
                            btnRadFolderOther.enabled = false;

                            btnDestFold.enabled = false;
                            btnDestFoldTitle.enabled = false;
                            pnlAddCanvas.enabled = false;

                            infoUItoDisplay(undefined, undefined, numbOfDisplayedFiles, pnlDocInfo, plnDocInfoLines);
                        }

                    }
                }

        ///Destination folder panel
            //Radial buttons destination folder
                //Add canvas in the same folder
                btnRadFolderSame.onClick = function() {

                    btnDestFold.enabled = false;
                    btnDestFoldTitle.enabled = false;

                    checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                    pnlAddCanvas.enabled = true;
                }
                //Copy and Add canvas in other folder
                btnRadFolderOther.onClick = function() {

                        btnDestFold.enabled = true;
                        btnDestFoldTitle.enabled = true;

                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                        if (btnDestFoldTitle.text === "Destination folder...") {
                            btnAccept.enabled = false;
                            pnlAddCanvas.enabled = false;
                        } else {
                            pnlAddCanvas.enabled = true;
                        }
                }

                //Browse destination folder
                btnDestFold.onClick = function() {
                    //Getting destination folder
                    globals.detinationFolder = Folder.selectDialog("Select target folder to save files");
                    if (globals.detinationFolder === null && btnDestFoldTitle.text === "Destination folder...") {
                        alert("You have not selected target folder");
                    }

                    
                    if (globals.detinationFolder.toString() === globals.sourceFolder.toString()) {

                        alert("Source folder and target folder are the same.\nNext time choose more wisely");
                        btnRadFolderSame.notify();
                        globals.detinationFolder = null;
                        btnDestFoldTitle.text = "Destination folder...";

                    } else {

                        creatingPathString(btnDestFoldTitle, globals.detinationFolder);

                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);
                        pnlAddCanvas.enabled = true;

                    }
                }

        ////Add canvas
            //Group dialog units value
                //Group width
                    //Setting unit to use in resizeCanvas(); unit "PX"
                    var unitOutcome = "PX";

                    checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);

                    grpWidthNumb.onChanging = function() {

                        if (constrainsProportionsCheckbox.value == true) grpHeightNumb.text = grpWidthNumb.text;                        

                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);
                    }

                    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
                    grpWidthUnitsDropDown.onChange = function() {
                        if (grpWidthUnitsDropDown.selection == 0) {grpHeightUnitDropDown.selection = 0; unitOutcome = "PX"}
                        else {grpHeightUnitDropDown.selection = 1;}
                    }

                    toolTipWidthImage.helpTip = "You can substract number by adding '-' before value";

                //Group Height
                    grpHeightNumb.onChanging = function() {

                        if (constrainsProportionsCheckbox.value == true) {
                            grpWidthNumb.text = grpHeightNumb.text;
                        }

                        checkingIfWidthAndHeightIs0(grpWidthNumb, grpHeightNumb, btnAccept);
                    }

                    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
                    grpHeightUnitDropDown.onChange = function() {
                        if (grpHeightUnitDropDown.selection == 0) {grpWidthUnitsDropDown.selection = 0; unitOutcome = "PERCENT"}
                        else {grpHeightUnitDropDown.selection = 1;}
                    }

                    toolTipHeightImage.helpTip = "You can substract number by adding '-' before value";

                //Image chains - constrains proportions tooltip
                grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"

            //Anchor display
                //creating anchor data to read in resizeCanvas(); Default anchor is in MIDDLECENTER
                var anchorPosOutcome = AnchorPosition.MIDDLECENTER;

                var anchorPositionArray = new Array;
                anchorPositionArray.push(anchorPositionTOPLEFT, anchorPositionTOPCENTER, anchorPositionTOPRIGHT, anchorPositionMIDDLELEFT, anchorPositionMIDDLECENTER, anchorPositionMIDDLERIGHT, anchorPositionBOTTOMLEFT, anchorPositionBOTTOMCENTER, anchorPositionBOTTOMRIGHT);

                //Adding functionality to buttons in anchor box
                anchorPositionTOPLEFT.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionTOPLEFT, AnchorPosition.TOPLEFT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionTOPCENTER.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionTOPCENTER, AnchorPosition.TOPCENTER, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionTOPRIGHT.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionTOPRIGHT, AnchorPosition.TOPRIGHT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}

                anchorPositionMIDDLELEFT.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionMIDDLELEFT, AnchorPosition.MIDDLELEFT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionMIDDLECENTER.onClick = function() {anchorPosOutcome =anchorSetingNew(anchorPositionMIDDLECENTER, AnchorPosition.MIDDLECENTER, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionMIDDLERIGHT.onClick = function() {anchorPosOutcome =anchorSetingNew(anchorPositionMIDDLERIGHT, AnchorPosition.MIDDLERIGHT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}

                anchorPositionBOTTOMLEFT.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionBOTTOMLEFT, AnchorPosition.BOTTOMLEFT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionBOTTOMCENTER.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionBOTTOMCENTER, AnchorPosition.BOTTOMCENTER, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}
                anchorPositionBOTTOMRIGHT.onClick = function() {anchorPosOutcome = anchorSetingNew(anchorPositionBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT, anchorPositionArray, imageAnchorTrue, imageAnchorFalse)}


                //Constrain proportions checkbox
                constrainsProportionsCheckbox.onClick = function() {
                    //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
                    if (constrainsProportionsCheckbox.value == true) {
                        grpDlgUnitValImage.image = imageCnstrnsProportionTrue;
                        grpDlgUnitValImage.helpTip = "Width and Height same value anabled"
                    } else {
                        grpDlgUnitValImage.image = imageCnstrnsProportionFalse;
                        grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"}

                        //Set the same highest value in "Height" and "Width"
                        if (constrainsProportionsCheckbox.value == true) {
                            //If Height and Width is negative or equal 0, it set in both most negative number
                            if((parseInt(grpWidthNumb.text, 10) <= 0) && (parseInt(grpHeightNumb.text, 10) <= 0)) {
                                if (parseInt(grpWidthNumb.text, 10) < parseInt(grpHeightNumb.text, 10)) {
                                    grpWidthNumb.onChanging();
                                }
                                //If some value is postive, set in both most positive number
                                else {
                                    grpHeightNumb.onChanging();
                                }
                            } else {
                                if (parseInt(grpWidthNumb.text, 10) > parseInt(grpHeightNumb.text, 10)) {
                                    grpWidthNumb.onChanging();
                                } else {
                                    grpHeightNumb.onChanging();
                                }
                            }
                        }
                }

                                //Adding tooltip to checkbox
                                constrainsProportionsCheckbox.helpTip =  "Check to constrain Height and Width"

                                //Canvas extension color
                                    ///Saving BG and FG bucket color
                                    //Foregound bucket color
                                    var bgColor = new SolidColor();
                                    bgColor.rgb.red = parseInt(app.backgroundColor.rgb.red, 10);
                                    bgColor.rgb.green = parseInt(app.backgroundColor.rgb.green, 10);
                                    bgColor.rgb.blue = parseInt(app.backgroundColor.rgb.blue, 10);

                                    //Background bucket color
                                    var fgColor = new SolidColor();
                                    fgColor.rgb.red = parseInt(app.foregroundColor.rgb.red, 10);
                                    fgColor.rgb.green = parseInt(app.foregroundColor.rgb.green, 10);
                                    fgColor.rgb.blue = parseInt(app.foregroundColor.rgb.blue, 10);

                                    //Setting bg color by dropdownlist
                                    canvExtendColorDropDwn.onChange = function() {

                                        //Choosing foreground
                                        if (canvExtendColorDropDwn.selection == 0) {
                                            app.foregroundColor = bgColor;
                                            app.backgroundColor = fgColor;
                                        }
                                        //Choosing background
                                        if (canvExtendColorDropDwn.selection == 1) {
                                            app.foregroundColor = fgColor;
                                            app.backgroundColor = bgColor;
                                        }
                                        //Choosing White
                                        if (canvExtendColorDropDwn.selection == 2) {
                                            app.backgroundColor.rgb.red = 255;
                                            app.backgroundColor.rgb.green = 255;
                                            app.backgroundColor.rgb.blue = 255;
                                        }
                                        //Choosing Black
                                        if (canvExtendColorDropDwn.selection == 3) {
                                            app.backgroundColor.rgb.red = 0;
                                            app.backgroundColor.rgb.green = 0;
                                            app.backgroundColor.rgb.blue = 0;
                                        }
                                        //Choosing Grey
                                        if (canvExtendColorDropDwn.selection == 4) {
                                            app.backgroundColor.rgb.red = 128;
                                            app.backgroundColor.rgb.green = 128;
                                            app.backgroundColor.rgb.blue = 128;
                                        }
                                        //Color picker
                                        if (canvExtendColorDropDwn.selection == 5) {
                                            showColorPicker();
                                            app.backgroundColor = app.foregroundColor;
                                            app.foregroundColor = fgColor;
                                        }
                                    }
                                ///Buttons validation UI
                                //Accept
                                btnAccept.onClick = function() {
                                    mainWindow.close();

                                    changeFileAndSave(grpWidthNumb.text, grpHeightNumb.text, unitOutcome, anchorPosOutcome, btnRadChooseFilesActiveDocs, btnRadFolderSame, fgColor, bgColor);
                                    
                                    if (btnRadChooseFilesActiveDocs.value == true) {

                                        if (numbOfActiveDocuments > 1) alert("You added canvas to " + numbOfActiveDocuments + " files");
                                        else alert("You added canvas to only 1 file");

                                    } else {

                                        var folderName = "";
                                        if (btnRadChooseFilesSourceFold.value === true) {
                                            folderName = globals.sourceFolder.name.replace(/%20/g, ' ');
                                        } else {
                                            folderName = globals.detinationFolder.name.replace(/%20/g, ' ');
                                        }

                                        alert("You added canvas to " + globals.sourceFileCounter + " files,\nin folder: " + '"' + folderName + '"'); 
                                    }
                                }
                                //Cancel
                                btnCancel.onClick = function() {
                                    mainWindow.close();
                                }

mainWindow.show();
}

function createPanel(objectParent, orientationChildren, alignChildren, alignmentObject) {
    var objectChildGroup = objectParent.add("panel");
    if (typeof orientationChildren !== "undefined") objectChildGroup.orientation = orientationChildren;
    objectChildGroup.alignChildren = alignChildren;
    objectChildGroup.alignment = alignmentObject;
    return objectChildGroup;
}

function createGroup(objectParent, orientationChildren, alignChildren, alignmentObject) {
    var objectChildGroup = objectParent.add("group");
    objectChildGroup.orientation = orientationChildren;
    objectChildGroup.alignChildren = alignChildren;
    objectChildGroup.alignment = alignmentObject;
    return objectChildGroup;
}

function creatingPathString(stringObject, Path) {

    var stringPath = Path.toString().replace(/%20/g, ' ');
    if (stringPath.length >= 30) {
        stringObject.text = "..." + stringPath.slice(-(stringObject.characters + 5));
    }
    else {
        stringObject.text = stringPath;
    }
}


//Resizng canvas unfctionality
function changeFileAndSave(addWidth, addHeight, units, anchor, btnRadChooseFilesActiveDocs, btnRadSameFolder, fgColor, bgColor){
    //If you choose radio button "Opened files"
    if (btnRadChooseFilesActiveDocs.value == true){

        while (app.documents.length > 0) {

            var doc = app.activeDocument;
            addCanvas(addWidth, addHeight, units, anchor, doc);

            doc.save();
            doc.close();
        }
    
    //If you choose  radio button "Source folder"
    } else {

        for(var i = 0; i < globals.sourceFiles.length; i++) {

            for(var i = 0; i < globals.sourceFilesPaths.length; i++) {
                if(globals.sourceFilesPaths[i] === globals.sourceFiles[i].toString()){

                    open(globals.sourceFiles[i]);

                    var doc = app.activeDocument;
                    addCanvas(addWidth, addHeight, units, anchor, doc);

                    //If you choose radio button "Add canvas in the same folder", saves the same files
                    if (btnRadSameFolder.value == true) {
                        doc.save();

                    //If you choose radio button "Copy and Add canvas to other folder", save files in other folder
                    } else {

                        //Declaring name of saved file
                        var name = doc.name;

                        //Declaring path
                        var path = globals.detinationFolder;
                        var sourceFile = globals.sourceFilesPaths[i];

                        var imageTypes = [
                            [/.png$/, savePNG],
                            [/.psd$/, savePSD],
                            [/.jpg$/, saveJPEG],
                            [/.tif$/, saveTIFF],
                            [/.bmp$/, saveBMP],
                            [/.gif$/, saveGIF],
                        ];

                        for( var j = 0 ; j < imageTypes.length; j++ ){
                            if (sourceFile.match(imageTypes[j][0])) {
                                var saveFile = File(path + "/" + name);
                                if(saveFile.exists) {
                                    saveFile.remove();
                                }
                                (imageTypes[j][1])(saveFile);
                                break;
                            }
                        }
                        if (j === imageTypes.length) {

                            throw new Error("Unhandled type for "+ sourceFile)
                        }
                    }
                    doc.close();
                }
            }
        }
    }
    //Setting background & foregound colors back to original state
    app.foregroundColor = fgColor;
    app.backgroundColor = bgColor;
}

function addCanvas(addWidth, addHeight, units, anchor, doc) {

    var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10)
    var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10)

    var sumHeight = activeDocHeight + parseInt(addHeight, 10);
    var sumWidth = activeDocWidth + parseInt(addWidth, 10);


    doc.resizeCanvas(UnitValue(sumWidth, units), UnitValue(sumHeight, units), anchor);
}

function savePNG(saveFile) {
    
    var pngFile = new File(saveFile);
    var pngSaveOptions = new PNGSaveOptions();
    activeDocument.saveAs(pngFile, pngSaveOptions);
    
}

function savePSD(saveFile) {

    var psdFile = new File(saveFile);
    var psdSaveOptions = new PhotoshopSaveOptions();

    activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}


function saveJPEG(saveFile) {

    var jpegFile = new File(saveFile);
    var jpegSaveOptions = new JPEGSaveOptions();
    jpegSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpegSaveOptions.quality = 10;

    activeDocument.saveAs(jpegFile, jpegSaveOptions, false, Extension.LOWERCASE);
}


function saveTIFF(saveFile) {

    var tiffFile = new File(saveFile);
    var tiffSaveOptions = new TiffSaveOptions();
    tiffSaveOptions.embedColorProfile = true;

    activeDocument.saveAs(tiffFile, tiffSaveOptions);
}


function saveBMP(saveFile) {

    var bmpFile = new File(saveFile);
    var bmpSaveOptions = new BMPSaveOptions();
    activeDocument.saveAs(bmpFile, bmpSaveOptions);

}

function saveGIF(saveFile) {

    var gifFile = new File(saveFile);
    var gifSaveOptions = new GIFSaveOptions();
    activeDocument.saveAs(gifFile, gifSaveOptions);

}

function checkingIfWidthAndHeightIs0(Numb001, Numb002, btnEnabled) {
    if ((Numb001.text === "0") && (Numb002.text === "0")) {
        btnEnabled.enabled = false;
    } else {
        btnEnabled.enabled = true;
    }
}

//Used later to dispaly names of opened files
function docsOpenedNames(numbOfDisplayedFiles) {
    
    //Creating array of docs to display
    var docsToPrccssNames = new Array;
    
    for (var i = 0; (i < numbOfDisplayedFiles) && (i < app.documents.length); i++) {
        docsToPrccssNames[i] = app.documents[i].name;
    }

    //Return prevDocArray to use again in chooseFilesActiveDoc.onClick
    return docsToPrccssNames;
}

function infoUItoDisplay(filesNamesInfoUI, filesNumberInfoUI, numbOfDisplayedFiles, panelInfoUITitle, panelInfoUIwriteLines) {
    
    if (typeof filesNamesInfoUI == "undefined") {
        filesNamesInfoUI = [];
        filesNumberInfoUI = 0;
    }
    
    //Creating deafult files display
    var prevDocNames = new Array;
    
    //Default empty file list
    for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) prevDocNames[i] = "";
    prevDocNames[0] = "no files to process";
    
    if (filesNamesInfoUI.length > 0) {
        //Filing default display with names of files to process 
        for (var i = 0; i < filesNamesInfoUI.length; i++) prevDocNames[i] = filesNamesInfoUI[i];
        
        //Creating "," for files names
        var signsComas = new Array;
        
        for (var i = 0; i < filesNamesInfoUI.length; i++) signsComas[i] = "";
        for (var i = 1; i < filesNamesInfoUI.length; i++) signsComas[i] = ",";
        if (filesNumberInfoUI > filesNamesInfoUI.length) signsComas[0] = ",";
        signsComas.reverse();
        
        // Adding "," to file names
        for (var i = 0; i < filesNamesInfoUI.length; i++) prevDocNames[i] = prevDocNames[i] + signsComas[i];
        
        //Creating "..." at the end of file list, if you reach limit of displayed files
        if (filesNumberInfoUI > filesNamesInfoUI.length) prevDocNames[prevDocNames.length -1] = "(...)";
    }
    
    return infoUIwriteText(prevDocNames, filesNumberInfoUI, panelInfoUITitle, panelInfoUIwriteLines);
}

function infoUIwriteText(filesNames, filesNumbers, panelInfoUITitle, panelInfoUIwriteLines) {
    //Adding created names into empty "InfoUI" list
    for (var i = 0; i < panelInfoUIwriteLines.length; i++) {
        panelInfoUIwriteLines[i].text = filesNames[i];
    }
    
    //Adding number of files to "Info UI" title panel
    panelInfoUITitle.text =  "Files to process: " + filesNumbers;
}

//Anchor button functionality
function anchorSetingNew(btnAnchorClickedOn, anchorPosition, anchorPositionArray, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPositionArray.length; i++){
        anchorPositionArray[i].image = imageAnchorFalse;
    }

     //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPosition;
}