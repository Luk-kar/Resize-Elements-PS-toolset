function mathSumWidthAndHeight(units, addWidth, addHeight, doc) {

    var activeDocWidth = parseInt(doc.width.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string
    var activeDocHeight = parseInt(doc.height.toString().slice(0, -3), 10); // .slice(0, -3) cut off " px" from the string

    var sumWidth = parseInt(addWidth, 10);  //It can't has to be number without decimals becouse it will cause bugs in resizeCanvas() function
    var sumHeight = parseInt(addHeight, 10);

    if (units === "PERCENT") {
        sumWidth += 100; 
        sumHeight += 100;

    }
    else if (units === "PX") {
        sumWidth += activeDocWidth; 
        sumHeight += activeDocHeight; 
        
    } else {
     throw new Error('Unknown unit '+ units)
    }

    return [ sumWidth, sumHeight ];
}