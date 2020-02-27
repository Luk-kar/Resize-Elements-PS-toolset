#include "../Ι_utils/restrictInputKeys.jsx"

#include "../Ι_utils/leftUpperCornerColorBGSet.jsx";

#include "../Ι_utils/sameInputField.jsx";

#include "../Ι_utils/sameDropDown.jsx";

#include "../Ι_utils/createTooltipToImage.jsx";

#include "../Ι_utils/doesItHaveBackgroundLayer.jsx";

#include "../Ι_utils/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/getRidOfTooMuch0AtFront.jsx";


//Anchor button functionality
function anchorSetingNew(btnAnchorClickedOn, anchorPositionValue, anchorPostionButtons, imageAnchorTrue, imageAnchorFalse) {

    for (i = 0; i < anchorPostionButtons.length; i++){
        anchorPostionButtons[i].image = imageAnchorFalse;
    }

     //Setting cliked button to anchor
    btnAnchorClickedOn.image = imageAnchorTrue;

    if(anchorPositionValue === undefined) {
        throw new Error("anchorPositionValue doesn't have declared value");
    }

    //Sending information which anchor is marked for resizeCanvas()
    return anchorPositionValue;
}

function allowMinusOnlyAtFront(UI_group_numb) {

    var indexOfMinus = UI_group_numb.text.slice(1).indexOf('-');
    
    if (indexOfMinus >= 0) {
        UI_group_numb.text = UI_group_numb.text.slice(0, 1) + UI_group_numb.text.slice(1).replace(/\-/g, "");
    }
}