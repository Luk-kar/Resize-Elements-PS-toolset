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
  
  /**
   * Restricts the character keys permitted in a `edittext` element.
   * @param {Object} editTextInstance - Reference to `edittext` ScriptUI element.
   */
  function restrictInputKeys(editTextInstance) {
  
    if (editTextInstance.constructor.name !== 'EditText') {
      throw new Error ('Invalid class. Expected `EditText` class.')
    }
  
    var hasComma = false;
  
    var permissibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Escape', 'Backspace'];
    /*
     * Add a listener to the given `edittext` element to detect `keydown` events.
     * In the body of its handler function we detect each key pressed to determine
     * whether the key is permissible or impermissible.
     */
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

function restrictValueUpTo(maxResValue, valueInEdittext) {
    if (parseInt(valueInEdittext.text, 10) > maxResValue) {
        valueInEdittext.text = maxResValue;
    }
}

function setMinimalValueAt1(value) {
    if ( (parseInt(value.text, 10) === 0) || value.text === "") {
        alert("Written value has to be bigger than 1");
        value.text = 1;
    }
}

function nearestPow2( n ){
    return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) ); // Prefer this way than bitwise, becouse you need more readability than efficiency IMHO
}

function leftUpperCornerColorBGSet(canvExtendColorDropDwn_IsLeftUpperCroner) {

    if (canvExtendColorDropDwn_IsLeftUpperCroner) {

        var doc = app.activeDocument;
        
        doc.colorSamplers.removeAll(); // Remove any Color Samplers that may already exist to avoid bug when stack samples is 4, and you can't do any new measurement
        
        doc.selection.deselect(); // deselct any selection that may already exist.

        var pixelLocalisation_X_Y = [0, 0];
        var colorSampleRef = doc.colorSamplers.add(pixelLocalisation_X_Y);
        var sampledColor = colorSampleRef.color;

        app.backgroundColor = sampledColor;
        colorSampleRef.remove();
    }
}

function doesItHaveBackgroundLayer() {

    var doc = app.activeDocument;
    var docLastLayer = doc.artLayers[doc.artLayers.length - 1];
    var itHasbackgroundLayer = docLastLayer.isBackgroundLayer; //Background layer is PS document property;
    return itHasbackgroundLayer;
    
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