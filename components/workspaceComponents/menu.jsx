import React, { useState, useEffect, useContext } from 'react';
import { Box, Grow, useTheme } from '@mui/material';
import { SaveButton, LoadButton, ExportButton, TogglePromptButton } from '../buttons/menuButtons';
import { ToggleContext } from '../../pages/project';

export function ProjectMenu() {
    const theme = useTheme();

    return (
        <Box className={"menu"}
        sx={{
            borderRadius: 24,
            backgroundColor: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main',
            opacity: 0.8,
            p: 1,
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '15px',
            transition: 'transform 250ms',
            cursor: 'pointer',
            right: '-80px',
        }}>
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
        </Box>
    );
}

export function ProjectMenuIcon() {
    const theme = useTheme();
    return (
        <Box className={"menu_icon"}>
            <Box sx={{
                fontFamily: 'Comfortaa',
                fontSize: '26px',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                opacity: 0.2,
                transform: 'rotate(270deg)'
            }}>
                {"MENU"}
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
            <Box className={"menu_wrapper"}
            sx={{
                position: 'fixed',
                height: '100%',
                top: '0%',
                right: '0%',
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProjectMenuIcon />
                <ProjectMenu />
            </Box>
        </Grow>;
}