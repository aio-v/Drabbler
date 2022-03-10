import React from 'react';
import { useTheme } from '@mui/material';
import { TextField, Box } from '@mui/material';
import { ToWorkspaceButton } from '../components/buttons/toWorkspaceButton';

export function Title() {
    const theme = useTheme();

    return (
        <Box sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignContents: 'center',
            textAlign: 'center',
            rowGap: 7,
        }}>
            <Box>
                <TextField
                fullWidth
                helperText="Title"
                variant="standard"
                margin="normal"
                color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
                inputProps={{
                    style: {
                        fontFamily: 'Prompt',
                        fontSize: 45,
                        fontWeight: 300,
                        textAlign: 'center'
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        textAlign: 'center',
                        fontFamily: 'Comfortaa',
                        fontSize: 15,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                    }
                  }}
                />
            </Box>
            <TextField
            helperText="Summary"
            minRows={9}
            multiline
            variant= "filled" //{theme.palette.mode === 'dark' ? "filled" : "outlined"}
            margin="normal"
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            sx={{
                "& .MuiInputBase-root": {
                    px: 2,
                },
                "& .MuiFilledInput-root": {
                    background: theme.palette.mode === 'dark' ? "" : "rgba(0, 0, 0, 0.02)",
                },
            }}
            inputProps={{
                style: {
                    fontFamily: 'Prompt',
                    fontSize: 24,
                    fontWeight: 300,
                    lineHeight: '35px',
                    
                },
            }}
            FormHelperTextProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'Comfortaa',
                    fontSize: 15,
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                }
            }} 
            />
            
            <ToWorkspaceButton />
        </Box>
    );
}


