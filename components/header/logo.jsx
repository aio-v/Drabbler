import React from 'react';
import Link from 'next/link';
import { Typography, useTheme } from '@mui/material';

export function Logo() {
    const theme = useTheme();

    return (
        <Typography variant="h4" sx={{
            fontFamily:'Comfortaa', 
            fontWeight:700, 
            color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main'}}>
            <Link href="/"><a>drabbler</a></Link>
        </Typography>
    )
}