import { Container, useTheme } from '@mui/material';
import { Header } from '../components/header/headerBar';

export function Layout({ children }) {
    const theme = useTheme();
    return (
        <>
        <Header />
        <Container maxWidth="md">
        <main>
            {children}
        </main>
        </Container>
        </>
    )
}