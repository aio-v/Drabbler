import React, { useContext, useState, useMemo } from 'react';
import { Box, Button, IconButton, useTheme, Collapse } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
        lastPos: true,
        key: uuidv4(),
    }]);

    const addBtn = useMemo(
        () => ({
            insertDrabble: (pos) => {
                setChildren((childrenArr) => {
                    if(pos == childrenArr.length - 1) {
                        childrenArr[childrenArr.length - 1].lastPos = false;
                        return [...childrenArr, {
                            drabble: <Drabble />,
                            lastPos: true,
                            key: uuidv4(),
                        }];
                    }
                        
                    childrenArr.splice(
                        pos + 1, 0, {
                            drabble: <Drabble />,
                            lastPos: false,
                            key: uuidv4(),
                        }
                    )
                    return [...childrenArr];
                })
            }
        }), []
    );
    const delBtn = useMemo( 
        () => ({
            deleteDrabble: (id) => {
                // TBA: Add code to stop deleting the last drabble
                setChildren(childrenArr => {
                    const filtered = childrenArr.filter(child => child.key != id);
                    if(filtered.length > 0 && !filtered[filtered.length - 1].lastPos)
                        filtered[filtered.length - 1].lastPos = true;
                    return filtered;
                });
            }
        }), []
    );
    const childrenArrSize = useMemo(
        () => (children.length), [children]
    )
    
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        if(result.destination.index == children.length - 1) {
            children[children.length - 1].lastPos = false;
            children[result.source.index].lastPos = true;
        }
        else if(result.source.index == children.length - 1) {
            children[children.length - 2].lastPos = true;
            children[result.source.index].lastPos = false;
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
        <EditorContext.Provider value={{addBtn, delBtn, childrenArrSize}}>
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
                                <Box className={styles.button_box}
                                sx={{
                                    position: 'absolute',
                                    left: '-4%', 
                                    top: 'calc(50% - 24px)', 
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
                            <NewDrabbleButton last={drabble.lastPos} pos={index} />
                        </Collapse>
                    </div>
                )
            }
        </Draggable>
    )
}

export function NewDrabbleButton({ last, pos }) {
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const editor = useContext(EditorContext);
    const theme = useTheme();

    return (
        <Box 
        sx={{ width: '100%', py: 2, cursor:'pointer' }} 
        onMouseEnter={() => setOnMouseEnter(true)} 
        onMouseLeave={() => setOnMouseEnter(false)}>
            <Collapse in={onMouseEnter || last} timeout={350}>
                    <Button 
                    className={styles.new_button} 
                    variant="text" 
                    color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
                    sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 233, 125, 0.1)' : 'rgba(110, 198, 255, 0.2)',
                    }}
                    onClick={() => editor.addBtn.insertDrabble(pos)}>
                        New Drabble
                    </Button>
            </Collapse>
        </Box>
    );
}

export function DeleteDrabbleButton({ id }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [disable, setDisable] = useState(false);
    const editor = useContext(EditorContext);
    const theme = useTheme();

    const handleClickOpen = () => {
        if(editor.childrenArrSize == 1) {
            setDisable(true);
            setTimeout(() => setDisable(false), 390);
        }
        else {
            setDisable(false);
            setOpenDialog(true);
        }
    };
    
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <IconButton
            onClick={handleClickOpen}
            className={disable ? styles.shake : " " + styles.delete_button} 
            color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
            >
                <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <Dialog
            open={openDialog}
            onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this drabble?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"> 
                        {"This action cannot be undone."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        editor.delBtn.deleteDrabble(id); 
                        handleClose();
                    }}>Delete Anyway</Button>
                    <Button onClick={handleClose}>Never Mind</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}