import { Container, useTheme } from '@mui/material';
import Header from '../components/header/headerBar';

export default function Layout({ children }) {
    const theme = useTheme();
    return (
        <>
        <Header />
        <Container maxWidth="sm">
        <main>
            {children}
        </main>
        </Container>
        </>
    )
}