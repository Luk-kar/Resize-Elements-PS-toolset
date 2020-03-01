#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/setMaxNumber.jsx";

#include "../Ι_utils/functions/sameInputField.jsx";

#include "../Ι_utils/functions/sameDropDown.jsx";

#include "../Ι_utils/functions/changeTooltipAndImageToAnother.jsx";

#include "../Ι_utils/functions/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

function allowMinusOnlyAtFront(UI_group_numb) {

    var indexOfMinus = UI_group_numb.text.slice(1).indexOf('-');
    
    if (indexOfMinus >= 0) {
        UI_group_numb.text = UI_group_numb.text.slice(0, 1) + UI_group_numb.text.slice(1).replace(/\-/g, "");
    }
}