import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Zoom, useTheme } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export function SaveButton() {
    const theme = useTheme();

    const saveFile = () => {
        const a = document.createElement('a');
        const blob = new Blob([JSON.stringify(localStorage)], {type : 'application/json'});
        a.download = 'project.dbb';
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    }

    return (
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Save Project"
        placement="left"
        onClick={saveFile}
        >
            <IconButton size="medium" sx={{color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)' }}>
                <SaveOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function LoadButton() {
    const theme = useTheme();

    const loadFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.dbb';
        const readFile = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.name.split('.').pop() != 'dbb') {
                alert("Oops! Did you choose the wrong file? Drabbler projects have a '.dbb' file extension.");
                return;
            }
            const fr = new FileReader();
            fr.onload = (e) => {
                const project = JSON.parse(e.target.result);
                if(project) {
                    Object.keys(project).forEach((k) => {localStorage.setItem(k, project[k])})
                }
            };
            fr.readAsText(file);
            window.location.reload(false);  // refreshes page to reload all project components from local storage
        }
        input.onchange = readFile;
        input.click();
    }; 

    return (
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title="Load Project"
        placement="left"
        >
            <IconButton 
            onClick={loadFile}
            size="medium" 
            sx={{color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'}}
            >
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
            <IconButton
            onClick={() => {alert("Coming soon :)")}} 
            size="medium" 
            sx={{
                color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'
            }}>
                <PictureAsPdfOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
}

export function TogglePromptButton() {
    const [loaded, setLoaded] = useState(false);
    const [promptMode, setPromptMode] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        if(localStorage.hasOwnProperty("prompt_mode"))
            setPromptMode(localStorage.getItem("prompt_mode") === 'true' ? true : false);
        setLoaded(true);
    }, []);

    useEffect(() => {
        if(!loaded) return;
        localStorage.setItem("prompt_mode", promptMode);
    }, [promptMode]);

    return (
        <>
        <Tooltip
        disableFocusListener
        TransitionComponent={Zoom}
        title={"Toggle Prompts " + (promptMode ? "Off" : "On")}
        placement="left"
        >
            <IconButton size="medium" 
            sx={{
                color: theme.palette.mode === 'dark' ? 'rgba(25, 9, 58, 0.7)' : 'rgb(255, 255, 255)'
            }}
            onClick={() => setPromptMode(prev => !prev)}
            >
                <SavingsOutlinedIcon sx={{transform: 'scaleX(-1)' }} />
            </IconButton>
        </Tooltip>
        {promptMode ? <></> : <style global jsx>{
                `.prompt_field {
                    display: none
                }`
            }</style>
        }
        </>
    );
}