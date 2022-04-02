import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, useTheme, Grow } from '@mui/material';
import { ToggleContext } from '../../pages/project';

import styles from './toWorkspaceButton.module.css';

export function ToWorkspaceButton() {
    const theme = useTheme();
    const context = useContext(ToggleContext);
    return (
        <Box sx={{
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

export function LoadToWorkspaceButton() {
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
                <Box sx={{
                    left: 'calc(50% - 60px)',
                    bottom: '6.5%',
                    position: 'fixed',
                }}>
                    <ToWorkspaceButton />
                </Box>
            </Grow>;
}