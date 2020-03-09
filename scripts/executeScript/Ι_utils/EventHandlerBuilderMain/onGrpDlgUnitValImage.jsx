// using changeTooltipAndImageAccordingToState() from "./functions/changeTooltipAndImageAccordingToState.jsx"

EventHandlerBuilderMain.prototype.onGrpDlgUnitValImage = function() {
    var UI = this.UI;

    changeTooltipAndImageAccordingToState(UI.constrainsProportionsCheckbox, UI.groupDlgUnitValImage, UI.imageCnstrnsProportionTrue, UI.imageCnstrnsProportionFalse);
}