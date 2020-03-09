function sameInputField(checkbox, inputFieldToCopy, inputFieldToPasteIn) {
    if (checkbox.value === true) {
        inputFieldToPasteIn.text = inputFieldToCopy.text;
    }
}