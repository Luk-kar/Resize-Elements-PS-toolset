    ///Add canvas UI
    this.pnlChangeFile = createPanelUI(this.grpInfo, undefined, "left");

    //Title
    this.pnlChangeFile.title = this.pnlChangeFile.add("statictext", undefined, executeScript + ":");
    this.pnlChangeFile.title.characters = this.panelWidth + 13;

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

    //Canvas color extension
    this.canvResampleImage = this.pnlChangeFile.add("group");

        this.canvResampleImage.title = this.canvResampleImage.add("statictext", undefined, "Resample image: ");

        var canvResampleImageValues = ["Nearest Neighbor (preserve hard edges)",
                                    "Bilinear",
                                    "Bicubic (best for smooth gradients)",
                                    "Bicubic (best for enlargemenent)",
                                    "Bicubic (best for reduction)",
                                    "Bicubic Automatic",
                                    ];

        this.canvResampleImage.dropDwn = this.canvResampleImage.add("dropdownlist", undefined, canvResampleImageValues);
        this.canvResampleImage.dropDwn.selection = 5;
