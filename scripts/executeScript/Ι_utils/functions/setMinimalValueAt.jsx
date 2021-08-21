function setMinimalValueAt(value, edittext) {

    if (edittext.text === "" || parseInt(edittext.text, 10) < value) {
        edittext.text = value;
    }
}
