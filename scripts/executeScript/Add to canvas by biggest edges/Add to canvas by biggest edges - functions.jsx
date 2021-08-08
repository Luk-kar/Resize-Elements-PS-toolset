#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx";

#include "../Ι_utils/functions/allowMinusOnlyAtFront.jsx";

#include "../Ι_utils/functions/setMaxNumber.jsx";

#include "../Ι_utils/functions/sameInputField.jsx";

#include "../Ι_utils/functions/setDropdownSelectionFromEvent.jsx";

#include "../Ι_utils/functions/changeTooltipAndImageAccordingToState.jsx";

#include "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx";

#include "../Ι_utils/functions/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

//Anchor button functionality
function anchorSetingNew(btnAnchorClickedOn, anchorPositionAtributes, anchorPostionButtons, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPostionButtons.length; i++){
        anchorPostionButtons[i].image = imageAnchorFalse;
    }

    //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    for (var i = 0; i < anchorPostionButtons.length; i++) {
        if (anchorPostionButtons[i] === btnAnchorClickedOn) {
            var anchorPositionValue = anchorPositionAtributes[i];
        }
    }

    if(isUndefined(anchorPositionValue)) {
        throw new Error("anchorPositionValue doesn't have declared value");
    }

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPositionValue;
}

alert("func")