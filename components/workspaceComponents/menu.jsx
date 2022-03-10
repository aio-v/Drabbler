import React, { useState, useEffect, useContext } from 'react';
import { Box, Grow, useTheme } from '@mui/material';
import { SaveButton, LoadButton, ExportButton, TogglePromptButton } from '../buttons/menuButtons';
import { ToggleContext } from '../../pages/project';
import styles from '../../styles/Menu.module.css';

export function ProjectMenu() {
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SaveButton />
                <LoadButton />
                <ExportButton />
            </Box>
            <TogglePromptButton />
        </React.Fragment>
    );
}

export function ProjectMenuIcon() {
    const theme = useTheme();
    return (
        <Box className={styles.icon}>
            <Box sx={{
                fontFamily: 'Comfortaa',
                fontSize: '26px',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                opacity: 0.2,
                transform: 'rotate(270deg)'
            }}>
                MENU
            </Box>
        </Box>
    )
}

export function LoadProjectMenu() {
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
            <Box className={styles.wrapper}>
                <ProjectMenuIcon />
                <Box className={styles.menu} >
                    <ProjectMenu />
                </Box>
            </Box>
        </Grow>;
}