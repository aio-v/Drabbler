import { Typography, Box } from '@mui/material';
import React from 'react';
import styles from '../styles/Intro.module.css'

export default function Intro() {
    return (
        <Box className={styles.boxWrapper} sx={{mt:9, pt: 4, pb: 8,}}>
            <Box className={styles.box}>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:'5em'}}>drab•ble</Typography>
                <Typography sx={{fontFamily:'Comfortaa',fontWeight:300,fontSize:'1.5em'}}>noun</Typography>
                <Typography sx={{fontFamily:'Prompt',fontWeight:300,fontSize:'1.5em'}}>
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