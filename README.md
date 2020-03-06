<h1 align="center">UI Photoshop toolSet </h1>

<div align="center">🚀🚀🚀</div>

<div align="center">
</br>This is small plugin to automate repetetive and boring task connected with work with UI </br>
</div>
<div align="center"><i>
Tested and created for Photshop CS6 64bit Version: 13.0 on Windows 10 OS</br></br>
</i></div>

## Getting Started 😍

You choose: opened files in PS or folder with files, to process
Later you decide if you want to save files in source directory or in choosed folder
At the end you process files by (**Add canvas**, **Resize image** or **2^n canvas**) with inputed values
List of changed files are written in **ChangedFilesList.log** if value in **Preferences.ini** is **"CHANGEDFILESLIST.LOG"- WRITE LOG=ON**
You can change this value by clicking **Settings**, and later **ChangedFilesList.log" Log** button.

Toolset consist of:
- **Add canvas**
- **Resize image**
- **2^n canvas** (add canvas for both sides by nearest value of power of 2)
- **Settings** (Filter source folder files by PNG, hide dialog "Do you want to close all opened files", enable writing changed files in "ChangedFilesList.log")

In your **~Documents** directory, in **UI-Photoshop-toolSet** folder, there are appData:
- **ChangedFilesList.log** list of changed files
- **Preferences.ini** Preferences which you can change by **Settings** buttons or rewrite their values in file. 
    Options are:
    - Filter files by PNG" By default
    - "Do you want to close all opened files?" Dialog
    - "ChangedFilesList.log" Log)

### Prerequisites 💪

To run this script you need at least **Photoshop CS6 32bit Version: 13.0**

### Installing 🔨

1. **Download "UI-Photoshop-toolSet-master.zip"**

2. **Unzip file** in preffered directory (suggested place is: _...\Adobe\Adobe Photoshop CS6 (64 Bit)\Presets\Scripts_)

3. **Open "Photoshop"**

4. Push keys: **Alt+F9**

5. Chose **"Action"** tabbed panel in the left upper corner

6. (If is it not yet) **Disable "Button mode"** by clicking icon in right upper corner

5. "**Create new action**" (right bottom corner of Action window)

6. **Name script** (e. g. UI toolset), optionally assign key to it (e. g. F12) or add color (e. g. Green)

7. Click **"ok"**

7. Choose in upper main menu: **"File -> Scripts -> Browse..."**

8. **Navigate** to unziped folder directory

9. **Open "control panel.jsx"**

10. Click **"Close"** button in UI toolset

11. Click **"Stop\playing recording"** (small grey square in the left bottom corner)

12. Enable **"Button mode"** (right upper corner)

13. Now your script is **ready to use** (Click button with your newly created action)

14. **Enjoy!**

![make script as button](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/make%20script%20as%20button.gif)

## Running the tests 🧪

For now only manual testing is avaible. Use [**Adobe Phtoshop CS6 SDK Win**](http://download.macromedia.com/pub/developer/photoshop/sdk/adobe_photoshop_cs6_sdk_win.zip) to find bugs during running script

## Built With 🧰

* [**Visual Studio Code**](https://code.visualstudio.com)
* [**Adobe Phtoshop CS6 SDK Win**](http://download.macromedia.com/pub/developer/photoshop/sdk/adobe_photoshop_cs6_sdk_win.zip)
* [**ExtendScript Debugger Extension for Visual Studio Code**](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug) (mainly or debugging)

## Needed documentation 📦

* [**Photoshop CS6 Scripting Guide.pdf**](https://www.adobe.com/content/dam/acom/en/devnet/photoshop/scripting/Photoshop-CS6-Scripting-Guide.pdf)
* [**JavaScript Tools Guide CS6**](https://github.com/1179432578/psd-tool/blob/master/JavaScript%20Tools%20Guide%20CS6.pdf)
* [**Photoshop CS6 JavaScript Ref.pdf**](https://www.adobe.com/content/dam/acom/en/devnet/photoshop/scripting/Photoshop-CS6-JavaScript-Ref.pdf)

## Structure of the code 🧭

![Flow diagram](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/Flow%20Diagram.png)


## How to make own module 🪓

Just open [**How to make own module.md**](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/How%20to%20make%20own%20module.md)

## Contributing 📬

Please read [**CONTRIBUTING.md**](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/CONTRIBUTING.md.md) for details on our code of conduct, and the process for submitting pull requests to us

## Versioning 🗓️

We use [**SemVer**](http://semver.org/) for versioning in [**CHANGELOG.md**](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/CHANGELOG.md)

## Authors 🎈

* **Karol Łukaszczyk** - *Initial work* - [**Lukkar**](https://github.com/Lukkar90)

## License 📜

This project is licensed under the MIT License - see the [**LICENSE.md**](https://github.com/Lukkar90/UI-Photoshop-toolSet/blob/Ikulis--updates/License.md) file for details

## Acknowledgments 👍

* _README-template.md, CONTRIBUTING-template.md_ by [**PurpleBooth**](https://gist.github.com/PurpleBooth)
* [**_dateAdd()_**](https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object/1214753#1214753) by [**Kip**](https://stackoverflow.com/users/18511/kip)
* [**_restrictInputKeys()_**](https://stackoverflow.com/questions/59697920/is-possible-to-lock-certain-keys-in-keyboard-during-input-in-edittext-box-ph) by [**RobC**](https://stackoverflow.com/users/1611459/robc)
* persistent reviewer [**Ikulis**](https://github.com/ikulis)