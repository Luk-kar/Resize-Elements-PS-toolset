// using EventHandlerBuilderMain() from "./functions/EventHandlerBuilderMain.jsx"

EventHandlerBuilderMain.prototype.onGroupUnitsDropDown  = function(_onChanging_, sourceEvent, targetDropdown) {
    var UI = this.UI;

    //Dropdownlist: setting the same units: "ADD %" and "ADD %"
    _onChanging_.onChange = function() {

        setDropdownSelectionFromEvent(sourceEvent, targetDropdown);
    }

}
