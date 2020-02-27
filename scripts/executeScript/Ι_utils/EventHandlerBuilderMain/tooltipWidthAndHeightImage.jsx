EventHandlerBuilderMain.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value.\n" +
                        "Only characters avaible are: digits: [0-9] and signs: '-', '+'.\n" + 
                        "The only accepted value inside input field is integer."

    UI.groupWidth.imageTooltip.helpTip = tooltipValue;
    UI.groupHeight.imageTooltip.helpTip = tooltipValue;
}