const fs = require("fs");
const {Router} = require("express");
const {checkDir, searchScopedFiles} = require("./utils");
const {File} = require("../templates/file");
const bodyParser = require('body-parser');
const api = Router();
// [0] {
// [0]   fullPath: '/Users/tomstejskal/Work/matysek/FileShare/uploads/file-1675531140427.webp',
// [0]   filename: 'file-1675531140427',
// [0]   extension: '.webp'
// [0] }

api.post("/file/edit/*", (req, res) => {
    const fullPath = req.params[0];
    const body = req.body.content;
    fs.writeFileSync(fullPath, body);
})

api.delete("/file/delete/*", (req, res) => {
    const fullPath = req.params[0];
    console.log(fullPath, "DELETE")
})


api.post("/file/_search", (req, res) => {
    const {size, skip, keyword, sort, extension} = req.body;
    const result = searchScopedFiles({size, skip, keyword, sort, extension});
    // console.log(result)
    console.log(req.body)
    res.send(result.map(item => File(item)))
})

module.exports = {
    api
};
//edit