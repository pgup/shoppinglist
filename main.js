const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu} = electron; 

let mainWindow; 
let addWindow;

//lsten for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    
 mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
});

// Handle create Add Window

function createAddWindow(){
  //create new window
  addWindow = new BrowserWindow({
      width: 300,
      height:200,
      title:'Add Shopping List Item'
  });
  // Load html into window
  
  addWindow.loadURL(url.format({
      pathname: path.join(__dirname,'addWindow.html'),
      protocol:'file:',
      slashes: true
  }));
  
}

// create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                lable: 'Clear Items'
            },
            {
                lable: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

