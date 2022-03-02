import React from 'react';
import { AppBar, Container, Box, Typography } from '@mui/material';
import { ModeSwitch } from './modeSwitch';
import { Logo } from './logo';

export function Header() {
    return (
        <AppBar 
        position="sticky"
        color="transparent"
        elevation={0}
        >
            <Container maxWidth="auto" sx={{p: 2,}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Logo />
                    </Typography>
                    <ModeSwitch />
                </Box>
            </Container>
        </AppBar>
    );
}