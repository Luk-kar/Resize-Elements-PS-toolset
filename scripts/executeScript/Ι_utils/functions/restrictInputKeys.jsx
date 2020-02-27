/**
 * Restricts the character keys permitted in a `edittext` element.
 * @param {Object} editTextInstance - Reference to `edittext` ScriptUI element.
 */
function restrictInputKeys(editTextInstance, permissibleKeys) {

    if (editTextInstance.constructor.name !== 'EditText') {
      throw new Error ('Invalid class. Expected `EditText` class.')
    }
  
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