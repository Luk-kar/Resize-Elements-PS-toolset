function allowMinusOnlyAtFront(UI_group_numb) {

    var indexOfMinus = UI_group_numb.text.slice(1).indexOf('-');
    
    if (indexOfMinus >= 0) {
        UI_group_numb.text = UI_group_numb.text.slice(0, 1) + UI_group_numb.text.slice(1).replace(/\-/g, "");
    }
}