import React from 'react';
import { Box } from '@mui/material';
import { Drabble } from './drabble';


export function DrabbleEditor() {
    const [children, addChildren] = useState([<Drabble />]);
    return (
        <Box>
        <Drabble />
        <Drabble />
        <NewDrabbleButton />
        </Box>
    )
}

export function NewDrabbleButton() {

    const createDrabble = () => {
        console.log("click")
        return <Drabble />
    }

    return (
        <button className={styles.button} onClick={createDrabble}>
            New Drabble
        </button>
    );
}