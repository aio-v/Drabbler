import React from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,

  } from '@draft-js-plugins/buttons';

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import styles from '../../styles/Drabble.module.css';


export class Drabble extends React.Component {
    constructor(props) {
        super(props);
        this.InlineToolbarPlugin = createInlineToolbarPlugin();
        this.InlineToolbar = this.InlineToolbarPlugin.InlineToolbar;
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
            <div className={styles.editor} onClick={this.focus.bind(this)}>
                <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                placeholder={"A drabble a day keeps the writer's block away..."}
                plugins={[this.InlineToolbarPlugin]}
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
        );
    }
}