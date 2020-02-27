EventHandlerBuilderMain.prototype.onCanvExtendColorDropDwn = function() {
    var UI = this.UI;
    var self = this;

    UI.canvExtendColor.dropDwn.onChange = function() {
        var canvExtendColorDropDwn = UI.canvExtendColor.dropDwn.selection.toString();//Full list to select canvExtendColor.values

        if (canvExtendColorDropDwn === "Foreground") {

            app.foregroundColor = self.bgColor;
            app.backgroundColor = self.fgColor;

        } else if (canvExtendColorDropDwn === "Background") {

            app.foregroundColor = self.fgColor;
            app.backgroundColor = self.bgColor;

        } else if (canvExtendColorDropDwn === "White") {

            app.backgroundColor.rgb.red = 255;
            app.backgroundColor.rgb.green = 255;
            app.backgroundColor.rgb.blue = 255;

        } else if (canvExtendColorDropDwn === "Black") {

            app.backgroundColor.rgb.red = 0;
            app.backgroundColor.rgb.green = 0;
            app.backgroundColor.rgb.blue = 0;

        } else if (canvExtendColorDropDwn === "Grey") {

            app.backgroundColor.rgb.red = 128;
            app.backgroundColor.rgb.green = 128;
            app.backgroundColor.rgb.blue = 128;

        } else if (canvExtendColorDropDwn === "Select color") {

            showColorPicker();
            app.backgroundColor = app.foregroundColor;
            app.foregroundColor = self.fgColor;

        } else if ( !(canvExtendColorDropDwn === "Left upper corner color") ) { //leftUpperCornerColorBGSet() invoked in function changeFileAndSave

            throw new Error("Not all dropdowns items have assigned outcomes");
        } 
    }
}