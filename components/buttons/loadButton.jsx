import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function CreateButton() {
    const theme = useTheme();

    return (
        <Button variant={theme.palette.mode === 'dark' ? "text" : "outlined"}
                color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
                size="large">
        Load Project
        </Button>
    );
}