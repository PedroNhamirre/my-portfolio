// tailwind.config.js
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}', // Ajuste conforme seus arquivos de origem
    ],
    darkMode: 'class', // Essencial para o toggle funcionar
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto Mono', 'monospace'],
                jetbrains: ["JetBrains Mono", 'monospace'],
            },
        },
    },
    plugins: [],
};
