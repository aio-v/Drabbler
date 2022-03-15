import React from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createCounterPlugin from '@draft-js-plugins/counter';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,

  } from '@draft-js-plugins/buttons';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import { TextField, useTheme, Tooltip, Zoom } from '@mui/material';

import styles from '../../styles/Drabble.module.css';


export class Drabble extends React.Component {
    constructor(props) {
        super(props);
        this.inlineToolbarPlugin = createInlineToolbarPlugin();
        this.InlineToolbar = this.inlineToolbarPlugin.InlineToolbar;
        this.counterPlugin = createCounterPlugin();
        this.WordCounter = this.counterPlugin.CustomCounter;
        this.state = {
            editorState: EditorState.createEmpty(),
            wordCount: 0,
        };
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.countWords = this.countWords.bind(this);
    }

    countWords(str) {
        const wordArray = str.match(/([\w'-]+)/g); // matches words according to whitespace
        return wordArray ? wordArray.length : 0;
      }

    onChange(editorState) {
        this.setState({
            editorState: editorState
        });
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
                <div className={styles.wrapper} onClick={this.focus.bind(this)}>
                    <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder={"A drabble a day keeps the writer's block away..."}
                    plugins={[this.inlineToolbarPlugin, this.counterPlugin]}
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
                    
                </div>
                <div className={styles.subwrapper}>
                    <Prompt />
                    <div className={styles.word_counter}>
                        <this.WordCounter countFunction={this.countWords} /> words
                    </div>
                </div>
                
            </div>
        );
    }
}

export function Prompt() {
    const theme = useTheme();
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