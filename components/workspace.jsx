import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, Tooltip, Zoom, useTheme } from '@mui/material';
import { DrabbleEditor } from './workspaceComponents/drabbleEditor';
import { LoadProjectMenu } from './workspaceComponents/menu';
import { LoadToTitleButton } from './buttons/toTitleButton';

import styles from '../styles/GoalHeader.module.css'

export function Workspace() {
    const [headerAtTop, setHeaderAtTop] = useState(true);
    const ref = useRef(null);

    const setHeaderPosition = (entries) => {
        const [ entry ] = entries;
        setHeaderAtTop(entry.isIntersecting);
    }

    useEffect(() => {
        const current = ref.current;
        const observer = new IntersectionObserver(setHeaderPosition, {
            root: null,
            rootMargin: '0px',
            threshold: 0.01,
        });
        if(current) observer.observe(current);
        return () => {
            if(current) observer.unobserve(current);
        }
    }, [ref]);


    return (
        <Box>
            <Box id="scroll_tracker" ref={ref} style={{width: '1px', height: '1px', position: 'absolute', top: 0}}></Box>
            <GoalHeader classStyle={headerAtTop} />
            <DrabbleEditor />
            <Box sx={{
                position: "fixed",
                bottom: "2.5%",
                right: "1.5%"
            }}>
                <LoadProjectMenu />
                <LoadToTitleButton />
            </Box>

        </Box>
    )
}

export function GoalHeader({ classStyle }) {
    const [transition, setTransition] = useState(false);
    const [style, setStyle] = useState(true);

    useEffect(() => {
        setTransition(true);
        const timeoutID = setTimeout(() => {            // apply style change after transition finishes
            setStyle(classStyle);
            setTransition(false);
        }, 250);
        return () => {
            clearTimeout(timeoutID);
        }
    }, [classStyle]);

    useEffect(() => {                                   // runs on component mount to stop transition on mounting
        setTransition(false);
    }, []);

    return (
        <React.Fragment>
            <Box className={styles.box + " " + (transition ? styles.transition : "") + " " + (style ? styles.at_top : styles.not_at_top)}>
                <DrabbleCount classStyle={style} />
                <Typography className={style ? styles.at_top_text : styles.not_at_top_text}>
                    {" drabbles at"} 
                </Typography> 
                <InputGoal classStyle={style} /> 
                <Typography  className={style ? styles.at_top_text : styles.not_at_top_text}> 
                    words per drabble 
                </Typography>
            </Box>
            <Box sx={{height: '100px', mb: '15px', display: !style ? 'block' : 'none'}}>
                {/*placeholder box to stop page from jumping on transition */}
            </Box>      
        </React.Fragment>
    )
}

export function DrabbleCount({ classStyle }) {
    return (
        <Typography className={classStyle ? styles.at_top_count : styles.not_at_top_count}>
        0 
        </Typography>
    )
}

export function InputGoal({ classStyle }) {
    const [goal, setGoal] = useState(100);
    const theme = useTheme();

    const handleChange = (e) => {
        setGoal(e.target.value);
    }

    const handleBlur = (e) => {
        if (Number(e.target.value) > 500) 
            setGoal(500);
        else if (Number(e.target.value) < 10) 
            setGoal(10);
        else
            setGoal(e.target.value);
    }

    return (
        <Tooltip 
        TransitionComponent={Zoom} 
        title={classStyle ? "A drabble's length is between 10 to 500 words. Default: 100 words." : ''} 
        placement="top"
        PopperProps={{
            style: {
                maxWidth: '260px',
            }
        }}>
            <TextField
            className={classStyle ? styles.at_top_input : styles.not_at_top_input}
            type="number"
            variant="standard"
            helperText={classStyle ? "Target" : ''}
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            value={goal}
            sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                },
                "& input[type=number]": {
                    MozAppearance: "textfield",
                },
                "& .MuiFormHelperText-root": {
                    opacity: 0,
                    transition: '.2s ease-out',
                },
                "&:hover .MuiFormHelperText-root": {
                    opacity: 1,
                },
            }}
            FormHelperTextProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'Comfortaa',
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                }
            }}
            onChange={handleChange}
            onBlur={handleBlur} 
            ></TextField>
        </Tooltip>
    )
}