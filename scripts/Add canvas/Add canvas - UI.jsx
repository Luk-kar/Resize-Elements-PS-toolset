    ///Add canvas UI
    this.pnlChangeFile = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlChangeFile.title = this.pnlChangeFile.add("statictext", undefined, executeScript + ":");
    this.pnlChangeFile.title.graphics.font = this.pnlTitleFont;

    //Group units value
    this.grpUnitVal = this.pnlChangeFile.add("group");

        //Group dialog units value
        this.grpUnitValDlg = createGroupUI(this.grpUnitVal, "column", "left");

            //Group width
            this.grpWidth = this.grpUnitValDlg.add("group");

                //Edittext: Width
                this.grpWidth.title = this.grpWidth.add("statictext", undefined, "Width:  ");
                this.grpWidth.numb =  this.grpWidth.add("edittext", undefined, 0);
                this.grpWidth.numb.characters = 9;

                //Update also unitsTypes
                var AddCanvasDocUnits = [
                    "ADD PX", 
                    "ADD %",
                    ];
                this.grpWidth.unitsDropDown = this.grpWidth.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpWidth.unitsDropDown.selection = 0;

                //Crating tooltip
                this.grpWidth.imageTooltip = this.grpWidth.add("image", undefined, this.imageInfHov);

            //Group height
            this.grpHeight = this.grpUnitValDlg.add("group");

                //Edittext: Height
                this.grpHeight.title = this.grpHeight.add("statictext", undefined, "Height: ");
                this.grpHeight.numb =  this.grpHeight.add("edittext", undefined, 0);
                this.grpHeight.numb.characters = 9;

                //Dropdownlist: Add PX, add %
                this.grpHeight.unitDropDown = this.grpHeight.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.grpHeight.unitDropDown.selection = 0;

                //Image: InfoHover.png
                this.grpHeight.imageTooltip = this.grpHeight.add("image", undefined, this.imageInfHov);

        //Graphic element proportions constrains (true, false)

            //Add constrain image next to dialog
            this.grpDlgUnitValImage = this.grpUnitVal.add("image", undefined, this.imageCnstrnsProportionFalse);
            this.grpDlgUnitValImage.alignment = "right";

    //Constrains proportions
    this.constrainsProportionsCheckbox = this.pnlChangeFile.add("checkbox", undefined, "Same Height and Width");

    //Anchor display
    this.grpAnchorMarginesSpaceTop =  [this.pnlChangeFile.add("group", undefined, ""),
                                       this.pnlChangeFile.add("group", undefined, "")];

    this.grpAnchor = this.pnlChangeFile.add("group");
    this.grpAnchor.title = this.grpAnchor.add("statictext", undefined, "Anchor: ");
    this.grpAnchor.title.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

        //Creating anchor group box
        this.grpAnchor.boxBtns = createGroupUI(this.grpAnchor, "column");

        //Creating anchor gorup lines inside box
        this.grpAnchor.boxBtns.line001 = this.grpAnchor.boxBtns.add("group");
        this.grpAnchor.boxBtns.line002 = this.grpAnchor.boxBtns.add("group");
        this.grpAnchor.boxBtns.line003 = this.grpAnchor.boxBtns.add("group");

            //Adding 001 line of buttons
            this.anchorPositionTOPLEFT = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPCENTER = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionTOPRIGHT = this.grpAnchor.boxBtns.line001.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 002 line of buttons
            this.anchorPositionMIDDLELEFT = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionMIDDLECENTER = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorTrue);
            this.anchorPositionMIDDLERIGHT = this.grpAnchor.boxBtns.line002.add("iconbutton", undefined, this.imageAnchorFalse);

            //Adding 003 line of buttons
            this.anchorPositionBOTTOMLEFT = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMCENTER = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);
            this.anchorPositionBOTTOMRIGHT = this.grpAnchor.boxBtns.line003.add("iconbutton", undefined, this.imageAnchorFalse);

    this.grpAnchorMarginesSpaceBottom = this.pnlChangeFile.add("statictext", undefined, "");
    this.grpAnchorMarginesSpaceBottom.characters = this.panelWidth + 13;//Giving the same width as: this.plnSourceFiles, this.plnFilterFiles, this.pnlDestFold

    //Canvas color extension
    this.canvExtendColor = this.pnlChangeFile.add("group");

        this.canvExtendColor.title = this.canvExtendColor.add("statictext", undefined, "Canvas extension color: ");

        var canvExtendColorValues = ["Foreground",
                                    "Background",
                                    "White",
                                    "Black",
                                    "Grey",
                                    "Select color",
                                    "Left upper corner color"
                                    ];// conditions in onCanvExtendColorDropDwn(); Can't be part of UI object, becouse of bug in the next line

        this.canvExtendColor.dropDwn = this.canvExtendColor.add("dropdownlist", undefined, canvExtendColorValues);
        this.canvExtendColor.dropDwn.selection = 1;

        this.canvExtendColor.imageTooltip = this.canvExtendColor.add("image", undefined, this.imageInfHov);
