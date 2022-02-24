import React from 'react';
import { useTheme } from '@mui/material';
import { TextField, Box } from '@mui/material';

export default function Title() {
    const theme = useTheme();
    return (
        <Box sx={{
            mt: 6,
            display: 'flex',
            flexDirection: 'column',
            alignContents: 'center',
            textAlign: 'center',
            rowGap: '50px',
        }}>
            <Box>
                <TextField
                id="title" 
                helperText="Title"
                variant="standard"
                margin="normal"
                color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
                inputBaseProps={{
                    styles: {
                        color: theme.palette.secondary.main
                    }
                }}
                inputProps={{
                    style: {
                        fontFamily: 'Prompt',
                        fontSize: 45,
                        textAlign: 'center'
                    },
                }}
                InputLabelProps={{
                    style: {
                        fontFamily: 'Prompt',
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        textAlign: 'center',
                        fontFamily: 'Prompt',
                        fontSize: 15,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                    }
                  }}
                />
            </Box>
            <TextField
            id="summary"
            helperText="Summary"
            minRows={9}
            multiline
            variant={theme.palette.mode === 'dark' ? "filled" : "outlined"}
            margin="normal"
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            inputProps={{
                style: {
                    fontFamily: 'Prompt',
                    fontSize: 25,
                    lineHeight: '35px',
                    
                },
            }}
            OutlinedInputProps={{
                style: {
                    notchedOutline: {
                        borderColor: '#FFFFFF'
                    }
                }
            }}
            InputLabelProps={{
                style: {
                    fontFamily: 'Prompt',
                },
            }}
            FormHelperTextProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'Prompt',
                    fontSize: 15,
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                }
            }} 
            />
        </Box>
    );
}


