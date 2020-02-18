/**
 * Restricts the character keys permitted in a `edittext` element.
 * @param {Object} editTextInstance - Reference to `edittext` ScriptUI element.
 */
function blockKeysInEdittext(editTextInstance) {

    if (editTextInstance.constructor.name !== 'EditText') {
      throw new Error ('Invalid class. Expected `EditText` class.')
    }
  
    var permissibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'Minus', 'Escape', 'Backspace', 'Enter'];
  
    editTextInstance.addEventListener('keydown', function (key) {
        var keyName = key.keyName;
        var shiftKeyIsDown = key.shiftKey;
        var altKeyIsDown = key.altKey;
  
    if (shiftKeyIsDown && keyName === 'Equal') {
        return;
    }
  
    if ((shiftKeyIsDown || altKeyIsDown) && inArray(keyName, permissibleKeys)) {
        key.preventDefault();
        return;
    }
  
    if (! inArray(keyName, permissibleKeys)) {
        key.preventDefault();
    }
    });
  }
  
/**
 * Determines whether an array includes a certain value among its elements.
 * @param {String} valueToFind - The value to search for.
 * @param {Array} arrayToSearch - The array to search in.
 * @returns {Boolean} true if the value valueToFind is found within the array
 */
  
function inArray(valueToFind, arrayToSearch) {
for (var i = 0, max = arrayToSearch.length; i < max; i++) {
    if (arrayToSearch[i] === valueToFind) {
        return true;
    }
}
return false;
}

function sameInputField(condition, inputFieldToCopy, inputFieldToPasteIn) {
    if (condition.value === true) {
        inputFieldToPasteIn.text = inputFieldToCopy.text;
    }
}

function sameDropDown(objectEvent, objectSetSameValue) {
    if (objectEvent.selection.index !== objectSetSameValue.selection.index) {
        objectSetSameValue.selection = objectEvent.selection.index;
    }
}

function createTooltipToImage(condition, picture, pictureSourceTrue, pictureSourceFalse) {

    if (condition.value === true) {
        picture.image = pictureSourceTrue;
        picture.helpTip = "Width and Height same value anabled";
    }
    else if (condition.value === false) {
        picture.image = pictureSourceFalse;
        picture.helpTip = "Width and Height same value disabled";
    }
}

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