function mathSumWidthAndHeight(units, addWidth, addHeight, doc) {

    var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
    var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string

    if (units === "PERCENT") {
        var sumWidth = 100 + parseInt(addWidth, 10); //It can't has to be number, without decimals becouse it will cause bugs in resizeCanvas() function
        var sumHeight = 100 + parseInt(addHeight, 10); //It can't has to be number, without decimals becouse it will cause bugs in resizeCanvas() function
    }
    else if (units === "PX") {
        var sumWidth = activeDocWidth + parseInt(addWidth, 10); //It can't has to be number, without decimals becouse it will cause bugs in resizeCanvas() function
        var sumHeight = activeDocHeight + parseInt(addHeight, 10); //It can't has to be number, without decimals becouse it will cause bugs in resizeCanvas() function
    }

    return [ sumWidth, sumHeight ];
}