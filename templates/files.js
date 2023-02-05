const {Layout} = require("./layout");
const {File} = require("./file");

module.exports.Files = (data) => {
    const header = `<div class="invisible lg:visible flex  flex-row items-center py-4 px-4">
        <span class="font-bold text-md w-56">name</span>
        <span class="font-bold text-md">path</span>
        <div class="font-bold text-md ml-auto">actions</div>
    </div>
`

    // language=JavaScript
    const script = `
        const header = ${"`"}${header}${"`"}
        const searchButton = document.getElementById("tm-search-button");
        const searchInput = document.getElementById("tm-search-input");
        const DataGrid = document.getElementById("tm-files-data-grid");
        
        const search = () => {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    size: 50,
                    skip: 0,
                    keyword: searchInput.value,
                    sort:(searchInput.value === "") ? "asc" : undefined
                })
            }

            fetch("/api/file/_search", options).then(async (r) => {
                DataGrid.innerHTML = header + JSON.parse(await r.text()).join("")
            })
        }; 
        
        searchInput.onkeyup = search
        searchButton.onclick = search;
    `
    // language=HTML
    return Layout("/files",`
        <div class="flex">
            <div class="w-full overflow-hidden flex rounded-2xl border-slate-200 items-center border-2 focus-within:outline-primary/50 focus-within:outline-4 focus-within:outline -outline-offset-2">
                <i class="ai-search text-3xl mx-4"></i>
                <input class="py-4 w-full outline-none text-lg" id="tm-search-input" type="search"/>
            </div>
            <button class="btn-primary !py-4  !px-10 rounded-xl text-lg ml-4" id="tm-search-button">search</button>
        </div>

        <div id="tm-files-data-grid" class="flex flex-col">
            ${header}
            ${data.map(item => {
        return File(item);
    }).join("")}
        </div>
    
        <script>${script}</script>
    `)
}