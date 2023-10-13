export const themeColors = {
    primary: {
        50: '#e6fbff',       // Primary Color
        100: '#ccf7fe',
        200: '#99eefd',
        300: '#66e6fc',
        400: '#33ddfb',
        500: '#0088cc',
        600: '#00a0bc',
        700: '#006b7d',
        800: '#00353f',
        900: '#001519',
    },
    grey: {
        1000: '#000000',     // Black
        900: '#1a1a1a',
        800: '#333333',
        700: '#4d4d4d',
        600: '#666666',
        500: '#808080',    // Gray
        400: '#999999',
        300: '#b3b3b3',
        200: '#cccccc',
        100: '#e6e6e6',
        50: '#ffffff',
    }
}

// setup mui theme
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...mode === "dark" ? {
                // darkmode
                primary: {
                    dark: themeColors.primary[200],
                    main: themeColors.primary[500],
                    light: themeColors.primary[800]
                },
                neutral: {
                    dark: themeColors.grey[100],
                    main: themeColors.grey[200],
                    mediumMain: themeColors.grey[300],
                    medium: themeColors.grey[400],
                    light: themeColors.grey[700],
                },
                background: {
                    default: themeColors.grey[900],
                    alt: themeColors.grey[800]
                }
            } : {
                // lightmode
                primary: {
                    dark: themeColors.primary[700],
                    main: themeColors.primary[500],
                    light: themeColors.primary[50]
                },
                neutral: {
                    dark: themeColors.grey[800],
                    main: themeColors.grey[500],
                    mediumMain: themeColors.grey[400],
                    medium: themeColors.grey[300],
                    light: themeColors.grey[100],
                },
                background: {
                    default: themeColors.grey[100],
                    alt: themeColors.grey[50]
                }
            }
        },
        typography:{
            fontFamily:['Rubik', 'sans-serif'].join(','),
            fontSize: 12,
            h1:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 18,
            },            
            h6:{
                fontFamily:['Rubik', 'sans-serif'].join(','),
                fontSize: 16,
            }
        }
    }
}