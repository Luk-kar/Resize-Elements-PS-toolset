/* 
var unitsTypes is used in scripts\executeScript\("Add resize image" || "Add canvas")\("Add resize image" || "Add canvas") - EventHandlerBuilderMain.jsx
canvExtendColorDropDwn is used in scripts\executeScript\("Add resize image" || "Add canvas")\("Add resize image" || "Add canvas") - UI.jsx
*/

function ErrorDiffrentUnitTypes(canvExtendColorDropDwn, unitsTypes) {

    if (canvExtendColorDropDwn.children.length !== unitsTypes.length) {
        throw new Error("var unitsTypes has different number of items than canvExtendColorDropDwn");
    }

    var theSameTypes = true;
    for (var i = 0; i < unitsTypes.length; i++) {

        if (unitsTypes[i][0] !== canvExtendColorDropDwn.children[i].toString()) {
            theSameTypes = false;
            break;
        }
    }

    if (theSameTypes === false) {
        throw new Error("var unitsTypes has different value than canvExtendColorDropDwn item");
    }
}