import React, { useState } from 'react';
import { IconButton, Tooltip, Zoom, useTheme } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export function SaveButton() {
    const theme = useTheme();

    return (
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Save Project"
        placement="left"
        >
            <IconButton size="medium" sx={{color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)' }}>
                <SaveOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function LoadButton() {
    const theme = useTheme();

    return (
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Open Project"
        placement="left"
        >
            <IconButton size="medium" sx={{color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'}}>
                <FolderOpenOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function ExportButton() {
    const theme = useTheme();

    return (
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Export as PDF"
        placement="left"
        >
            <IconButton size="medium" sx={{color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'}}>
                <PictureAsPdfOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function TogglePromptButton() {
    const [promptMode, setPromptMode] = useState(true);
    const theme = useTheme();

    const togglePromptMode = () => {
        setPromptMode(prev => {
            return !prev;
        });
    }

    return (
        <>
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Toggle Prompts"
        placement="left"
        >
            <IconButton size="medium" 
            sx={{
                color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'
            }}
            onClick={togglePromptMode}
            >
                <SavingsOutlinedIcon sx={{transform: 'scaleX(-1)' }} />
            </IconButton>
        </Tooltip>
        {promptMode ? <></> : <style global jsx>{
                `.prompt_field {
                    display: none
                }`
            }</style>}
        </>
    );
}