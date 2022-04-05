import React from 'react';
import { AppBar, Container, Box } from '@mui/material';
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
                <Box 
                sx={{
                    display: "flex", 
                    justifyContent: "space-between",
                }}>
                    <Box sx={{ m: 1, flexGrow: 1 }}>
                        <Logo />
                    </Box>
                    <ModeSwitch />
                </Box>
            </Container>
        </AppBar>
    );
}