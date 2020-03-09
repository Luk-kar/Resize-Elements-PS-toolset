function setDropdownSelectionFromEvent(sourceEvent, targetDropdown) {
    if (sourceEvent.selection.index !== targetDropdown.selection.index) {
        targetDropdown.selection = sourceEvent.selection.index;
    }
}