const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {Files} = require("../templates/files");
const {getScopedFiles, startScopedFilesCycle, searchScopedFiles} = require("./utils");
const {api} = require("./api");
const {Preview} = require("../templates/preview");
const {Edit} = require("../templates/edit");
const bodyParser = require("body-parser");
startScopedFilesCycle(path.join(__dirname, "../"));
var bannedFolders = ['snap', 'software', 'Screenshots', 'node_modules'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
const upload = multer({storage: storage});
app.use(bodyParser.json())
app.use(express.static('public'))
app.use("/api", api);
app.get('/test/', (req, res) => {


})

app.get('/download/*', (req, res) => {
    const fileName = req.params[0];
    const file = path.resolve(__dirname, fileName);
    res.download(file);
});

app.get('/preview/*', (req, res) => {
    res.send(Preview({
        fullPath: req.params[0],
        filename: path.basename(req.params[0]).replace(/\.[^/.]+$/, ""),
        extension: path.extname(req.params[0])
    }))
});

app.get('/edit/*', (req, res) => {

    res.send(Edit({
        fullPath: req.params[0],
        filename: path.basename(req.params[0]).replace(/\.[^/.]+$/, ""),
        extension: path.extname(req.params[0])
    }))
});

app.get('/files/?*?', (req, res) => {
    // console.log(Files(getScopedFiles(path.join(__dirname, "../../"))))
    res.header("Content-Type", "text/html")
    res.send(Files(searchScopedFiles({
        size: 50,
        sort: "asc"
    })));
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


app.listen(3000, function () {
    console.log('Server started on port http://localhost:3000');
});
