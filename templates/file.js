const {getScopedPath} = require("../app/utils");
module.exports.File = (data) => {
    data.relativePath = "";

    const randomID = Math.floor(Math.random()*10000000000)
    // language=JavaScript
    const script = `

        const deleteButton${randomID} = document.getElementById('deleteFile${randomID}');
        const deleteFile${randomID} = () => {
            const fullPathElement = document.getElementById('tm-full-path${randomID}');
            const options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }
            fetch("/api/file/delete/" + fullPathElement.value, options).then(r => response.json())
        }

        deleteButton${randomID}.addEventListener("click", deleteFile${randomID});
    `;
    return `
    <input value="${data.fullPath}" type="hidden" id="tm-full-path${randomID}">
    <div class="flex flex-col lg:flex-row lg:items-center lg:flex-nowrap lg:flex-end py-4 border-t-2 border-slate-200 px-4 overflow-scroll">
        <a href="/preview/${data.fullPath}" class="flex mt-2 lg:mt-0 lg:overflow-scroll font-bold text-lg lg:w-56"><span class="label">name:</span>${data.filename + data.extension}</a>
        <span class="mt-2 lg:mt-0 overflow-scroll"><span class="label">path:</span>${data.fullPath.split("/").join("/<span class='break'> </span>")}</span>
        <div class="mt-2 lg:mt-0 lg:ml-auto flex flex-row ">
            <span class="label">actions:</span>
            <a href="/download/${data.fullPath}" class="btn-icon-primary lg:ml-4"><i class="ai-download"></i></a>
            <a href="/edit/${data.fullPath}" class="btn-icon-primary md:mt-0 ml-4"><i class="ai-pencil"></i></a>
            <button class="btn-icon-primary !bg-red-600 md:mt-0 ml-4" id="deleteFile${randomID}"><i class="ai-trash-can"></i></button>
            <a href="/preview/${data.fullPath}" class="btn-icon-primary md:mt-0 ml-4"><i class="ai-chevron-right"></i></a>
        </div>
    </div>
    
    <script>${script}</script>
    `
}