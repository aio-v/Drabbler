import React, { useContext, useState, useMemo } from 'react';
import { Box, Button, IconButton, useTheme, Collapse } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Drabble } from './drabble';

import styles from '../../styles/DrabbleButtons.module.css';

const EditorContext = React.createContext();

export function DrabbleEditor() {
    const [children, setChildren] = useState([{
        drabble: <Drabble />,
        key: uuidv4(),
    }]);

    const addBtn = useMemo(
        () => ({
            addDrabble: () => {
                setChildren(childrenArr => [...childrenArr, {
                    drabble: <Drabble />,
                    key: uuidv4(),
                }]);
            }
        }), []
    );
    const delBtn = useMemo( 
        () => ({
            deleteDrabble: (id) => {
                setChildren(childrenArr => childrenArr.filter(drabble => drabble.key != id));
            }
        }), []
    );
    
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            children,
            result.source.index,
            result.destination.index );
   
        setChildren(() => items);
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    return (
        <EditorContext.Provider value={{addBtn, delBtn}}>
            <Box sx={{mb:10}}>
                <TransitionGroup>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='droppable'>
                            {(provided) => (
                                <div 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                >
                                    <DrabbleList drabbles={children} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </TransitionGroup>
                <NewDrabbleButton />
            </Box>
        </EditorContext.Provider>
    );
}

export const DrabbleList = React.memo(
    function DrabbleList({ drabbles }) {
        return drabbles.map((drabble, index) => (
            <DraggableDrabble drabble={drabble} index={index} key={drabble.key} />
        ))
    }
)

export function DraggableDrabble({ drabble, index }) {
    return (
        <Draggable key={drabble.key} draggableId={drabble.key} index={index}>
            {
                (provided) => (
                    <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    >
                        <Collapse in>
                            <Box className={styles.drabble_wrapper}>
                                <Box
                                sx={{
                                    position: 'absolute',
                                    left: '-4%', 
                                    top: 'calc(50% - 48px)', 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center', 
                                }}>
                                    <IconButton {...provided.dragHandleProps}
                                    sx={{
                                        opacity: 0.2,
                                    }}>
                                        <DragIndicatorOutlinedIcon/>
                                    </IconButton>
                                    <DeleteDrabbleButton id={drabble.key} />
                                </Box>
                                {drabble.drabble}
                            </Box>
                        </Collapse>
                    </div>
                )
            }
        </Draggable>
    )
}

export function NewDrabbleButton() {
    const editor = useContext(EditorContext);
    const theme = useTheme();

    return (
        <Button variant="text" color={theme.palette.mode === 'dark' ? "primary" : "secondary"} className={styles.new_button} onClick={editor.addBtn.addDrabble}>
            New Drabble
        </Button>
    );
}

export function DeleteDrabbleButton({ id }) {
    const editor = useContext(EditorContext);
    const theme = useTheme();

    return (
        <IconButton
        className={styles.delete_button} 
        onClick={() => editor.delBtn.deleteDrabble(id)} 
        color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
        >
            <RemoveCircleOutlineRoundedIcon />
        </IconButton>
    )
}

