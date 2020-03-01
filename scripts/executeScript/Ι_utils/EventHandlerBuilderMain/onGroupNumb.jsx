EventHandlerBuilderMain.prototype.onGroupNumb = function(_onChanging_, inputFieldToCopy, inputFieldToPasteIn) {
    var UI = this.UI;
    var self = this;

    restrictInputKeys(_onChanging_,
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'Minus', 'Escape', 'Backspace', 'Enter']);

    _onChanging_.onChanging = function() {

        getRidOfTooMuch0AtFront(this);

        allowMinusOnlyAtFront(this);

        setMaxNumber(this);

        sameInputField(UI.constrainsProportionsCheckbox, inputFieldToCopy, inputFieldToPasteIn);

        self.lockingUnlockingAcceptBtn();
    }
}