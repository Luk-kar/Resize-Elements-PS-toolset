EventHandlerBuilderMain.prototype.tooltipWidthAndHeightImage = function() {
    var UI = this.UI;

    var tooltipValue = "You can substract number by adding '-' before value.\n" +
                        "Only characters avaible are: digits: [0-9] and sign '-'.\n" + 
                        "The only accepted value inside input field is integer.\n" +
                        "The max value of each side of File in PS is 30000."

    UI.groupWidth.imageTooltip.helpTip = tooltipValue;
    UI.groupHeight.imageTooltip.helpTip = tooltipValue;
}