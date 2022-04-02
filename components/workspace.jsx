import React, { useState, useRef, useEffect, createContext, useMemo } from 'react';
import { Box, TextField, Typography, Tooltip, Zoom, useTheme } from '@mui/material';
import { DrabbleEditor } from './workspaceComponents/drabbleEditor';
import { LoadProjectMenu } from './workspaceComponents/menu';
import { LoadToTitleButton } from './buttons/toTitleButton';

export const GoalContext = createContext(100);

export function Workspace() {
    const [headerAtTop, setHeaderAtTop] = useState(true);
    const [wordCountGoal, setWordCountGoal] = useState(100);
    const [completedCount, setCompletedCount] = useState(0);
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

    const counter = useMemo(
        () => ({
            triggerCount: (meetsWordCountGoal) => {
                if(!meetsWordCountGoal)
                    setCompletedCount(prev => prev > 0 ? prev - 1 : 0);
                else
                    setCompletedCount(prev => prev + 1);
            }
        }), []
   );

    return (
        <Box>
            <Box id="scroll_tracker" ref={ref} style={{width: '1px', height: '1px', position: 'absolute', top: 0}}></Box>
            <GoalHeader classStyle={headerAtTop} completedCount={completedCount} goalCallback={(goal) => {setWordCountGoal(goal)}} />
            <GoalContext.Provider value={{wordCountGoal, counter}}>
                <DrabbleEditor />
            </GoalContext.Provider>
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

export function GoalHeader({ classStyle, completedCount, goalCallback }) {
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
            <Box className={"goal_box" + " " + (transition ? "transition" : "") + " " + (style ? "at_top" : "not_at_top")}>
                <DrabbleCount classStyle={style} count={completedCount} />
                <Typography className={style ? "at_top_text" : "not_at_top_text"}
                sx={{
                    fontFamily: 'Comfortaa',
                    fontWeight: 300,
                }}>
                    {" drabbles at"} 
                </Typography> 
                <InputGoal classStyle={style} goalCallback={goalCallback} /> 
                <Typography className={style ? "at_top_text" : "not_at_top_text"}
                sx={{
                    fontFamily: 'Comfortaa',
                    fontWeight: 300,
                }}> 
                    words per drabble 
                </Typography>
            </Box>
            <Box sx={{height: '100px', mb: '15px', display: !style ? 'block' : 'none'}}>
                {/*placeholder box to stop page from jumping on transition */}
            </Box>      
        </React.Fragment>
    )
}

export function DrabbleCount({ classStyle, count }) {
    return (
        <Typography className={classStyle ? "at_top_count" : "not_at_top_count"}
        sx={{
            fontFamily: 'Comfortaa',
            fontWeight: 300,
        }}>
        {count} 
        </Typography>
    )
}

export function InputGoal({ classStyle, goalCallback }) {
    const [loaded, setLoaded] = useState(false);
    const [goal, setGoal] = useState(100);
    const theme = useTheme();

    useEffect(() => {
        if(localStorage.hasOwnProperty("input_goal")) {
            changeGoal(parseInt(localStorage.getItem("input_goal")));
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if(!loaded) return;
        localStorage.setItem("input_goal", goal);
    }, [goal]);


    const changeGoal = (input) => {
        goalCallback(input);
        setGoal(input);
    }

    const handleChange = (e) => {
        setGoal(e.target.value);
    }

    const handleBlur = (e) => {
        if (Number(e.target.value) > 500) 
            changeGoal(500);
        else if (Number(e.target.value) < 10) 
            changeGoal(10);
        else
            changeGoal(Number.parseInt(e.target.value));
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
            className={classStyle ? "at_top_input" : "not_at_top_input"}
            type="number"
            variant="standard"
            helperText={classStyle ? "Target Length" : ''}
            color={theme.palette.mode === 'dark' ? "primary" : "secondary"}
            value={goal}
            sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                },
                "& input[type=number]": {
                    MozAppearance: "textfield",
                    fontFamily: 'Comfortaa',
                    fontWeight: 300,
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