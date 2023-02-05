const {Layout} = require("./layout");
const fs = require("fs");
// {
//      fullPath: '/Users/tomstejskal/Work/matysek/package-lock.json',
//      filename: 'package-lock',
//      extension: '.json'
// }
// <span className="break"> </span>

const supportedLanguages = ['.py', '.js', '.json', '.bash', '.sh', '.brainfuck', '.bf', '.csharp', '.css', '.cpp', '.c', '.h', '.go', '.java', '.javascript', '.python', '.md', '.html'];

const niceBytes = (x) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

module.exports.Preview = (data) => {
    const stats = fs.statSync(data.fullPath);

    // language=JavaScript
    const script = `
        const deleteButton = document.getElementById('deleteFile');
        const fullPathElement = document.getElementById('tm-full-path');
        
        const deleteFile = () => {
            const options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }
            fetch( "/api/file/delete/" + fullPathElement.value, options).then(r => response.json())
        }

        deleteButton.addEventListener("click", deleteFile);
        
        document.getElementById("tm-back").addEventListener("click",()=>{
            history.back()
        })
    `

    return Layout("/files", `
        <input value="${data.fullPath}" type="hidden" id="tm-full-path">
        <div class="flex flex-wrap items-end px-4">
            <h1 class="text-5xl font-bold pt-4 mr-auto"><button id="tm-back"><i class="text-primary ai-chevron-left"></i></button> ${data.filename + data.extension}</h1>
            <div class="flex justify-end mt-2">
                <a href="/download/${data.fullPath}" class="btn-icon-primary lg:ml-4"><i class="ai-download"></i></a>
                <button class="btn-icon-primary !bg-red-600 md:mt-0 ml-4" id="deleteFile"><i class="ai-trash-can"></i></button>
            </div>
        </div>
        <ul class="flex px-4 sm:ml-14 mt-4 flex-wrap">
           <li class="mr-4">size: <span class="font-bold">${niceBytes(stats.size)}</span></li>
           <li class="mr-4">created: <span class="font-bold">${stats.birthtime.toLocaleString()}</span></li>
           <li class="mr-4">edited: <span class="font-bold">${stats.mtime.toLocaleString()}</span></li>
        </ul>
        ${(() => {
        console.log(data)
        if ([".jpg", ".jpeg", ".png", ".webp", ".pdf", ".svg"].includes(data.extension)) {
            return `<div class="border-slate-200 border-2 rounded-xl mx-4 my-8 overflow-hidden">
                <img class="" src="/download/${data.fullPath}">
            </div>`
        }
        if (supportedLanguages.includes(data.extension)) {
            return `
                <pre class="overflow-scroll border-slate-200 border-2 rounded-xl mx-4 p-4 my-8"><code class="${data.extension} !bg-white">${fs.readFileSync(data.fullPath).toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            `
        }
        return `<pre class="overflow-scroll border-slate-200 border-2 rounded-xl mx-4 p-4 my-8">${fs.readFileSync(data.fullPath).toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`
    })()}
        
        
        <script>
            ${script}
        </script>
    `)
}