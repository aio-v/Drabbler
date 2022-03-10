import React from 'react';
import { IconButton, Tooltip, Zoom, useTheme } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export function SaveButton() {
    const theme = useTheme();

    return (
        <Tooltip
        TransitionComponent={Zoom}
        title="Save Project"
        placement="left"
        >
            <IconButton size="medium" sx={{opacity: 0.8, color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main'}}>
                <SaveOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function LoadButton() {
    const theme = useTheme();

    return (
        <Tooltip
        TransitionComponent={Zoom}
        title="Open Project"
        placement="left"
        >
            <IconButton size="medium" sx={{opacity: 0.8, color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main'}}>
                <FolderOpenOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function ExportButton() {
    const theme = useTheme();

    return (
        <Tooltip
        TransitionComponent={Zoom}
        title="Export Project"
        placement="left"
        >
            <IconButton size="medium" sx={{opacity: 0.8, color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main'}}>
                <DescriptionOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function TogglePromptButton() {
    const theme = useTheme();

    return (
        <Tooltip
        TransitionComponent={Zoom}
        title="Toggle Prompts"
        placement="left"
        >
            <IconButton size="medium" sx={{opacity: 0.8, color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main'}}>
                <SavingsOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}