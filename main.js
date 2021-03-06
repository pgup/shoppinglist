const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu, ipcMain} = electron; 

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
  // Garabae collection
  addWindow.on('close', function(){
      addWindow = null;
  })
}
// catch item:add // the fuction gets the event(e) and the item
ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add',item);
    addWindow.close();
});


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
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//if mac add empty object to manu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I':
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}



