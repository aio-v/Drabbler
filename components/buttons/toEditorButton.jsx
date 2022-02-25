import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import styles from '../../styles/ToEditorButton.module.css';

export default function ToEditorButton() {
    const theme = useTheme();
    return (
        <a href="">
            <Box sx={{position: 'relative'}}>
                <Typography sx={{
                    pb: 2, 
                    fontFamily: 'Comfortaa', 
                    color:theme.palette.mode === 'dark' ? theme.palette.primary.main : 
                    theme.palette.secondary.main
                    }}>
                    TO EDITOR
                </Typography>
                <Box sx={{position: 'relative'}}>
                    <Box className={styles.arrow} mode={theme.palette.mode}></Box>
                </Box>
            </Box>
        </a>
    );
}