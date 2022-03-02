import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ToggleContext } from '../../pages/project';

import styles from '../../styles/ToWorkspaceButton.module.css';

export function ToWorkspaceButton() {
    const theme = useTheme();
    const page = useContext(ToggleContext);
    return (
        <Box sx={{position: 'relative'}}>
            <button className={styles.button} onClick={page.togglePage}>
                <Typography sx={{
                    pb: 2, 
                    fontFamily: 'Comfortaa', 
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 
                    theme.palette.secondary.main
                    }}>
                    TO EDITOR
                </Typography>
                <Box sx={{position: 'relative'}}>
                    <Box className={styles.arrow} mode={theme.palette.mode}></Box>
                </Box>
            </button>
        </Box>
    );
}