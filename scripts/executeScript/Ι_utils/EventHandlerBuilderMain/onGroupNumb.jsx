/*
using getRidOfTooMuch0AtFront() from "../functions/getRidOfTooMuch0AtFront.jsx"
using allowMinusOnlyAtFront() from "../functions/allowMinusOnlyAtFront,jsx"
using setMaxNumber() from "../functions/setMaxNumber.jsx"
using sameInputField() from "../functions/sameInputField.jsx"
using self.lockingUnlockingAcceptBtn() from: "../EventHandlerBuilderMain/settingAcceptBtnBlock.jsx"
*/

EventHandlerBuilderMain.prototype.onGroupNumb = function(objectText, inputFieldToCopy, inputFieldToPasteIn) {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(objectText,
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'Minus', 'Escape', 'Backspace', 'Enter']);

    objectText.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        allowMinusOnlyAtFront(this);

        setMaxNumber(this);

        sameInputField(UI.constrainsProportionsCheckbox, inputFieldToCopy, inputFieldToPasteIn);

        self.lockingUnlockingAcceptBtn();
    }
}