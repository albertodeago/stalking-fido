const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
            },
        },
        scale: {
            '200': '2',
            '210': '2.1'
        },
        // colors: {
        //     transparent: 'transparent',
        //     current: 'currentColor',
        //     green: {
        //         DEFAULT: '#065F46',
        //         light: '#D1FAE5'
        //     },
        //     gray: {
        //         darkest: '#1f2d3d',
        //         dark: '#3c4858',
        //         DEFAULT: '#c0ccda',
        //         light: '#e0e6ed',
        //         lightest: '#f9fafc',
        //     }
        // }
    },
    plugins: [
        require('@tailwindcss/forms'),
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/aspect-ratio'),
    ],
}