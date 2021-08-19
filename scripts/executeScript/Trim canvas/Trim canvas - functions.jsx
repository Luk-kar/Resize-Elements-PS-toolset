// Here you declare function which will be used in your whole module
#include "../Ι_utils/functions/restrictInputKeys.jsx"

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