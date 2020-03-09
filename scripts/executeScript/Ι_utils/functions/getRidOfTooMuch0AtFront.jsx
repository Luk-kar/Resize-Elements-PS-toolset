function getRidOfTooMuch0AtFront(input) {
    if ((input.text.replace("-", "").match(/^0+/g) || "").toString().length > 0) { // .replace("-", "" to avoid "-0000"/ || "" to avoid null.toString()
        input.text = parseInt(input.text, 10);
    }
}
