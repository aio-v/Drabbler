import React, { useContext, useState, useMemo } from 'react';
import { Box, Button, IconButton, useTheme, Collapse } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { List, arrayMove } from 'react-movable';
import { Drabble } from './drabble';

import styles from '../../styles/NewDrabbleButton.module.css';

const EditorContext = React.createContext();

export function DrabbleEditor() {
    const [children, addChildren] = useState([<Drabble key={uuidv4()} />]);
    const theme = useTheme();

    const editorAddFunction = useMemo(
        () => ({
            addDrabble: () => {
                addChildren(childrenArr => [...childrenArr, <Drabble key={uuidv4()} />]);
            }
        }), []
    );

    return (
        <EditorContext.Provider value={editorAddFunction}>
            <Box sx={{mb:10}}>
            <TransitionGroup>
            <List
            values={children}
            onChange={({ oldIndex, newIndex }) =>
                addChildren(arrayMove(children, oldIndex, newIndex))
            }
            renderList={({ children, props, }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, isDragged }) => 
                <li {...props}>
                    <Collapse in>
                        <Box>
                            <IconButton data-movable-handle
                            sx={{
                                position: 'absolute', 
                                left: '-4%', 
                                top: 'calc(50% - 25px)', 
                                cursor: isDragged ? 'grabbing' : 'grab',
                                opacity: theme.palette.mode === 'dark' ? 0.2 : 0.2,
                            }}>
                                <DragIndicatorOutlinedIcon/>
                            </IconButton>
                            {value}
                        </Box>
                    </Collapse>
                </li>
            }
            transitionDuration={100}
            />
            </TransitionGroup>
            <NewDrabbleButton />
            </Box>
        </EditorContext.Provider>
    )
}

export function NewDrabbleButton() {
    const newDrabble = useContext(EditorContext);
    const theme = useTheme();

    return (
        <Button variant="text" color={theme.palette.mode === 'dark' ? "primary" : "secondary"} className={styles.button} onClick={newDrabble.addDrabble}>
            New Drabble
        </Button>
    );
}