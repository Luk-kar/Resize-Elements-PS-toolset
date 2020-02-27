function ErrorDiffrentUnitTypes(canvExtendColorDropDwn, unitsTypes) {

    var theSameTypes = true;
    for (var i = 0; i < unitsTypes.length; i++) {

        if (unitsTypes[i][0] !== canvExtendColorDropDwn.children[i].toString()) {
            theSameTypes = false;
            break;
        }
    }

    if ( (canvExtendColorDropDwn.children.length !== unitsTypes.length) || (theSameTypes === false)) {
        throw new Error("var unitsTypes has diffrent values than var AddCanvasDocUnits");
    }
}