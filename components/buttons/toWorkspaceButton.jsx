import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ToggleContext } from '../../pages/project';

import styles from './toWorkspaceButton.module.css';

export function ToWorkspaceButton() {
    const theme = useTheme();
    const context = useContext(ToggleContext);
    return (
        <Box sx={{
            mt: '7%',
            position: 'relative',
        }}>
            <button className={styles.button} onClick={context.page.togglePage}>
                <Typography sx={{
                    pb: 2, 
                    fontFamily: 'Comfortaa',
                    fontSize: 18, 
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