#target photoshop

globals = {};

main();

function main() {

    ////Creating main UI
    var startWindow = new Window("dialog", "Add canvas");
        //Creating group to populate with main UI
        var grpMain = startWindow.add("group")

    ////Info group UI
        var grpInfo = grpMain.add("group");
        grpInfo.orientation = 'column';
        grpInfo.alignChildren = "left";

            //Source files
            var plnSourceFiles = grpInfo.add("panel", undefined);
            plnSourceFiles.alignChildren = "left";

                //Source files title
                plnSourceFiles.title = plnSourceFiles.add("statictext", undefined, "Source files:");

                //Creating radial button group
                var grpBtnRadFiles = plnSourceFiles.add("group");
                grpBtnRadFiles.orientation = 'column';
                grpBtnRadFiles.alignChildren = "left";

                    //Radial button choose active/target folder
                    var btnRadChooseFilesActiveDoc = grpBtnRadFiles.add("radiobutton", undefined, "Opened files");
                    var btnRadChooseFilesSource = grpBtnRadFiles.add("radiobutton", undefined, "Choose folder");

                    //Add button choose target folder
                    var grpChooseFilesSource = plnSourceFiles.add("group");

                    var btnChooseFilesSource =  grpChooseFilesSource.add("button", undefined, "Browse...");
                    grpChooseFilesSource.title = grpChooseFilesSource.add("statictext", undefined, "Source folder...");
                    grpChooseFilesSource.title.characters = 25;

        ///Destination folder UI
        var pnlDestFold = grpInfo.add("panel", undefined);
        pnlDestFold.alignChildren = "left";

            //Title
            pnlDestFold.title = pnlDestFold.add("statictext", undefined, "Destination folder:");

            //Creating group radial button choose destination folder
            var grpBtnRadFol = pnlDestFold.add("group");
            grpBtnRadFol.orientation = 'column';
            grpBtnRadFol.alignChildren = "left";

                //Radial buttons choose destination folder
                var btnRadSameFolder = grpBtnRadFol.add("radiobutton", undefined, "Add canvas in the same folder");
                var btnRadOtherFolder = grpBtnRadFol.add("radiobutton", undefined, "Add canvas and copy files to other folder");

            //Browse button destination folder
            var grpBtnBrowse = pnlDestFold.add("group");
            var btnDestFold = grpBtnBrowse.add("button", undefined, "Browse...");
            grpBtnBrowse.text = grpBtnBrowse.add("statictext", undefined, "Destination folder...");
            grpBtnBrowse.text.characters = 25;

        ///Add canvas UI
        var pnlAddCanvas = grpInfo.add("panel", undefined);
        pnlAddCanvas.alignChildren = "left";

            //Title
            pnlAddCanvas.title = pnlAddCanvas.add("statictext", undefined, "Add canvas");

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
                        grpWidth.text = grpWidth.add("statictext", undefined, "Width:  ");
                        grpWidth.numb =  grpWidth.add("edittext", undefined, 0);
                        grpWidth.numb.characters = 9;

                        //Dropdownlist: Add PX, add %
                        var ResDocUnits = ["ADD PX", "ADD %"];
                        grpWidth.unitDropDwn = grpWidth.add("dropdownlist", undefined, ResDocUnits);
                        grpWidth.unitDropDwn.selection = 0;

                        //Crating path to image folder
                        var scriptPath = $.fileName;
                        var scriptPathString = scriptPath.toString().replace(/\\/g, '/').slice(0, -13); // -13 is the lenght of the script file

                        //Image: InfoHover.png
                        const imageInfHov = File(scriptPathString + "InfoHover.png");
                        grpWidth.image = grpWidth.add("image", undefined, imageInfHov);

                    //Group height
                    var grpHeight = grpUnitValDlg.add("group");

                        //Edittext: Height
                        grpHeight.text = grpHeight.add("statictext", undefined, "Height: ");
                        grpHeight.numb =  grpHeight.add("edittext", undefined, 0);
                        grpHeight.numb.characters = 9;

                        //Dropdownlist: Add PX, add %
                        grpHeight.unitDropDwn = grpHeight.add("dropdownlist", undefined, ResDocUnits);
                        grpHeight.unitDropDwn.selection = 0;

                        //Image: InfoHover.png
                        grpHeight.image = grpHeight.add("image", undefined, imageInfHov);

                //Graphic element proportions constrains (true, false)

                //Uplaoding constrains images
                const imageCnstrPrpFalse = File(scriptPathString + "ConstrPropFalse.png");
                const imageCnstrPrpTrue = File(scriptPathString + "ConstrPropTrue.png");

                //Add constrain image next to dialog
                var grpDlgUnitValImage = grpUnitVal.add("image", undefined, imageCnstrPrpFalse);
                grpDlgUnitValImage.alignment = "right";

            //Anchor display

            var grpAnchor = pnlAddCanvas.add("group");
            grpAnchor.text = grpAnchor.add("statictext", undefined, "Anchor: ");

                //Creating anchor group box
                var grpAnchorSquare = grpAnchor.add("group");
                grpAnchorSquare.orientation = 'column';

                //Creating anchor gorup lines inside box
                grpAnchorSquare.line001 = grpAnchorSquare.add("group");
                grpAnchorSquare.line002 = grpAnchorSquare.add("group");
                grpAnchorSquare.line003 = grpAnchorSquare.add("group");

                    //Image: imageAnchorTrue.png and imageAnchorFalse.png
                    const imageAnchorTrue = File(scriptPathString + "anchorPointerTrue.png");
                    const imageAnchorFalse = File(scriptPathString + "anchorPointerFalse.png");

                    //Adding 001 line of buttons
                    var anchorPosTOPLEFT = grpAnchorSquare.line001.add("iconbutton", undefined, imageAnchorFalse, "name: anchorPosTOPLEFT");
                    var anchorPosTOPCENTER = grpAnchorSquare.line001.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPosTOPRIGHT = grpAnchorSquare.line001.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 002 line of buttons
                    var anchorPosMIDDLELEFT = grpAnchorSquare.line002.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPosMIDDLECENTER = grpAnchorSquare.line002.add("iconbutton", undefined, imageAnchorTrue);
                    var anchorPosMIDDLERIGHT = grpAnchorSquare.line002.add("iconbutton", undefined, imageAnchorFalse);

                    //Adding 003 line of buttons
                    var anchorPosBOTTOMLEFT = grpAnchorSquare.line003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPosBOTTOMCENTER = grpAnchorSquare.line003.add("iconbutton", undefined, imageAnchorFalse);
                    var anchorPosBOTTOMRIGHT = grpAnchorSquare.line003.add("iconbutton", undefined, imageAnchorFalse);

            //Constrains proportions
            var constrainsProportions = pnlAddCanvas.add("checkbox", undefined, "Same Height and Width");

            //Canvas color extension
            var grpCanvExtendColor = pnlAddCanvas.add("group");

                grpCanvExtendColor.text = grpCanvExtendColor.add("statictext", undefined, "Canvas extension color: ");

                var canvExtendColorValues = ["Foreground", "Background", "White", "Black", "Grey", "Other..."];
                var canvExtendColorDropDwn = grpCanvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
                canvExtendColorDropDwn.selection = 1;

        ///Info UI

            //Number of files displayed in "Info UI"
            var numbOfDisplayedFiles = 2;

            //Creating and storing array of files opened in PS
            if (app.documents.length > 0) {
                globals.openedFilesInfo = docsOpenedNames(numbOfDisplayedFiles);
            } else {
                globals.openedFilesInfo = new Array;
                //Number of files to process
                globals.openedFilesInfo[0] = 0;
                //Names of files to display
                globals.openedFilesInfo[1] = "";
            }

            //Text to populate info UI
            var prevDoclinesOpened = infoUItoText(globals.openedFilesInfo, numbOfDisplayedFiles);
            var docsOpenedCounter = prevDoclinesOpened[0];

            //Creating panel title "[number of displayed files] of [number of opened in PS files] files"
            var pnlDocInfoTitle = ("Files to process: " + docsOpenedCounter).toString();

            //Creating panel with displayed files
            var pnlDocInfo = grpInfo.add("panel", undefined, pnlDocInfoTitle);

                //Creating text with displayed files
                pnlDocInfo.line001 = pnlDocInfo.add("statictext", undefined, prevDoclinesOpened[1]);
                pnlDocInfo.line002 = pnlDocInfo.add("statictext", undefined, prevDoclinesOpened[2]);
                pnlDocInfo.line003 = pnlDocInfo.add("statictext", undefined, prevDoclinesOpened[3]);

                pnlDocInfo.line001.characters = 38;
                pnlDocInfo.line002.characters = 38;
                pnlDocInfo.line003.characters = 38;

                pnlDocInfo.line001.alignment = "left";
                pnlDocInfo.line002.alignment = "left";
                pnlDocInfo.line003.alignment = "left";

    ////Buttons validation UI

    //Creating button group
    var grpBtns = grpMain.add("group");
    grpBtns.orientation = 'column';
    grpBtns.alignment = [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP]

        //Accept button
        var btnAccept = grpBtns.add("button", undefined, "Accept");
        //Cancel button
        var btnCancel = grpBtns.add("button", undefined, "Close");

//-------------------------------------------------------------------------------------------------------------------------------

    ////Buttons functionality

        ///Choose files buttons
            //Radial buttons choose files

                //Opened files in PS
                btnRadChooseFilesActiveDoc.onClick = function() {

                    //Refreshing info UI with active documents names
                    docsToPrccssNames = globals.openedFilesInfo;

                    //Disabled "Source folder..." button
                    btnChooseFilesSource.enabled = false;
                    grpChooseFilesSource.title.enabled = false;

                    //Disabled "Destination folder"" panel title
                    pnlDestFold.title.enabled = false;

                    //Disabled radButton destination folder
                    btnRadSameFolder.enabled = false;
                    btnRadOtherFolder.enabled = false;

                    //Disabled "destination folder..." button
                    btnDestFold.enabled = false;
                    grpBtnBrowse.text.enabled = false;

                    //Anabled Add canvas panel
                    if (pnlAddCanvas.enabled === false) {
                        pnlAddCanvas.enabled = true;
                    }

                    infoUIDisplay(prevDoclinesOpened);

                    checkingIfWidthAndHeightIs0();
                }

                //Choose source folder
                btnRadChooseFilesSource.onClick = function() {

                    //Anabled "Source folder..." button
                    btnChooseFilesSource.enabled = true;
                    grpChooseFilesSource.title.enabled = true;

                    //Unitl there is no choosed folder you have only ability to browse for source folder
                    if (grpChooseFilesSource.title.text === "Source folder...") {
                        //Disabled "Destination folder"" panel title
                        pnlDestFold.title.enabled = false;

                        //Disabled radButton destination folder
                        btnRadSameFolder.enabled = false;
                        btnRadOtherFolder.enabled = false;

                        //Disabled "destination folder..." button
                        btnDestFold.enabled = false;
                        grpBtnBrowse.text.enabled = false;

                        //Button accept disabled if you do not change canvas
                        if ((grpHeight.numb.text === "0") && (grpWidth.numb.text === "0")) {
                            btnAccept.enabled = true;
                        } else {
                            btnAccept.enabled = false;
                        }

                        //Disabled Add canvas panel
                        if((grpChooseFilesSource.title.text === "Source folder...") || grpBtnBrowse.text.text === "Destination folder...") {
                            pnlAddCanvas.enabled = false;
                        } else {
                            pnlAddCanvas.enabled = true;
                        }

                        infoUIDisplay([0, "no files to process", "", ""]);

                        btnAccept.enabled = false;

                    } else {
                        //Anabled "Destination folder"" panel title
                        pnlDestFold.title.enabled = true;

                        //Anabled radButton destination folder
                        btnRadSameFolder.enabled = true;
                        btnRadOtherFolder.enabled = true;

                        //Set radio button "Add canvas in the same folder" to true if "Copy file and add canvas to the other folder" is not checked
                        if (btnRadOtherFolder.value == false) {
                            btnRadSameFolder.value = true;
                        }
                        //Button seeting accept button to true
                        if(checkingIfWidthAndHeightIs0()) btnAccept.enabled = true;

                        //Refresh of names files in "Info UI"
                        infoUIDisplay(globals.prevDoclinesSource);
                    }
                }

                //Start setting. If there is no active docs, set choose
                if (app.documents.length === 0) {
                    btnRadChooseFilesActiveDoc.enabled = false;
                    btnRadChooseFilesSource.value = true;
                    btnRadChooseFilesSource.onClick();
                    btnRadSameFolder.value = true;
                    btnAccept.enabled = false;
                } else {
                    btnRadChooseFilesActiveDoc.value = true;
                    btnRadChooseFilesActiveDoc.onClick();
                }

                //Browse source folder
                btnChooseFilesSource.onClick = function() {

                    //Selection source folder explorer
                    globals.sourceFolder = Folder.selectDialog("Select folder with files to process");
                    //Warning that you didn't choose any folder
                    if (globals.sourceFolder === null && grpChooseFilesSource.title.text === "Source folder...") {
                        alert("You have not selected source folder");
                    } else {
                        //Setting source folder as default
                        btnRadSameFolder.value = true;
                        //Enabled accept button
                        if ((grpHeight.numb.text === "0") && (grpWidth.numb.text === "0")) btnAccept.enabled = true;

                        //Anabled choosing destination
                        if (grpChooseFilesSource.title.text !== "Source folder...") {
                            //Anabled "destination folder"" panel title
                            pnlDestFold.title.enabled = true;

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
                        var sourceFileNameDisplay = new Array;

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
                                sourceFileNameDisplay[filesSourceToOpenCounter] = globals.sourceFilesPaths[i];
                                //Calculating lenght of file name to extract from path file
                                var sourceFileNameLength = sourceFileNameDisplay[filesSourceToOpenCounter].toString().length;
                                var sourceFolFileDiff = sourceFileNameLength - sourceFolderLength;
                                //Extracting name from path
                                sourceFileNameDisplay[filesSourceToOpenCounter] = (sourceFileNameDisplay[filesSourceToOpenCounter].toString().slice(-sourceFolFileDiff));
                                filesSourceToOpenCounter++;
                            }
                        }

                        //Setting name string into statictext next to button target folder
                        if (filesSourceToOpenCounter > 0) {
                            var newTitle = (".../" + globals.sourceFolder.parent.name + "/" + globals.sourceFolder.name).replace(/%20/g, ' ');
                            grpChooseFilesSource.title.text = newTitle;

                            //Storing text to use again if you change btnrad to Opened Files
                            globals.prevDoclinesSource = infoUItoText([globals.sourceFileCounter, sourceFileNameDisplay], numbOfDisplayedFiles);

                            //Update of names files
                            infoUIDisplay(globals.prevDoclinesSource);

                            //Enabled button accept
                            btnAccept.enabled = true;
                            pnlDestFold.title.enabled = true;
                            btnRadSameFolder.enabled = true;
                            btnRadOtherFolder.enabled = true;
                            pnlAddCanvas.enabled = true;
                            checkingIfWidthAndHeightIs0();

                        } else {
                            alert("In choosed folder there is 0 files to process");
                            btnAccept.enabled = false;
                            //Setting to dafault value becouse ou didn't choose what you want to
                            grpChooseFilesSource.title.text = "Source folder...";
                            btnAccept.enabled = false;
                            btnRadSameFolder.enabled = false;
                            btnRadOtherFolder.enabled = false;
                            btnDestFold.enabled = false;
                            grpBtnBrowse.text.enabled = false;
                            pnlAddCanvas.enabled = false;

                            infoUIDisplay([0, "no files to process", "", ""]);
                        }

                        if (globals.sourceFileCounter > 1) {
                            alert("In folder are " + globals.sourceFileCounter + " files");
                        } else {
                            alert("In folder is " + globals.sourceFileCounter + " file");
                        }
                    }
                }

        ///Destination folder
            //Radial buttons destination folder
                //Add canvas in the same folder
                btnRadSameFolder.onClick = function() {
                    //Disables to browse destination folder
                    btnDestFold.enabled = false;
                    grpBtnBrowse.text.enabled = false;
                    //Enables accept button
                    if ((grpHeight.numb.text !== "0") || (grpWidth.numb.text !== "0")) btnAccept.enabled = true;
                    //Enables Add Canvas panel
                    pnlAddCanvas.enabled = true;
                }
                //Copy and Add canvas in other folder
                btnRadOtherFolder.onClick = function() {
                        //Enables to browse destination folder
                        btnDestFold.enabled = true;
                        grpBtnBrowse.text.enabled = true;
                        //Enables accept button
                        if ((grpHeight.numb.text !== "0") || (grpWidth.numb.text !== "0")) btnAccept.enabled = true;
                        //Disable Accept button if there is not choosed destination folder
                        if (grpBtnBrowse.text.text === "Destination folder...") {
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
                    if (globals.detinationFolder === null && grpBtnBrowse.text.text === "Destination folder...") {
                        alert("You have not selected target folder");
                    }
                    //Setting destination folder name
                    grpBtnBrowse.text.text = globals.detinationFolder.toString();
                    if (globals.detinationFolder.toString() === globals.sourceFolder.toString()) {
                        alert("Source folder and target folder are the same.\nNext time choose more wisely");
                        btnRadSameFolder.notify();
                        globals.detinationFolder = null;
                        grpBtnBrowse.text.text = "Destination folder...";
                        return;
                    }
                    if (grpBtnBrowse.text.text !== "Destination folder...") {
                        //Enables accept button
                        if ((grpHeight.numb.text !== "0") || (grpWidth.numb.text !== "0")) btnAccept.enabled = true;
                        //Enables Add canvas panel
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
                    grpWidth.numb.onChanging = function() {
                        //Removing all non-numeric characters
                        //grpWidth.numb.text = grpWidth.numb.text.replace(/\D/g,'')
                        if (constrainsProportions.value == true){
                            grpHeight.numb.text = grpWidth.numb.text;
                        }
                        //Disabled accept button if Width or Height is equal 0
                        checkingIfWidthAndHeightIs0();
                    }

                    //Dropdownlist: Add PX, add %; Setting the same units if constrains proportions is checked; setting units to PX
                    grpWidth.unitDropDwn.onChange = function() {
                        if (grpWidth.unitDropDwn.selection == 0) {grpHeight.unitDropDwn.selection = 0; unitOutcome = "PX"}
                        else {grpHeight.unitDropDwn.selection = 1;}
                    }
                    //Image: InfoHover.png; setting tooltip
                    grpWidth.image.helpTip = "You can substract number by adding '-' before value";
                //Group Height
                    //Edittext: Height; if "constrains proportion" is checked, Heigth and Width values are changed in the same time
                    grpHeight.numb.onChanging = function() {
                        //Removing all non-numeric characters
                        //grpHeight.numb.text = grpHeight.numb.text.replace(/\D/g,'')
                        if (constrainsProportions.value == true) {
                            grpWidth.numb.text = grpHeight.numb.text;
                        }
                        //Disabled accept button if Width or Height is equal 0
                        checkingIfWidthAndHeightIs0();
                    }
                    //Dropdownlist: Add PX, add %; Setting the same units if constrains proportions is checked setting units to PERCENT
                    grpHeight.unitDropDwn.onChange = function() {
                        if (grpHeight.unitDropDwn.selection == 0) {grpWidth.unitDropDwn.selection = 0; unitOutcome = "PERCENT"}
                        else {grpWidth.unitDropDwn.selection = 1;}
                    }
                    //Image: InfoHover.png; setting tooltip
                    grpHeight.image.helpTip = "You can substract number by adding '-' before value";

                //Image chains - constrains proportions tooltip
                grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"

            //Anchor display
                //creating anchor data to read in resizeCanvas(); Default anchor is in MIDDLECENTER
                var anchorPosOutcome = AnchorPosition.MIDDLECENTER;

                //Adding functionality to buttons in anchor box
                anchorPosTOPLEFT.onClick = function() {anchorSetingNew(anchorPosTOPLEFT, AnchorPosition.TOPLEFT)}
                anchorPosTOPCENTER.onClick = function() {anchorSetingNew(anchorPosTOPCENTER, AnchorPosition.TOPCENTER)}
                anchorPosTOPRIGHT.onClick = function() {anchorSetingNew(anchorPosTOPRIGHT, AnchorPosition.TOPRIGHT)}

                anchorPosMIDDLELEFT.onClick = function() {anchorSetingNew(anchorPosMIDDLELEFT, AnchorPosition.MIDDLELEFT)}
                anchorPosMIDDLECENTER.onClick = function() {anchorSetingNew(anchorPosMIDDLECENTER, AnchorPosition.MIDDLECENTER)}
                anchorPosMIDDLERIGHT.onClick = function() {anchorSetingNew(anchorPosMIDDLERIGHT, AnchorPosition.MIDDLERIGHT)}

                anchorPosBOTTOMLEFT.onClick = function() {anchorSetingNew(anchorPosBOTTOMLEFT, AnchorPosition.BOTTOMLEFT)}
                anchorPosBOTTOMCENTER.onClick = function() {anchorSetingNew(anchorPosBOTTOMCENTER, AnchorPosition.BOTTOMCENTER)}
                anchorPosBOTTOMRIGHT.onClick = function() {anchorSetingNew(anchorPosBOTTOMRIGHT, AnchorPosition.BOTTOMRIGHT)}


                //Constrain proportions checkbox
                constrainsProportions.onClick = function() {
                    //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
                    if (constrainsProportions.value == true) {
                        grpDlgUnitValImage.image = imageCnstrPrpTrue;
                        grpDlgUnitValImage.helpTip = "Width and Height same value anabled"}
                        else {
                            grpDlgUnitValImage.image = imageCnstrPrpFalse;
                            grpDlgUnitValImage.helpTip = "Width and Height diffrent value anabled"}

                            //Set the same heighest value in "Height" and "Width"
                            if (constrainsProportions.value == true) {
                                //If Height and Width is negative or equal 0, it set in both most negative number
                                if((parseInt(grpWidth.numb.text, 10) <= 0) && (parseInt(grpHeight.numb.text, 10) <= 0)) {
                                    if (parseInt(grpWidth.numb.text, 10) < parseInt(grpHeight.numb.text, 10)) {
                                        grpWidth.numb.onChanging();
                                    }
                                    //If some value is postive, set in both most positive number
                                    else {grpHeight.numb.onChanging();}
                                } else {
                                    if (parseInt(grpWidth.numb.text, 10) > parseInt(grpHeight.numb.text, 10)) {
                                        grpWidth.numb.onChanging();}
                                        else {
                                            grpHeight.numb.onChanging();}
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
                                    startWindow.close();
                                    changeFileAndSave(grpWidth.numb.text, grpHeight.numb.text, unitOutcome, anchorPosOutcome);
                                    if (btnRadChooseFilesActiveDoc.value == true) {
                                        alert("You added canvas to " + docsOpenedCounter + " files");
                                    } else {
                                        alert("You added canvas to " + globals.sourceFileCounter + " files");
                                    }
                                }
                                //Cancel
                                btnCancel.onClick = function() {
                                    startWindow.close();
                                }


//-------------------------------------------------------------------------------------------------------------------------------

    //Resizng canvas unfctionality
    function changeFileAndSave(addWidth, addHeight, units, anchor){
        //If you choose radio button "Opened files"
        if (btnRadChooseFilesActiveDoc.value == true){

            while (app.documents.length > 0) {

                var doc = app.activeDocument;
                addCanvas(addWidth, addHeight, units, anchor, doc);

                doc.save();
                doc.close();
            }
        }

        //If you choose radio button "Choose folder"
        if (btnRadChooseFilesSource.value == true) {

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
             anchorPosTOPLEFT, anchorPosTOPCENTER, anchorPosTOPRIGHT,
            anchorPosMIDDLELEFT, anchorPosMIDDLECENTER, anchorPosMIDDLERIGHT,
            anchorPosBOTTOMLEFT, anchorPosBOTTOMCENTER, anchorPosBOTTOMRIGHT
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
    function docsOpenedNames(displayedFiles) {

            //Counter of active docs
            var docsOpenedCounter = app.documents.length;

            //Creating array of docs to display
            var docsToPrccssNames = new Array;

            var infoUICounter = 0;
            for (var i = 0; i < app.documents.length; i++) {
                infoUICounter++;
                if (infoUICounter <= (displayedFiles + 1)){
                    docsToPrccssNames[i] = app.documents[i].name;
                }
            }

            //Adding condition if there no docs to display
            if (docsToPrccssNames.length === 0) {docsToPrccssNames = "";}

            //Return prevDocArray to use again in chooseFilesActiveDoc.onClick
            return [docsOpenedCounter, docsToPrccssNames];
    }

    //Text to disaplay in panel info
    function infoUItoText(filesInfo, numbOfDisplayedFiles){
        //Creating counter of files to process
        var docsToPrccssCounter = filesInfo[0];
        //Creating array of files to display
        var docsToPrccssNames = filesInfo[1];

        //Creating deafult files display
        var prevDocName = new Array;
        for (var i = 0; i < (numbOfDisplayedFiles + 1); i++) {
            prevDocName[i] = "";
        }
        prevDocName[0] = "no files to process";

        //Filing deafult files display with files names
        for (var i = 0; i < docsToPrccssNames.length; i++) {
            prevDocName[i] = docsToPrccssNames[i];
        }

        //Creating "," for files names
        var signsComas = new Array;
        for (var i = 0; i < numbOfDisplayedFiles; i++) {
            signsComas[i] = "";
        }
        for (var i = 1; i < docsToPrccssNames.length; i++) {
            signsComas[i] = ",";
        }
        signsComas.reverse();

        // Adding "," to file names
        var prevDocline001 = prevDocName[0] + signsComas[0];
        var prevDocline002 = prevDocName[1] + signsComas[1];
        var prevDocline003 = prevDocName[2];

        //Creating "..." at the end of file list, if you reach limit of displayed files
        if(docsToPrccssNames.length === (numbOfDisplayedFiles + 1)) prevDocline003 = "(...)"

        var prevDoclines = [docsToPrccssCounter, prevDocline001, prevDocline002, prevDocline003];
        return prevDoclines;
    }

    function checkingIfWidthAndHeightIs0() {
        if ((grpHeight.numb.text === "0") && (grpWidth.numb.text === "0")) {
            btnAccept.enabled = false;
        } else {
            btnAccept.enabled = true;
        }
    }

    function infoUIDisplay(prevDoclines) {

        var pnlDocInfoTitle = ("Files to process: " + prevDoclines[0]).toString();

        pnlDocInfo.text = pnlDocInfoTitle;

        pnlDocInfo.line001.text = prevDoclines[1];
        pnlDocInfo.line002.text = prevDoclines[2];
        pnlDocInfo.line003.text = prevDoclines[3];

    }

    startWindow.show();
}
