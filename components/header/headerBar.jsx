import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ModeSwitch from './modeSwitch';
import Logo from './logo';

export default function Header() {
    return (
        <AppBar 
        position="sticky"
        color="transparent"
        elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Logo />
                    </Typography>
                    <ModeSwitch />
                </Toolbar>
            </Container>
        </AppBar>
    );
}