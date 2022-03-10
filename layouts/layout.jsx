import React from 'react';
import { Container, useTheme } from '@mui/material';
import { Header } from '../components/header/headerBar';

export function Layout({ children }) {
    const theme = useTheme();
    return (
        <React.Fragment>
        <Header />
        <Container maxWidth="lg">
        <main>
            {children}
        </main>
        </Container>
        </React.Fragment>
    )
}