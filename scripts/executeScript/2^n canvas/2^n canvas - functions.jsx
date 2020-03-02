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

function restrictMinimalValueAt1(value) {

    if ( value.text === "0" || value.text === "") { //todo bug value.text === "0"; when value is equal "0" your engine ignore object
        alert("Written value has to be bigger than 1");
        value.text = 1;
    }
}

function nearestPow2( n ){
    return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) ); // Prefer this way than bitwise, becouse you need more readability than efficiency IMHO
}