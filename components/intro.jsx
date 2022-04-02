import React from 'react';
import { Typography, Box } from '@mui/material';

export function Intro() {
    return (
        <Box 
        sx={{
            mt: '10%', 
            mb: '3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:90}}>drab•ble</Typography>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:35}}>noun</Typography>
                <Typography component="div" sx={{fontFamily:'Prompt',fontWeight:300,fontSize:30}}>
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