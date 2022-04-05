import React from 'react';
import { Typography, Box } from '@mui/material';

export function Intro() {
    return (
        <Box>
            <Typography variant="h1" sx={{fontFamily:'Comfortaa',fontWeight:300,}}>drab•ble</Typography>
            <Typography variant="h4" sx={{fontFamily:'Comfortaa',fontWeight:300,}}>noun</Typography>
            <Typography variant="h4" component="div" sx={{fontFamily:'Prompt',fontWeight:300,}}>
                <ol>
                    <li>A short piece of writing, often 100 words exactly.<br/>
                    <em>{'"I used Drabbler to write my 50 Prompt Challenge drabble series."'}</em>
                </li>
                </ol>
            </Typography>
        </Box>
    )
}