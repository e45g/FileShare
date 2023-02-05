module.exports.Layout = (location, slot) => {

    const menu = [
        {
            text: "Files",
            link: "/files"
        },
        {
            text: "Upload",
            link: "/upload"
        }
    ]

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/default.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body class="overflow-x-hidden">
    <header class="top-0 fixed flex py-6 px-8 border-b-2 border-slate-300 w-full bg-white">
        <div class="flex max-w-4xl items-center mx-auto w-full">
            <a href="/" class="text-4xl font-bold">FileShare</a>
            <ul class="invisible sm:visible flex w-0 sm:w-auto ml-0 sm:ml-auto text-xl">
                ${menu.map(item => {
        return `<li class="py-2 mx-4"><a class="${(location === item.link) ? "underline underline-offset-4" : "no-underline"}" href="${item.link}">${item.text}</a></li>`
    }).join("")}
            </ul>
            <button id="tm-menu-open" class="sm:invisible sm:w-0 ml-auto sm:ml-0">
                <i class="ai-three-line-horizontal text-4xl"></i>
            </button>
        </div>
    </header>
    <main id="tm-content" class="tm-transition origin-top mt-28 px-2 max-w-6xl w-full mx-auto">
    ${slot}
    </main>
    <footer class="flex border-slate-200 border-t-2 py-16">
        <div class="flex mx-auto w-full max-w-4xl justify-center">
            <p class="">Developed by <span class="font-bold">e45g</span>.&nbsp; </p><p class="">Designed by <span class="font-bold">stejs</span>.</p>
        </div>
    </footer>
    <button id="tm-up" style="opacity: 0; visibility: hidden;" class="tm-transition bg-white text-primary text-4xl rounded-full p-4 fixed bottom-8 drop-shadow-2xl right-8 border-slate-200 border-2"><i class="ai-chevron-up"></i></button>
    <div class="tm-transition transition-all opacity-0 invisible z-10 inset-0 bg-slate-900/10 fixed backdrop-blur-md" id="tm-backdrop"></div>
    <div class="tm-transition transition-all tm-menu invisible z-30 p-8 flex flex-col sm:invisible fixed top-0 bottom-0 right-0 max-w-xs w-full bg-white border-l-2 border-slate-300" id="tm-menu">
        <div class="flex">
            <span class="text-4xl font-bold">Menu</span>
            <button id="tm-menu-close" class="text-4xl ml-auto"><i class="ai-cross"></i></button>
        </div>
        <ul class="text-xl mt-12">
                ${menu.map(item => {
        return `<li class="py-2 my-2 text-2xl"><a class="${(location === item.link) ? "underline underline-offset-4" : "no-underline"}" href="${item.link}">${item.text}</a></li>`
    }).join("")}
            </ul>
            <span class="mt-auto">Designed by <span class="font-bold">stejs</span></span>
    </div>
    
    <script>
    const menu = document.getElementById("tm-menu");
    const backdrop = document.getElementById("tm-backdrop");
    const menuCloseButton = document.getElementById("tm-menu-close");
    const menuOpenButton = document.getElementById("tm-menu-open");
    const upButton = document.getElementById("tm-up");
    // const top  = document.documentElement.scrollTop;
    
    
    menuOpenButton.addEventListener("click", () => {
        menu.classList.add("tm-menu-open");
        backdrop.classList.add("tm-backdrop-visible");
    })
    
    menuCloseButton.addEventListener("click", () => {
        menu.classList.remove("tm-menu-open");
        backdrop.classList.remove("tm-backdrop-visible");
    })
    
    backdrop.addEventListener("click", () => {
        menu.classList.remove("tm-menu-open");
        backdrop.classList.remove("tm-backdrop-visible");
    })
    
    upButton.addEventListener("click", ()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    
    window.addEventListener("scroll",(e)=>{
        if (document.documentElement.scrollTop > 100) {
            upButton.style.opacity = "1"
            upButton.style.visibility = "visible"
        } else {
            upButton.style.opacity = "0"
            upButton.style.visibility = "hidden"
        }
    })
    
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"></script>
    <script type="text/javascript">
        hljs.highlightAll();
    </script>
    <script src="https://unpkg.com/akar-icons-fonts"></script>
    </body>
    </html>
    `
}