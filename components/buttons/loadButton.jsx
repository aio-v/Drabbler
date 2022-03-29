import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';

export function LoadButton() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Button 
        variant={theme.palette.mode === 'dark' ? "text" : "outlined"}
        color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
        sx={{
            opacity: 0.8,
            fontSize: 19
        }}
        size="large"
        onClick={() => router.push('/project')}>
            Continue
        </Button>
    );
}