#target photoshop

globals = {};

main();

function main() {

    ////Creating main UI
    var mainWindow = new Window("dialog", "Add canvas");
        //Creating group to populate with main UI
        var grpMain = mainWindow.add("group")

        var grpInfo = createGroupUI(grpMain);

            //Source files
            var plnSourceFiles = grpInfo.add("panel", undefined);
            plnSourceFiles.alignChildren = "left";

                //Source files title
                var plnSourceFilesTitle = plnSourceFiles.add("statictext", undefined, "Source files:");

                //Creating radial button group
                var grpBtnRadSourceFiles = plnSourceFiles.add("group");
                grpBtnRadSourceFiles.orientation = 'column';
                grpBtnRadSourceFiles.alignChildren = "left";

                    //Radial button choose active/target folder
                    var btnRadChooseFilesActiveDocs = grpBtnRadSourceFiles.add("radiobutton", undefined, "Opened files");
                    var btnRadChooseFilesSourceFold = grpBtnRadSourceFiles.add("radiobutton", undefined, "Choose folder");

                    //Add button choose target folder
                    var grpBtnChooseFilesSourceFold = plnSourceFiles.add("group");

                    var btnChooseFilesSourceFold =  grpBtnChooseFilesSourceFold.add("button", undefined, "Browse...");
                    var btnChooseFilesSourceFoldTitle = grpBtnChooseFilesSourceFold.add("statictext", undefined, "Source folder...");
                    btnChooseFilesSourceFoldTitle.characters = 25;

        ///Destination folder UI
        var pnlDestFold = grpInfo.add("panel", undefined);
        pnlDestFold.alignChildren = "left";

            //Title
            var pnlDestFoldTitle = pnlDestFold.add("statictext", undefined, "Destination folder:");

            //Creating group radial button choose destination folder
            var grpBtnRadFolder = pnlDestFold.add("group");
            grpBtnRadFolder.orientation = 'column';
            grpBtnRadFolder.alignChildren = "left";

                //Radial buttons choose destination folder
                var btnRadSameFolder = grpBtnRadFolder.add("radiobutton", undefined, "Add canvas in the same folder");
                var btnRadOtherFolder = grpBtnRadFolder.add("radiobutton", undefined, "Add canvas and copy files to other folder");

            //Browse button destination folder
            var grpBtnDestFold = pnlDestFold.add("group");
            var btnDestFold = grpBtnDestFold.add("button", undefined, "Browse...");
            var btnDestFoldText = grpBtnDestFold.add("statictext", undefined, "Destination folder...");
            btnDestFoldText.characters = 25;

        ///Add canvas UI
        var pnlAddCanvas = grpInfo.add("panel", undefined);
        pnlAddCanvas.alignChildren = "left";

            //Title
            var pnlAddCanvasTitle = pnlAddCanvas.add("statictext", undefined, "Add canvas");

            //Group units value
            var grpUnitVal = pnlAddCanvas.add("group");
            //grpUnitVal.alignment = "left";

                //Group dialog units value
                grpUnitValDlg = grpUnitVal.add("group");
                grpUnitValDlg.alignChildren = "left";
                grpUnitValDlg.orientation = 'column';

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
                        var scriptPathString = scriptPath.toString().replace(/\\/g, '/').slice(0, -13); // -13 is the lenght of the script file

                        //Image: InfoHover.png
                        const imageInfHov = File(scriptPathString + "InfoHover.png");
                        var grpWidthImage = grpWidth.add("image", undefined, imageInfHov);

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
                        var grpHeightImage = grpHeight.add("image", undefined, imageInfHov);

                //Graphic element proportions constrains (true, false)

                //Uplaoding constrains images
                const imageCnstrnsProportionFalse = File(scriptPathString + "ConstrPropFalse.png");
                const imageCnstrnsProportionTrue = File(scriptPathString + "ConstrPropTrue.png");

                //Add constrain image next to dialog
                var grpDlgUnitValImage = grpUnitVal.add("image", undefined, imageCnstrnsProportionFalse);
                grpDlgUnitValImage.alignment = "right";

            //Anchor display

            var grpAnchor = pnlAddCanvas.add("group");
            var grpAnchorText = grpAnchor.add("statictext", undefined, "Anchor: ");

                //Creating anchor group box
                var grpAnchorSquareBtns = grpAnchor.add("group");
                grpAnchorSquareBtns.orientation = 'column';

                //Creating anchor gorup lines inside box
                var grpAnchorSquareBtnsLine001 = grpAnchorSquareBtns.add("group");
                var grpAnchorSquareBtnsLine002 = grpAnchorSquareBtns.add("group");
                var grpAnchorSquareBtnsLine003 = grpAnchorSquareBtns.add("group");

                    //Image: imageAnchorTrue.png and imageAnchorFalse.png
                    const imageAnchorTrue = File(scriptPathString + "anchorPointerTrue.png");
                    const imageAnchorFalse = File(scriptPathString + "anchorPointerFalse.png");

                    //Adding 001 line of buttons
                    var anchorPositionTOPLEFT = grpAnchorSquareBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionTOPCENTER = grpAnchorSquareBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionTOPRIGHT = grpAnchorSquareBtnsLine001.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 002 line of buttons
                    var anchorPositionMIDDLELEFT = grpAnchorSquareBtnsLine002.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionMIDDLECENTER = grpAnchorSquareBtnsLine002.add("iconbutton", undefined, imageAnchorTrue);
                    var anchorPositionMIDDLERIGHT = grpAnchorSquareBtnsLine002.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 003 line of buttons
                    var anchorPositionBOTTOMLEFT = grpAnchorSquareBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionBOTTOMCENTER = grpAnchorSquareBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPositionBOTTOMRIGHT = grpAnchorSquareBtnsLine003.add("iconbutton", undefined, imageAnchorFalse);

            //Constrains proportions
            var constrainsProportions = pnlAddCanvas.add("checkbox", undefined, "Same Height and Width");

            //Canvas color extension
            var grpCanvExtendColor = pnlAddCanvas.add("group");

                var grpCanvExtendColorText = grpCanvExtendColor.add("statictext", undefined, "Canvas extension color: ");

                var canvExtendColorValues = ["Foreground", "Background", "White", "Black", "Grey", "Other..."];
                var canvExtendColorDropDwn = grpCanvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
                canvExtendColorDropDwn.selection = 1;

        ///Info UI

            //Number of files displayed in "Info UI"
            var numbOfDisplayedFiles = 2;

            //Creating panel to display to files
            var pnlDocInfo = grpInfo.add("panel", undefined, undefined);
            pnlDocInfo.alignChildren = "left";
            
            //Creating empty lines of text to poulate later
            var plnDocInfoLines = new Array;

            for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) {
                plnDocInfoLines[i] = pnlDocInfo.add("statictext", undefined, undefined);
                plnDocInfoLines[i].characters = 38;
            }

    ////Buttons validation UI

    //Creating button group
    var grpBtns = grpMain.add("group");
    grpBtns.alignment = [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP];
    grpBtns.orientation = 'column';

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
                    btnRadSameFolder.enabled = false;
                    btnRadOtherFolder.enabled = false;

                    //Disabled "destination folder..." button            
                    btnDestFold.enabled = false;
                    btnDestFoldText.enabled = false;

                    //Anabled Add canvas panel
                    if (pnlAddCanvas.enabled === false) pnlAddCanvas.enabled = true;

                    infoUItoDisplay(docsOpenedNames(numbOfDisplayedFiles), documents.length, numbOfDisplayedFiles);

                    checkingIfWidthAndHeightIs0();
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

                        //Disabled radButton destination folder
                        btnRadSameFolder.enabled = false;
                        btnRadOtherFolder.enabled = false;

                        //Disabled "destination folder..." button
                        btnDestFold.enabled = false;
                        btnDestFoldText.enabled = false;

                        //Button accept disabled if you do not change canvas
                        checkingIfWidthAndHeightIs0();

                        //Disabled Add canvas panel
                        pnlAddCanvas.enabled = false;

                        //Uptade info UI with files from source folder
                        infoUItoDisplay(undefined, undefined, numbOfDisplayedFiles);

                        btnAccept.enabled = false;

                    } else {
                        //Anabled "Destination folder"" panel title
                        pnlDestFoldTitle.enabled = true;

                        //Anabled radButton destination folder
                        btnRadSameFolder.enabled = true;
                        btnRadOtherFolder.enabled = true;

                        if (btnRadOtherFolder.value == false) btnRadSameFolder.value = true;
                        else {
                            btnDestFold.enabled = true;
                            btnDestFoldText.enabled = true;
                        }

                        //Button seeting accept button to true
                        if(checkingIfWidthAndHeightIs0()) btnAccept.enabled = true;

                        //Uptade info UI with files from source folder
                        infoUItoDisplay(globals.sourceFileNameDisplay, globals.sourceFileCounter, numbOfDisplayedFiles);
                    }
                }

                //Start setting. If there is no active docs, set choose
                if (app.documents.length === 0) {

                    btnRadChooseFilesActiveDocs.enabled = false;
                    btnRadChooseFilesSourceFold.notify();
                    btnRadSameFolder.value = true;
                    btnAccept.enabled = false;

                } else {

                    btnRadChooseFilesActiveDocs.notify();
                   
                }

                //Browse source folder
                btnChooseFilesSourceFold.onClick = function() {

                    //Selection source folder explorer
                    globals.sourceFolder = Folder.selectDialog("Select folder with files to process");
                    //Warning that you didn't choose any folder
                    if (globals.sourceFolder === null && btnChooseFilesSourceFoldTitle.text === "Source folder...") {
                        alert("You have not selected source folder");
                    } else {
                        //Setting source folder as default
                        btnRadSameFolder.value = true;

                        //Anabled choosing destination
                        if (btnChooseFilesSourceFoldTitle.text !== "Source folder...") {
                            //Anabled "destination folder"" panel title
                            pnlDestFoldTitle.enabled = true;

                            //Anabled Add canvas panel
                            pnlAddCanvas.enabled = true;

                            //Anabled radButton destination folder
                            btnRadSameFolder.enabled = true;
                            btnRadOtherFolder.enabled = true;

                        }

                        //Creating empty array of strings of files to filter docs worth to open
                        globals.sourceFilesPaths = [];

                        //Creating empty array of file list
                        globals.sourceFiles = [];

                        //Creating names to display in info UI
                        globals.sourceFileNameDisplay = new Array;

                        //Number of source files names to display in info UI
                        globals.sourceFileCounter = 0;

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

                        //Setting name string into statictext next to button target folder
                        if (filesSourceToOpenCounter > 0) {
                            var newTitle = (".../" + globals.sourceFolder.parent.name + "/" + globals.sourceFolder.name).replace(/%20/g, ' ');
                            btnChooseFilesSourceFoldTitle.text = newTitle;

                            //Uptade info UI with files from source folder
                            infoUItoDisplay(globals.sourceFileNameDisplay, globals.sourceFileCounter, numbOfDisplayedFiles);

                            //Enabled button accept
                            btnAccept.enabled = true;
                            pnlDestFoldTitle.enabled = true;
                            btnRadSameFolder.enabled = true;
                            btnRadOtherFolder.enabled = true;
                            pnlAddCanvas.enabled = true;
                            checkingIfWidthAndHeightIs0();

                            if (filesSourceToOpenCounter > 1) {
                                alert("In folder are " + globals.sourceFileCounter + " files");
                            } else {
                                alert("In folder is " + globals.sourceFileCounter + " file");
                            }

                        } else {
                            alert("In choosed folder there is no files to process");
                            btnAccept.enabled = false;
                            //Setting to dafault value becouse ou didn't choose what you want to
                            btnChooseFilesSourceFoldTitle.text = "Source folder...";
                            btnAccept.enabled = false;
                            btnRadSameFolder.enabled = false;
                            btnRadOtherFolder.enabled = false;
                            btnDestFold.enabled = false;
                            btnDestFoldText.enabled = false;
                            pnlAddCanvas.enabled = false;

                            infoUItoDisplay(undefined, undefined, numbOfDisplayedFiles);
                        }

                    }
                }

        ///Destination folder
            //Radial buttons destination folder
                //Add canvas in the same folder
                btnRadSameFolder.onClick = function() {
                    //Disables to browse destination folder
                    btnDestFold.enabled = false;
                    btnDestFoldText.enabled = false;
                    //Enables accept button
                    checkingIfWidthAndHeightIs0();
                    //Enables Add Canvas panel
                    pnlAddCanvas.enabled = true;
                }
                //Copy and Add canvas in other folder
                btnRadOtherFolder.onClick = function() {
                        //Enables to browse destination folder
                        btnDestFold.enabled = true;
                        btnDestFoldText.enabled = true;
                        //Enables accept button
                        checkingIfWidthAndHeightIs0();
                        //Disable Accept button if there is not choosed destination folder
                        if (btnDestFoldText.text === "Destination folder...") {
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
                    //Warning that you didn't choose any folder
                    if (globals.detinationFolder === null && btnDestFoldText.text === "Destination folder...") {
                        alert("You have not selected target folder");
                    }
                    //Setting destination folder name
                    btnDestFoldText.text = globals.detinationFolder.toString();
                    if (globals.detinationFolder.toString() === globals.sourceFolder.toString()) {
                        alert("Source folder and target folder are the same.\nNext time choose more wisely");
                        btnRadSameFolder.notify();
                        globals.detinationFolder = null;
                        btnDestFoldText.text = "Destination folder...";
                        return;
                    }

                    if (btnDestFoldText.text !== "Destination folder...") {
                        //Enables accept button
                        checkingIfWidthAndHeightIs0();
                        pnlAddCanvas.enabled = true;
                    }
                }

        ////Add canvas
            //Group dialog units value
                //Group width
                    //Setting unit to use in resizeCanvas(); unit "PX" as deafult becouse "opened files" is true; Setting blocade on accept becouse Width and Height is 0
                    var unitOutcome = "PX";
                    //Disabled accept button becouse Width or Height is equal 0
                    checkingIfWidthAndHeightIs0();
                    //Edittext: Width; if "constrains proportion" is checked, Heigth and Width values are changed in the same time
                    grpWidthNumb.onChanging = function() {
                        //Removing all non-numeric characters
                        if (constrainsProportions.value == true){
                            grpHeightNumb.text = grpWidthNumb.text;
                        }
                        //Disabled accept button if Width or Height is equal 0
                        checkingIfWidthAndHeightIs0();
                    }

                    //Dropdownlist: Add PX, add %; Setting the same units if constrains proportions is checked; setting units to PX
                    grpWidthUnitsDropDown.onChange = function() {
                        if (grpWidthUnitsDropDown.selection == 0) {grpHeightUnitDropDown.selection = 0; unitOutcome = "PX"}
                        else {grpHeightUnitDropDown.selection = 1;}
                    }
                    //Image: InfoHover.png; setting tooltip
                    grpWidthImage.helpTip = "You can substract number by adding '-' before value";
                //Group Height
                    //Edittext: Height; if "constrains proportion" is checked, Heigth and Width values are changed in the same time
                    grpHeightNumb.onChanging = function() {
                        //Removing all non-numeric characters
                        if (constrainsProportions.value == true) {
                            grpWidthNumb.text = grpHeightNumb.text;
                        }
                        //Disabled accept button if Width or Height is equal 0
                        checkingIfWidthAndHeightIs0();
                    }
                    //Dropdownlist: Add PX, add %; Setting the same units if constrains proportions is checked setting units to PERCENT
                    grpHeightUnitDropDown.onChange = function() {
                        if (grpHeightUnitDropDown.selection == 0) {grpWidthUnitsDropDown.selection = 0; unitOutcome = "PERCENT"}
                        else {grpHeightUnitDropDown.selection = 1;}
                    }
                    //Image: InfoHover.png; setting tooltip
                    grpHeightImage.helpTip = "You can substract number by adding '-' before value";

                //Image chains - constrains proportions tooltip
                grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"

            //Anchor display
                //creating anchor data to read in resizeCanvas(); Default anchor is in MIDDLECENTER
                var anchorPosOutcome = AnchorPosition.MIDDLECENTER;

                //Adding functionality to buttons in anchor box
                anchorPositionTOPLEFT.onClick = function() {anchorSetingNew(anchorPositionTOPLEFT, AnchorPosition.TOPLEFT)}
                anchorPositionTOPCENTER.onClick = function() {anchorSetingNew(anchorPositionTOPCENTER, AnchorPosition.TOPCENTER)}
                anchorPositionTOPRIGHT.onClick = function() {anchorSetingNew(anchorPositionTOPRIGHT, AnchorPosition.TOPRIGHT)}

                anchorPositionMIDDLELEFT.onClick = function() {anchorSetingNew(anchorPositionMIDDLELEFT, AnchorPosition.MIDDLELEFT)}
                anchorPositionMIDDLECENTER.onClick = function() {anchorSetingNew(anchorPositionMIDDLECENTER, AnchorPosition.MIDDLECENTER)}
                anchorPositionMIDDLERIGHT.onClick = function() {anchorSetingNew(anchorPositionMIDDLERIGHT, AnchorPosition.MIDDLERIGHT)}

                anchorPositionBOTTOMLEFT.onClick = function() {anchorSetingNew(anchorPositionBOTTOMLEFT, AnchorPosition.BOTTOMLEFT)}
                anchorPositionBOTTOMCENTER.onClick = function() {anchorSetingNew(anchorPositionBOTTOMCENTER, AnchorPosition.BOTTOMCENTER)}
                anchorPositionBOTTOMRIGHT.onClick = function() {anchorSetingNew(anchorPositionBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT)}


                //Constrain proportions checkbox
                constrainsProportions.onClick = function() {
                    //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
                    if (constrainsProportions.value == true) {
                        grpDlgUnitValImage.image = imageCnstrnsProportionTrue;
                        grpDlgUnitValImage.helpTip = "Width and Height same value anabled"}
                        else {
                            grpDlgUnitValImage.image = imageCnstrnsProportionFalse;
                            grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"}

                            //Set the same heighest value in "Height" and "Width"
                            if (constrainsProportions.value == true) {
                                //If Height and Width is negative or equal 0, it set in both most negative number
                                if((parseInt(grpWidthNumb.text, 10) <= 0) && (parseInt(grpHeightNumb.text, 10) <= 0)) {
                                    if (parseInt(grpWidthNumb.text, 10) < parseInt(grpHeightNumb.text, 10)) {
                                        grpWidthNumb.onChanging();
                                    }
                                    //If some value is postive, set in both most positive number
                                    else {grpHeightNumb.onChanging();}
                                } else {
                                    if (parseInt(grpWidthNumb.text, 10) > parseInt(grpHeightNumb.text, 10)) {
                                        grpWidthNumb.onChanging();}
                                        else {
                                            grpHeightNumb.onChanging();}
                                        }
                                    }
                }

                                //Adding tooltip to checkbox
                                constrainsProportions.helpTip =  "Check to constrain Height and Width"

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
                                    changeFileAndSave(grpWidthNumb.text, grpHeightNumb.text, unitOutcome, anchorPosOutcome);
                                    if (btnRadChooseFilesActiveDocs.value == true) {
                                        alert("You added canvas to " + docsOpenedCounter + " files");
                                    } else {
                                        alert("You added canvas to " + globals.sourceFileCounter + " files");
                                    }
                                }
                                //Cancel
                                btnCancel.onClick = function() {
                                    mainWindow.close();
                                }


//-------------------------------------------------------------------------------------------------------------------------------

    //Resizng canvas unfctionality
    function changeFileAndSave(addWidth, addHeight, units, anchor){
        //If you choose radio button "Opened files"
        if (btnRadChooseFilesActiveDocs.value == true){

            while (app.documents.length > 0) {

                var doc = app.activeDocument;
                addCanvas(addWidth, addHeight, units, anchor, doc);

                doc.save();
                doc.close();
            }
        }

        //If you choose radio button "Choose folder"
        if (btnRadChooseFilesSourceFold.value == true) {

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

    //Saving PSD
    function savePSD(saveFile) {

        var psdFile = new File(saveFile);
        var psdSaveOptions = new PhotoshopSaveOptions();

        activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
    }

    //Saving JPEG
    function saveJPEG(saveFile) {

        var jpegFile = new File(saveFile);
        var jpegSaveOptions = new JPEGSaveOptions();
        jpegSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
        jpegSaveOptions.quality = 10;

        activeDocument.saveAs(jpegFile, jpegSaveOptions, false, Extension.LOWERCASE);
    }

    //Saving Tiff
    function saveTIFF(saveFile) {

        var tiffFile = new File(saveFile);
        var tiffSaveOptions = new TiffSaveOptions();
        tiffSaveOptions.embedColorProfile = true;

        activeDocument.saveAs(tiffFile, tiffSaveOptions);
    }

    //Saving BMP
    function saveBMP(saveFile) {

        var bmpFile = new File(saveFile);
        var bmpSaveOptions = new BMPSaveOptions();
        activeDocument.saveAs(bmpFile, bmpSaveOptions);

    }
    //Saving GIF
    function saveGIF(saveFile) {

        var gifFile = new File(saveFile);
        var gifSaveOptions = new GIFSaveOptions();
        activeDocument.saveAs(gifFile, gifSaveOptions);

    }
    //Saving GIF
    function savePNG(saveFile) {

        var pngFile = new File(saveFile);
        var pngSaveOptions = new PNGSaveOptions();
        activeDocument.saveAs(pngFile, pngSaveOptions);

    }

    function addCanvas(addWidth, addHeight, units, anchor, doc){

        var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10)
        var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10)

        var sumHeight = activeDocHeight + parseInt(addHeight, 10);
        var sumWidth = activeDocWidth + parseInt(addWidth, 10);


        doc.resizeCanvas(UnitValue(sumWidth, units), UnitValue(sumHeight, units), anchor);
    }


    //Anchor button functionality
    function anchorSetingNew(btnAnchorClickedOn, anchorString) {
        //Reseting buttons to empty state
        var anchorArray = new Array;
         anchorArray.push(
             anchorPositionTOPLEFT, anchorPositionTOPCENTER, anchorPositionTOPRIGHT,
            anchorPositionMIDDLELEFT, anchorPositionMIDDLECENTER, anchorPositionMIDDLERIGHT,
            anchorPositionBOTTOMLEFT, anchorPositionBOTTOMCENTER, anchorPositionBOTTOMRIGHT
        )

        for (i = 0; i < anchorArray.length; i++){
            anchorArray[i].image = imageAnchorFalse;
        }

         //Setting cliked button to anchor
        btnAnchorClickedOn.image = imageAnchorTrue;

        //Sending information which anchor is marked for resizeCanvas()
        anchorPosOutcome = anchorString;
    }

    //Populating array with activeDocuments
    function docsOpenedNames(numbOfDisplayedFiles) {

        //Creating array of docs to display
        var docsToPrccssNames = new Array;

        for (var i = 0; (i < numbOfDisplayedFiles) && (i < app.documents.length); i++) {
            docsToPrccssNames[i] = app.documents[i].name;
        }

        //Return prevDocArray to use again in chooseFilesActiveDoc.onClick
        return docsToPrccssNames;
    }

    function infoUItoDisplay(filesNamesInfoUI, filesNumberInfoUI, numbOfDisplayedFiles) {

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

        return infoUIwriteText(prevDocNames, filesNumberInfoUI);
    }
    
    function infoUIwriteText(prevDocNames, filesNumberInfoUI) {
        //Adding created names into empty "InfoUI" list
        for (var i = 0; i < plnDocInfoLines.length; i++) {
        plnDocInfoLines[i].text = prevDocNames[i];
        }

        //Adding number of files to "Info UI" title panel
        pnlDocInfo.text =  "Files to process: " + filesNumberInfoUI;
    }

    function checkingIfWidthAndHeightIs0() {
        if ((grpHeightNumb.text === "0") && (grpWidthNumb.text === "0")) {
            btnAccept.enabled = false;
        } else {
            btnAccept.enabled = true;
        }
    }

    mainWindow.show();
}

function createGroupUI(grpMain) {
    var grpInfo = grpMain.add("group");
    grpInfo.orientation = 'column';
    grpInfo.alignChildren = "left";
    return grpInfo;
}

