function ErrorDiffrentUnitTypes(canvExtendColorDropDwn, unitsTypes) {

    if (canvExtendColorDropDwn.children.length !== unitsTypes.length) {
        throw new Error("var unitsTypes has diffrent diffrent number of items than var AddCanvasDocUnits");
    }

    var theSameTypes = true;
    for (var i = 0; i < unitsTypes.length; i++) {

        if (unitsTypes[i][0] !== canvExtendColorDropDwn.children[i].toString()) {
            theSameTypes = false;
            break;
        }
    }

    if (theSameTypes === false) {
        throw new Error("var unitsTypes has diffrent values than var AddCanvasDocUnits");
    }
}