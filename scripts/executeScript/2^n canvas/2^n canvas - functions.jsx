#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx";

#include "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx";

#include "../Ι_utils/functions/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

function restrictValueUpTo(maxResValue, valueInEdittext) {
    if (parseInt(valueInEdittext.text, 10) > maxResValue) {
        valueInEdittext.text = maxResValue;
    }
}

function setMinimalValueAt(value, edittext) {

    if ( edittext.text === "" || parseInt(edittext.text, 10) < value) {
        edittext.text = value;
    }
}

function nearestPow2( n ){
    return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) ); // Prefer this way than bitwise, becouse you need more readability than efficiency IMHO
}