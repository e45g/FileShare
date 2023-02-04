const path = require('path');
const fs = require('fs');

var files = [];

var bannedFolders = ['snap', 'software', 'Screenshots', 'node_modules'];

function checkDir(dir){
    const allFiles = fs.readdirSync(path.resolve(__dirname, dir));
    const filteredFiles = allFiles.filter(file => !file.startsWith('.'));
    const allowedFolders = filteredFiles.filter(file => !(bannedFolders.includes(file)));
    allowedFolders.map(file => {
        if(fs.statSync(path.resolve(__dirname, dir, file)).isDirectory()){
            checkDir(path.resolve(__dirname, dir, file))
        }
        else{
            files.push(path.resolve(__dirname, dir, file))
        }
    })
}

function getAllFiles(dir){
    checkDir(dir)
}


getAllFiles('..')
console.log(files)