function leftUpperCornerColorBGSet() {

        var doc = app.activeDocument;
        
        doc.colorSamplers.removeAll(); // Remove any Color Samplers that may already exist to avoid bug when stack samples is full and it is 4, in that case you can't do any new measurements
        
        doc.selection.deselect(); // deselct any selection that may already exist.

        var pixelLocalisation_X_Y = [0, 0];
        var colorSampleObject = doc.colorSamplers.add(pixelLocalisation_X_Y);
        var sampledColor = colorSampleObject.color;

        app.backgroundColor = sampledColor;
        colorSampleObject.remove();
}