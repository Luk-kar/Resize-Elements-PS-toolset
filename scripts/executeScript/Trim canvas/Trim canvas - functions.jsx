// Here you declare function which will be used in your whole module
#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

#include "../Ι_utils/functions/restrictValueUpTo.jsx";

function setMinimalValueAt(value, edittext) {

    if ( edittext.text === "" || parseInt(edittext.text, 10) < value) {
        edittext.text = value;
    }
}