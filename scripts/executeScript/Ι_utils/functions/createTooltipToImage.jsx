function createTooltipToImage(condition, picture, pictureSourceTrue, pictureSourceFalse) {
    if (condition.value === true) {
        picture.image = pictureSourceTrue;
        picture.helpTip = "Width and Height same value enabled";
    }
    else if (condition.value === false) {
        picture.image = pictureSourceFalse;
        picture.helpTip = "Width and Height same value disabled";
    }
}
