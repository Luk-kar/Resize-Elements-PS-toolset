function restrictValueUpTo(maxResValue, valueInEdittext) {
    if (parseInt(valueInEdittext.text, 10) > maxResValue) {
        valueInEdittext.text = maxResValue;
    }
}
