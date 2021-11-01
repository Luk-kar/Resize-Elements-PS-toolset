function about(mainMenu) {
    
    var UIctrlPanel = this.UIctrlPanel;

    var about = new Window("dialog", "About");
    about.alignChildren = "left";

    // https://community.adobe.com/t5/after-effects-discussions/how-to-change-size-and-color-of-quot-statictext-quot/m-p/7748361
    var winGraphics = about.graphics;
    var blueColor = winGraphics.newPen(winGraphics.BrushType.SOLID_COLOR, [0,0,1], 1);

    var text = "PS CS6 plugin to resize various images in a batch. ";

    var instruction = about.add("statictext", undefined, text, {multiline: true});
    instruction.alignment = "left";
    instruction.characters = 30;

    var authorWWW = "www.github.com/Luk-kar";
    var author = about.add("statictext", undefined, "Karol Łukaszczyk");
    author.graphics.foregroundColor = blueColor;
    author.onClick = function() {
        openSite(authorWWW);
    }


    var repoSiteWWW = "www.github.com/Luk-kar/Resize-Elements-PS-toolset";
    var repoSite = about.add("statictext", undefined, repoSiteWWW);
    repoSite.alignment = "left";
    repoSite.characters = 40;
    repoSite.graphics.foregroundColor = blueColor;

    repoSite.onClick = function() {
        openSite(repoSiteWWW);
    }

    var buttonReturn = about.add("button", [0,80,290,101], 'Return');

    buttonReturn.onClick = function() {
        about.close();
        mainMenu.show();
    }

    about.show();

    // UIctrlPanel.controlPanelWindow.close();
}

function openSite(site) {

      if (  $.os.indexOf("Windows") != -1 ) 

      {//SYSTEM IS ONE OF THE WINDOWS
                          app.system("cmd.exe /c\"start http://"+site+"\"" );
                }
                          else{//MUST BE MAC
                          system.callSystem("open http://"+site);
          }
}