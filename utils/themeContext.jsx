import { createContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeContext = ({ children }) => {
    const [mode, setMode] = useState('dark');

    const getDesignTokens = (mode) => ({
        components: {
            MuiCssBaseline: {
              styleOverrides: mode === 'dark' ? `
                body {
                  background: linear-gradient(to right bottom, #0b082e, #11001d, #000000);
                  background-repeat: no-repeat;
                  background-attachment: fixed;
                }
              ` : `
              `,
            },
          },
        palette: {
          mode,
          secondary: {
            light: '#6ec6ff',
            main: '#2196f3',
            dark: '#0069c0',
            contrastText: '#fafafa',
          },
          primary: {
            light: '#ffc979',
            main: '#ffb74d',
            dark: '#c88719',
            contrastText: '#fafafa',
          },
        },
      });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        []
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode)), 
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ThemeContext