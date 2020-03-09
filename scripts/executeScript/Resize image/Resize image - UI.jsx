/*
using from "../../main/main - functions.jsx":
- createPanelUI()
- createGroupUI()
*/

    //Code below is injected in PanelChangeFile
    ///Add canvas UI
    this.panelChangeFile = createPanelUI(this.groupInfo, undefined, "left");

    //Title
    this.panelChangeFile.title = this.panelChangeFile.add("statictext", undefined, executeScript + ":");
    this.panelChangeFile.title.characters = this.panelWidth + 1;
    this.panelChangeFile.title.graphics.font = this.panelTitleFont;

    //Group units value
    this.groupUnitVal = this.panelChangeFile.add("group");

        //Group dialog units value
        this.groupUnitValDlg = createGroupUI(this.groupUnitVal, "column", "left");

            //Group width
            this.groupWidth = this.groupUnitValDlg.add("group");

                //Edittext: Width
                this.groupWidth.title = this.groupWidth.add("statictext", undefined, "Width:  ");
                this.groupWidth.numb =  this.groupWidth.add("edittext", undefined, 0);
                this.groupWidth.numb.characters = 9;

                //Update also unitsTypes
                var AddCanvasDocUnits = [
                    "ADD PX", 
                    "ADD %",
                    ];
                this.groupWidth.unitsDropDown = this.groupWidth.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.groupWidth.unitsDropDown.selection = 0;

                //Crating tooltip
                this.groupWidth.imageTooltip = this.groupWidth.add("image", undefined, this.imageInfHov);

            //Group height
            this.groupHeight = this.groupUnitValDlg.add("group");

                //Edittext: Height
                this.groupHeight.title = this.groupHeight.add("statictext", undefined, "Height: ");
                this.groupHeight.numb =  this.groupHeight.add("edittext", undefined, 0);
                this.groupHeight.numb.characters = 9;

                //Dropdownlist: Add PX, add %
                this.groupHeight.unitDropDown = this.groupHeight.add("dropdownlist", undefined, AddCanvasDocUnits);
                this.groupHeight.unitDropDown.selection = 0;

                //Image: InfoHover.png
                this.groupHeight.imageTooltip = this.groupHeight.add("image", undefined, this.imageInfHov);

        //Graphic element proportions constrains (true, false)

            //Add constrain image next to dialog
            this.groupDlgUnitValImage = this.groupUnitVal.add("image", undefined, this.imageCnstrnsProportionFalse);
            this.groupDlgUnitValImage.alignment = "right";

    //Constrains proportions
    this.constrainsProportionsCheckbox = this.panelChangeFile.add("checkbox", undefined, "Same Height and Width");

    //Canvas color extension
    this.canvResampleImage = this.panelChangeFile.add("group");

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
