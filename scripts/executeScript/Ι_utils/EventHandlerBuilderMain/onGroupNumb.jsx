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