/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./templates/**/*.js"],
    theme: {
        extend: {
            colors: {
                "primary": "#0066FF",
                "secondary": "#003F9F",
                "dark": "#111339",
                "light": "#FFFFFF",
                "disabled": "#D8D8D8",
            },
            spacing: {
                '128': '32rem',
                '100': '22rem',
            }
        },
    },
    plugins: [],
}