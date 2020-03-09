function changeTooltipAndImageAccordingToState(checkbox, picture, pictureSourceTrue, pictureSourceFalse) {

    if (checkbox.value === true) {
        picture.image = pictureSourceTrue;
        picture.helpTip = "Width and Height same value enabled";
        
    } else if (checkbox.value === false) {
        picture.image = pictureSourceFalse;
        picture.helpTip = "Width and Height same value disabled";
    }
}
