EventHandlerBuilderMain.prototype.onConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.onClick = function() {
        //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
        createTooltipToImage(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);

        //Set the same "highest" value in "Height" and "Width"
        if (UI.constrainsProportionsCheckbox.value === true) {
            //If Height and Width is negative or equal 0, it set in both most negative number
            if((parseInt(UI.groupWidth.numb.text, 10) <= 0) && (parseInt(UI.groupHeight.numb.text, 10) <= 0)) {
                if (parseInt(UI.groupWidth.numb.text, 10) < parseInt(UI.groupHeight.numb.text, 10)) {
                    UI.groupWidth.numb.onChanging();
                }
                //If some value is positive, set in both most positive number
                else {
                    UI.groupHeight.numb.onChanging();
                }
            //If all values are positive set the highest one
            } else if ((parseInt(UI.groupWidth.numb.text, 10) > 0) || (parseInt(UI.groupHeight.numb.text, 10) > 0)) {
                if (parseInt(UI.groupWidth.numb.text, 10) > parseInt(UI.groupHeight.numb.text, 10)) {
                    UI.groupWidth.numb.onChanging();
                } else {
                    UI.groupHeight.numb.onChanging();
                }
            }
        }
    }

}