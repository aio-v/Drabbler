import React from 'react';
import { Typography, Box } from '@mui/material';

export function Intro() {
    return (
        <Box 
        sx={{
            mt:9, 
            pt:4, 
            pb:8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:85}}>drab•ble</Typography>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:30}}>noun</Typography>
                <Typography component="div" sx={{fontFamily:'Prompt',fontWeight:300,fontSize:24}}>
                    <ol>
                        <li>A short piece of writing, often 100 words exactly.<br/>
                        <em>{'"I used Drabbler to write my 50 Prompt Challenge drabble series."'}</em>
                    </li>
                    </ol>
                </Typography>
            </Box>
        </Box>
    )
}