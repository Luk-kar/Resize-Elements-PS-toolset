EventHandlerBuilderMain.prototype.onGroupUnitsDropDown  = function(_onChanging_, objectEvent, objectSetSameValue) {
    var UI = this.UI;

    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
    _onChanging_.onChange = function() {

        sameDropDown(objectEvent, objectSetSameValue);
    }

}
