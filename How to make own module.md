# How to make own module 🪓

## Structure of module 🧱

### There are particular template module's files in directory: _UI-Photoshop-toolSet\scripts\executeScript\Ι_Template\_

* Name of module - **eventHandler**.jsx
* Name of module - **EventHandlerBuilderMain**.jsx
* Name of module - **functions**.jsx
* Name of module - **UI**.jsx

### You can change name of them and parent folder depending on these rules:

0. **Name of module** schould be constructed: "**Verb**" + "**noun**"
1. **Verb** has to be [**_regular_**](https://conjugator.reverso.net/conjugation-english-verb-debug.html)
2. **Noun** has to be **_singular**
3. **.jsx files** have to be named: **Name of module** + "**_space_**" + "**-**" + "**_space_**" + "**_name of part in module_**"
4. **Folder** with module's files have to be named the same like **Name of module**

### Simplified model of module (How it works)

1. In "**_\UI-Photoshop-toolSet\scripts\control panel\control panel - GuiBuilderControlPanel.jsx_**" you add new button

```
this.btn2toNcanvas = this.controlPanelWindow.add("button", [205, 80, 395, 101], "2^n canvas");

this.btnNameOfModule = this.controlPanelWindow.add("button", [205, 80, 395, 101], "Name of module"); // <== Add this line of code
```

2. Later in "**_\UI-Photoshop-toolSet\scripts\control panel\control panel - EventHandlerBuilderControlPanel.jsx_**" you add event for button in control panel

```
        #include "../executeScript/2^n canvas/2^n canvas - EventHandlerBuilderMain.jsx";
        #include "../main/main.jsx"

    }
}

EventHandlerBuilderControlPanel.prototype.onBtnNameOfModule = function () { // <== Add code below
    var UIctrlPanel = this.UIctrlPanel;

    UIctrlPanel.btnNameOfModule.onClick = function () {
        UIctrlPanel.controlPanelWindow.close();

        var executeScript = "NameOfModule";
        checkIfScriptNameIsRight(executeScript);

        #include "../executeScript/NameOfModule/Name of module - functions.jsx
        #include "../executeScript/NameOfModule/Name of module - EventHandlerBuilderMain.jsx
        #include "../main/main.jsx"
    }
}
```

3. The next step is in "**_\UI-Photoshop-toolSet\control panel.jsx_**"

```
eventHandler.onBtn2toNcanvas();

eventHandler.onBtnNameOfModule(); // <== Add this line of code
```

4. In "**_\UI-Photoshop-toolSet\scripts\main\main.jsx_**"

```
    if (executeScript === "2^n canvas"){
        #include "../executeScript/2^n canvas/2^n canvas - eventHandler.jsx"; 
    }

        if (executeScript === "Name of module"){ // <== Add code below
        #include "../executeScript/NameOfModule/Name of module - eventHandler.jsx"; 
    }
```

5. In next one "**_\UI-Photoshop-toolSet\scripts\main\main - GuiBuilderMain.jsx_**"

```
    if (executeScript === "2^n canvas"){
        #include "../executeScript/2^n canvas/2^n canvas - eventHandler.jsx"; 
    }

    if (executeScript === "Name of module"){ // <== Add code below
        #include "../executeScript/NameOfModule/Name of module - - UI.jsx"; 
    }
```

6. In module's file ""**_../executeScript/NameOfModule/Name of module - UI.jsx_**"

You create UI for panel in main - UI

Check following examples to implement your solution:

* 2^n canvas - UI.jsx
* Add canvas - UI.jsx
* Resize image - UI.jsx

6. In module's next one ""**_../executeScript/NameOfModule/Name of module - EventHandlerBuilderMain.jsx_**"

7. In module's final ""**_../executeScript/NameOfModule/Name of module - eventHandler.jsx_**"

8. In module's final ""**_../executeScript/NameOfModule/Name of module - functions.jsx_**"

9. Test your script if everything works ([ExtendScript Toolkit](https://flylib.com/books/en/1.513.1.60/1/))

10. Enjoy!