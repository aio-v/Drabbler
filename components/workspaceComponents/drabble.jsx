import React, { useContext, useState, useEffect, useRef } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,

  } from '@draft-js-plugins/buttons';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import { TextField, useTheme, Tooltip, Zoom } from '@mui/material';

import { GoalContext } from '../workspace';

import styles from './drabble.module.css';


export class Drabble extends React.Component {

    constructor(props) {
        super(props);
        this.inlineToolbarPlugin = createInlineToolbarPlugin();
        this.InlineToolbar = this.inlineToolbarPlugin.InlineToolbar;
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    componentDidMount() {
        if(localStorage.hasOwnProperty(this.props.drabbleKey)) {
            this.loadFromLocalStorage();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    onChange(editorState) {
        clearTimeout(this.timerID);
        this.timerID = setTimeout(() => {
            this.saveToLocalStorage();
        }, 2000);

        this.setState({
            editorState: editorState,
        });
    }

    loadFromLocalStorage() {
        this.setState({
            editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(localStorage.getItem(this.props.drabbleKey)))
            ),
        });
    }

    saveToLocalStorage() {
        const contentState = this.state.editorState.getCurrentContent();
        localStorage.setItem(this.props.drabbleKey, JSON.stringify(convertToRaw(contentState)));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
    
        return 'not-handled';
    }

    focus() {
        this.editor.focus();
    };

    render() {
        return (
            <div className={styles.container}>
                <Wrapper onClick={this.focus.bind(this)}>
                    <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder={"A drabble a day keeps the writer's block away..."}
                    plugins={[this.inlineToolbarPlugin]}
                    ref={(element) => {
                            this.editor = element;
                        }}
                    />
                    <this.InlineToolbar> 
                    {
                        (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <Separator {...externalProps} />
                            </div>
                        )
                    }
                    </this.InlineToolbar>
                </Wrapper>
                <div className={styles.subwrapper}>
                    <Prompt drabbleKey={this.props.drabbleKey} />
                    <WordCounter editorState={this.state.editorState} />
                </div>
            </div>
        );
    }
}

export function Wrapper({ onClick, children }) {
    const theme = useTheme();

    return (
        <div 
        className={styles.wrapper} 
        style={{backgroundColor: theme.palette.mode === 'dark' ? 'rgba(202, 202, 202, 0.1)' : 'rgba(202, 202, 202, 0.15)'}}
        onClick={onClick}>
            {children}
        </div>
    )
}

export function Prompt({ drabbleKey }) {
    const [loaded, setLoaded] = useState(false);
    const [prompt, setPrompt] = useState("");
    const theme = useTheme();

    useEffect(() => {
        if(localStorage.hasOwnProperty("PROMPT_" + drabbleKey)) {
            setPrompt(localStorage.getItem("PROMPT_" + drabbleKey))
        }
        setLoaded(true);
    }, [drabbleKey]);

    useEffect(() => {
        if(!loaded) return;
        localStorage.setItem("PROMPT_" + drabbleKey, prompt);
    }, [prompt]);

    const handleChange = (event) => {
        setPrompt(event.target.value);
    };

    return (
        <Tooltip 
        TransitionComponent={Zoom}
        title="Maximum 20 characters."
        placement="right-start"
        >
            <TextField 
                className="prompt_field"
                fullWidth
                helperText="Prompt"
                variant="standard"
                value={prompt}
                onChange={handleChange}
                color={theme.palette.mode === 'dark' ? 'primary' : 'secondary' }
                sx={{
                    mb: 1,
                }}
                inputProps={{
                    maxLength: 20,
                    style: {
                        fontFamily: 'Prompt',
                        fontWeight: 300,
                        textAlign: 'center'
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        textAlign: 'center',
                        fontFamily: 'Comfortaa',
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                    }
                }}
                />
        </Tooltip>
    );
}

export function WordCounter({ editorState }) {
    const [wordCount, setWordCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false); 
    const completeRef = useRef(null);
    const context = useContext(GoalContext);
    const theme = useTheme();

    useEffect(() => {
        const plainText = editorState.getCurrentContent().getPlainText('');
        const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
        const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
        const wordArray = cleanString.match(/([\w'-]+)/g); // matches words according to whitespace
        setWordCount(wordArray ? wordArray.length : 0);
    }, [editorState]);

    useEffect(() => {
        if(isComplete) {
            if(wordCount != context.wordCountGoal) {
                setIsComplete(false);
                context.counter.triggerCount(false);
            }
        }
        else if(wordCount == context.wordCountGoal) {
            setIsComplete(true);
            context.counter.triggerCount(true);
        }
    }, [wordCount, isComplete, context.wordCountGoal, context.counter]);

    useEffect(() => {
        completeRef.current = isComplete;
    }, [isComplete]);

    useEffect(() => {
        return () => {
            if(completeRef.current)
                context.counter.triggerCount(false);
        }
    }, []);

    return (
        <div 
        className={styles.word_counter}
        style={{
            color: wordCount > context.wordCountGoal ? 'rgb(209, 86, 86)' : 
                    wordCount == context.wordCountGoal ? (
                        theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.light
                    ) : ''
        }}
        >
            {wordCount} words
        </div>
    )
}