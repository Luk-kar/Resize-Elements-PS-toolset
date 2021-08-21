//Anchor button functionality
function anchorSetingNew(btnAnchorClickedOn, anchorPositionAtributes, anchorPostionButtons, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPostionButtons.length; i++) {
        anchorPostionButtons[i].image = imageAnchorFalse;
    }

    //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    for (var i = 0; i < anchorPostionButtons.length; i++) {
        if (anchorPostionButtons[i] === btnAnchorClickedOn) {
            var anchorPositionValue = anchorPositionAtributes[i];
        }
    }

    if (isUndefined(anchorPositionValue)) {
        throw new Error("anchorPositionValue doesn't have declared value");
    }

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPositionValue;
}
