import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

export default function Logo() {
    return (
        <Typography variant="h4" sx={{fontFamily:'Comfortaa', fontWeight:700,}}>
            <Link href="/"><a>drabbler</a></Link>
        </Typography>
    )
}