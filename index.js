const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

var bannedFolders = ['snap', 'software', 'Screenshots', 'node_modules'];
var files = [];
var mode = 'download'
const upload = multer({ dest: 'uploads/' });

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

app.get('/download/*', (req, res) => {
  const fileName = req.params[0];
  const file = path.resolve(__dirname, fileName);
  res.download(file);
});

app.get('/preview/*', (req, res) => {
    const fileName = req.params[0];
    const file = path.resolve(__dirname, fileName);

    var content = fs.readFileSync(file, {encoding:'utf8', flag:'r'})

    res.send(content.split("\n").join("<br/>"));
  });

app.get('/files/?*?', (req, res) => {
    const folder = req.params[0] || "";
    files = [];
    checkDir("../" + folder)

    var fileLinks = ""

    fileLinks += "<ul>"+files.map(item=>{
        var stats = fs.statSync(item)
        var fileSizeInBytes = stats.size;
        return `<a href="/${mode}/${item}">${item}</a> <size>${(fileSizeInBytes/ (1024*1024)).toFixed(2)}MB</size><br/>`
      }).join("")


    const html = fs.readFileSync('files.html', {encoding:'utf8', flag:'r'}).replace("${fileLinks}", fileLinks);
    res.send(html);

});

app.get('/upload', (req, res) => {
    res.send(`
      <form action="/saveup" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <button type="submit">Upload</button>
      </form>
    `);
  });
  
app.post('/saveup', upload.single('file'), (req, res) => {
console.log(req.file);
res.send('File uploaded!');
});


app.listen(3000, function() {
  console.log('Server started on port 3000');
});
