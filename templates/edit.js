const {Layout} = require("./layout");
const fs = require("fs");
// {
//      fullPath: '/Users/tomstejskal/Work/matysek/package-lock.json',
//      filename: 'package-lock',
//      extension: '.json'
// }
// <span className="break"> </span>

const supportedLanguages = ['.py', '.js', '.json', '.bash', '.sh', '.brainfuck', '.bf', '.csharp', '.css', '.cpp', '.c', '.h', '.go', '.java', '.javascript', '.python', '.md', '.html'];


module.exports.Edit = (data) => {
    // language=JavaScript
    const script = `
        const saveButton = document.getElementById("saveButton");
        const saveButtonFloating = document.getElementById("tm-floating-save");
        const editContentElement = document.getElementById("tm-edit-content");
        const fullPathElement = document.getElementById('tm-full-path');
        const deleteButton = document.getElementById('deleteFile');
        const closePopupBotton = document.getElementById("closePopup");

        const save = () => {
            const text = editContentElement.innerText;
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content: text})
            }
            fetch("/api/file/edit/" + fullPathElement.value, options).then(r => response.json())
            document.getElementById("savePopup").classList.add("tm-notification-visible");
            setTimeout(()=>{
                document.getElementById("savePopup").classList.remove("tm-notification-visible");
            },3*1000)
        };
        
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
        saveButton.addEventListener("click", save);
        saveButtonFloating.addEventListener("click", save);

        closePopupBotton.addEventListener("click", function() {
            document.getElementById("savePopup").classList.remove("tm-notification-visible");
        });

        document.getElementById("tm-back").addEventListener("click", () => {
            history.back()
        })

        window.addEventListener("scroll", (e) => {
            if (document.documentElement.scrollTop > 100) {
                saveButtonFloating.style.opacity = "1"
                saveButtonFloating.style.visibility = "visible"
            } else {
                saveButtonFloating.style.opacity = "0"
                saveButtonFloating.style.visibility = "hidden"
            }
        })
    `;


    // language=HTML
    return Layout("/files", `
        <input value="${data.fullPath}" type="hidden" id="tm-full-path">
        <div class="flex flex-wrap items-end px-4">
            <h1 class="text-5xl font-bold pt-4 mr-auto">
                <button id="tm-back"><i class="text-primary ai-chevron-left"></i></button>
                ${data.filename + data.extension}
            </h1>
            <div class="flex justify-end mt-2">
                <a href="/download/${data.fullPath}" class="btn-icon-primary lg:ml-4"><i class="ai-download"></i></a>
                <button class="btn-icon-primary !bg-red-600 md:mt-0 ml-4" id="deleteFile"><i class="ai-trash-can"></i></button>
                <button class="btn-primary  md:mt-0 ml-4" id="saveButton">Save</button>
            </div>
            <div id="savePopup" class="p-4 fixed items-center left-8 bottom-8 w-72  bg-white border-2 border-slate-200 drop-shadow-2xl rounded-2xl overflow-hidden flex tm-notification-hidden">
                <div class="text-4xl text-lime-500 flex items-center justify-center mx-4"><i class="ai-check"></i></div>
                <div class="font-bold">File saved.</div>
                <button id="closePopup" class="mr-4 ml-auto"><i class="ai-cross text-2xl"></i></button>
            </div>
        </div>
        ${(() => {
            if ([".jpg", ".jpeg", ".png", ".webp", ".pdf", ".svg"].includes(data.extension)) {
                return `<div class="border-slate-200 border-2 rounded-xl mx-4 my-8 overflow-hidden">
                    <img class="w-full" src="/download/${data.fullPath}" alt="iamge">
                </div>`
            }
            if (supportedLanguages.includes(data.extension)) {
                return `
                    <pre id="tm-edit-content" contenteditable="true"  class="overflow-scroll border-slate-200 border-2 rounded-xl mx-4 p-4 my-8"><code class="${data.extension} !bg-white">${fs.readFileSync(data.fullPath).toString().replace(/</g, "<").replace(/>/g, ">")}</code></pre>
                `
            }
            return `<pre id="tm-edit-content" contenteditable="true"  class="overflow-scroll border-slate-200 border-2 rounded-xl mx-4 p-4 my-8">${fs.readFileSync(data.fullPath).toString().replace(/</g, "<").replace(/>/g, ">")}</pre>`
        })()}
        <button style="opacity: 0; visibility: hidden" class="fixed bottom-12 right-32 btn-primary  md:mt-0 ml-4" id="tm-floating-save">Save</button>


        <script>${script}</script>
    `);
}