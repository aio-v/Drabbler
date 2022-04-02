import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { TextField, Box } from '@mui/material';
import { LoadToWorkspaceButton } from '../components/buttons/toWorkspaceButton';

export function Title() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const theme = useTheme();

    useEffect(() => {
        if(localStorage.hasOwnProperty('title'))
            setTitle(localStorage.getItem('title'));
        if(localStorage.hasOwnProperty('summary'))
            setSummary(localStorage.getItem('summary'));
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        localStorage.setItem('title', e.target.value);
    }

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
        localStorage.setItem('summary', e.target.value);
    }

    return (
        <Box sx={{
            mt: '2%',
            display: 'flex',
            flexDirection: 'column',
            alignContents: 'center',
            textAlign: 'center',
            rowGap: '16px',
        }}>
            <Box>
                <TextField
                fullWidth
                helperText="Title"
                placeholder="365 Prompts Challenge"
                value={title}
                onChange={handleTitleChange}
                variant="standard"
                margin="normal"
                color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
                inputProps={{
                    style: {
                        fontFamily: 'Prompt',
                        fontSize: 50,
                        fontWeight: 300,
                        textAlign: 'center'
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        textAlign: 'center',
                        fontFamily: 'Comfortaa',
                        fontSize: 20,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                    }
                  }}
                />
            </Box>
            <TextField
            helperText="Summary"
            placeholder={'Short enough to try, long enough to inspire.\n\n365 word prompts to celebrate the year, each filled in 100-word snippets.'}
            value={summary}
            onChange={handleSummaryChange}
            minRows={9}
            multiline
            variant= "filled"
            margin="normal"
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            sx={{
                "& .MuiInputBase-root": {
                    px: '30px',
                },
                "& .MuiFilledInput-root": {
                    background: theme.palette.mode === 'dark' ? "" : "rgba(0, 0, 0, 0.02)",
                },
            }}
            inputProps={{
                style: {
                    fontFamily: 'Prompt',
                    fontSize: 27,
                    fontWeight: 300,
                    lineHeight: '42px',
                    
                },
            }}
            FormHelperTextProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'Comfortaa',
                    fontSize: 20,
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                }
            }} 
            />
            
            <LoadToWorkspaceButton />
        </Box>
    );
}


