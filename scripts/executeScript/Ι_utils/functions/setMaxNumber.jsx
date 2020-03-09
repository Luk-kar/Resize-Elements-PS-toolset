function setMaxNumber(input) { // in input text you add or subtract from original size of side of image

    var number = input.text;

    var maxPSsideValue = 30000;

    if (parseInt(number, 10) > maxPSsideValue) {
        input.text = (maxPSsideValue - 1).toString(); //input.text is edittext value
    } else if (parseInt(number, 10) < -maxPSsideValue) {
        input.text = (-maxPSsideValue + 1).toString(); //input.text is edittext value
    }
}