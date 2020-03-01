EventHandlerBuilderMain.prototype.onConstrainsProportionsCheckbox = function() {
    var UI = this.UI;

    UI.constrainsProportionsCheckbox.onClick = function() {
        //Changing image of chains next to "Height" and "Width" edittext; Adding tolltips.
        createTooltipToImage(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);

        //Set the same "highest" value in "Height" and "Width"
        if (UI.constrainsProportionsCheckbox.value === true) {

            var width = parseInt(UI.groupWidth.numb.text, 10);
            var height = parseInt(UI.groupHeight.numb.text, 10);

            var setWidthValueForBoth = function() { UI.groupWidth.numb.onChanging() };
            var setHeightValueForBoth = function() { UI.groupHeight.numb.onChanging() };

            //If Height and Width is negative or equal 0, it set in both most negative number
            if(width <= 0 && height <= 0) {

                if (width < height) {
                    setWidthValueForBoth();
                }
                //If some value is positive, set in both most positive number
                else {
                    setHeightValueForBoth();
                }
            //If all values are positive set the highest one
            } else if (width > 0 || height > 0) {

                if (width > height) {
                    setWidthValueForBoth();

                } else {
                    setHeightValueForBoth();
                }
            }
        }
    }

}