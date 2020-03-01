function leftUpperCornerColorBGSet() {

        var doc = app.activeDocument;
        
        doc.colorSamplers.removeAll(); // Remove any Color Samplers that may already exist to avoid bug when stack samples is 4, and you can't do any new measurement
        
        doc.selection.deselect(); // deselct any selection that may already exist.

        var pixelLocalisation_X_Y = [0, 0];
        var colorSampleRef = doc.colorSamplers.add(pixelLocalisation_X_Y);
        var sampledColor = colorSampleRef.color;

        app.backgroundColor = sampledColor;
        colorSampleRef.remove();
}