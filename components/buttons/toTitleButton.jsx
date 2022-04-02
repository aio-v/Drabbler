import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grow, useTheme } from '@mui/material';
import { ToggleContext } from '../../pages/project';

import styles from './toTitleButton.module.css';

export function ToTitleButton() {
    const theme = useTheme();
    const context = useContext(ToggleContext);

    return (
        <Box sx={{
            position: 'relative',
        }}>
            <button className={styles.button} onClick={context.page.togglePage}>
                <Box sx={{position: 'relative'}}>
                    <Box className={styles.arrow} mode={theme.palette.mode}></Box>
                </Box>
                <Typography sx={{
                    pt: 2,
                    fontSize: 18,  
                    fontFamily: 'Comfortaa', 
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 
                    theme.palette.secondary.main
                    }}>
                    TO TITLE SCREEN
                </Typography>
            </button>
        </Box>
    );
}

export function LoadToTitleButton() {
    const [load, setLoad] = useState(false);
    const context = useContext(ToggleContext);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setLoad(true);
        }, 500);
        return () => {
            clearTimeout(timeoutID);
        }
    }, [load]);

    return <Grow in={load && context.checked} {...(context.checked ? {timeout: 800} : {timeout: 0})}>
                <Box>
                    <ToTitleButton />
                </Box>
            </Grow>;
}