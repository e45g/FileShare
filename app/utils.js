const fs = require("fs");
const path = require("path");
const forbiddenContentSearchFiles = [".png", ".jpeg", ".raw", ".jpg", ".gif", ".mp4", ".webp", ".mp3"]
const bannedFolders = ['snap', 'software', 'Screenshots', 'node_modules'];
let scopedFiles = [];
let dir = __dirname;
const checkDir = (absolutePath) => {
    let allFiles = [];
    fs.readdirSync(absolutePath).map(item => {
        if (bannedFolders.includes(item)) return;
        if (item.startsWith(".")) return;
        if (fs.lstatSync(path.join(absolutePath, item)).isDirectory()) {
            checkDir(path.join(absolutePath, item)).map(file => allFiles.push(file))
        } else {
            allFiles.push({
                fullPath: path.join(absolutePath, item),
                filename: path.basename(item).replace(/\.[^/.]+$/, ""),
                extension: path.extname(item)
            });
        }
    })
    return allFiles;
}
const getScopedPath = () => {
  return dir;
}
const startScopedFilesCycle = (absolutePath) => {
    dir = absolutePath;
    scopedFiles = checkDir(dir);
    setInterval(() => {
        scopedFiles = checkDir(dir);
    }, 30 * 1000)
}
const getScopedFiles = () => {
    return scopedFiles;
}
const searchScopedFiles = ({size, skip, keyword, extension, sort}) => {
    if (size === undefined) {
        size = 50
    }
    if (skip === undefined) {
        skip = 0
    }
    const result = scopedFiles.map(item => {
        if (extension !== undefined) {
            if (item.extension !== extension) return;
        }
        item.score = 0;
        if (!forbiddenContentSearchFiles.includes(item.extension)) {
            item.score = item.score + (fs.readFileSync(item.fullPath).toString().toLowerCase().match(new RegExp(keyword, "g")) || []).length
        }
        item.score = item.score + (item.filename.toLowerCase().match(new RegExp(keyword, "g")) || []).length * 3

        // var temp = "This is a string.";
        // var count = (temp.match(new RegExp(keyword,"g") ) || []).length;
        return item;
    }).filter(item => (item !== undefined)).filter(item => (item.score !== 0))
        .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    if (sort !== undefined) {
        if (sort === "asc") {
            result.sort((a,b) => (a.filename > b.filename) ? 1 : ((b.filename > a.filename) ? -1 : 0))
        }
    }


    result.splice(0, skip)
    result.length = size;

    return result;
};


module.exports = {
    checkDir,
    getScopedFiles,
    startScopedFilesCycle,
    searchScopedFiles,
    getScopedPath
}