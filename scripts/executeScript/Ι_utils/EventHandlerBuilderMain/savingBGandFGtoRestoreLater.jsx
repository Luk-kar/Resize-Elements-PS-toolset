EventHandlerBuilderMain.prototype.savingBGandFGtoRestoreLater = function() {
    var self = this;

    ///Saving BG and FG bucket color
    //Foregound bucket color
    self.bgColor = new SolidColor();
    self.bgColor.rgb.red = app.backgroundColor.rgb.red;
    self.bgColor.rgb.green = app.backgroundColor.rgb.green;
    self.bgColor.rgb.blue = app.backgroundColor.rgb.blue;

    //Background bucket color
    self.fgColor = new SolidColor();
    self.fgColor.rgb.red = app.foregroundColor.rgb.red;
    self.fgColor.rgb.green = app.foregroundColor.rgb.green;
    self.fgColor.rgb.blue = app.foregroundColor.rgb.blue;

}