import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ColorModeContext } from '../../utils/themeContext';

export function ModeSwitch() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
  
    return (
        <Box>
            <IconButton size="medium" onClick={colorMode.toggleColorMode} sx={theme.palette.mode === 'dark' ? { m: 1, color:'primary.main' } : {m: 1, color:'secondary.main'}}>
            {theme.palette.mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
        </Box>
    )
}