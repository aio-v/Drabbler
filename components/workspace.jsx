import React, { useState } from 'react';
import { Box, TextField, Typography, Tooltip, Zoom, useTheme } from '@mui/material';
import { DrabbleEditor } from './workspaceComponents/drabbleEditor';
import { LoadProjectMenu } from './workspaceComponents/menu';
import { LoadToTitleButton } from './buttons/toTitleButton';


export function Workspace() {
    return (
        <Box>
            <GoalHeader />
            <DrabbleEditor />
            <Box sx={{
                position: "fixed",
                bottom: "2.5%",
                right: "1.5%"
            }}>
                <LoadProjectMenu />
                <LoadToTitleButton />
            </Box>

        </Box>
    )
}

export function GoalHeader() {
    return (
        <Box sx={{
            mt: 4,
            mb: 5,
        }}>
            <DrabbleCount />
            <Typography
            sx={{
                display: 'inline',
                fontFamily: 'Comfortaa',
                fontWeight: 300,
                fontSize: '28px'
            }}>
            {" drabbles at"} </Typography> 
            <InputGoal /> 
            <Typography
            sx={{
                display: 'inline',
                fontFamily: 'Comfortaa',
                fontWeight: 300,
                fontSize: '28px'
            }}> words per drabble </Typography>
        </Box> 
        
    )
}

export function DrabbleCount() {
    return (
        <Typography
            sx={{
                display: 'inline',
                fontFamily: 'Comfortaa',
                fontWeight: 200,
                fontSize: '48px'
        }}>
        0 
        </Typography>
    )
}

export function InputGoal() {
    const [goal, setGoal] = useState(100);
    const theme = useTheme();

    const handleChange = (e) => {
        setGoal(e.target.value);
    }

    const handleBlur = (e) => {
        if (Number(e.target.value) > 500) 
            setGoal(500);
        else if (Number(e.target.value) < 10) 
            setGoal(10);
        else
            setGoal(e.target.value);
    }

    return (
        <Tooltip 
        TransitionComponent={Zoom} 
        title="A drabble's length is between 10 to 500 words. Default: 100 words." 
        placement="top" 
        PopperProps={{
            style: {
                maxWidth: '255px',
            }
        }}>
            <TextField
            type="number"
            variant="standard"
            helperText="Word Limit"
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            value={goal}
            sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                },
                "& input[type=number]": {
                    MozAppearance: "textfield",
                },
                "& .MuiFormHelperText-root": {
                    opacity: 0,
                    transition: '.2s ease-out',
                },
                "&:hover .MuiFormHelperText-root": {
                    opacity: 1,
                },
            }}
            inputProps={{
                style: {
                    width: '4ch',
                    fontFamily: 'Comfortaa',
                    fontSize: '48px',
                    fontWeight: 200,
                    textAlign: 'center',
                }
            }}
            FormHelperTextProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'Comfortaa',
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                }
            }}
            onChange={handleChange}
            onBlur={handleBlur} 
            ></TextField>
        </Tooltip>
    )
}