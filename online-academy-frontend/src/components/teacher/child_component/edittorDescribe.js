
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Divider } from '@material-ui/core';


export default function EditorDescribe(props) {
    return (
        <div>
            <Editor
                editorState={props.editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={props.onEditorStateChange}
            />
                  {/* <Divider variant="middle" />

            <div
                dangerouslySetInnerHTML={{
                    __html: draftToHtml(convertToRaw(props.editorState.getCurrentContent()))
                }}>
            </div> */}
            

        </div>
    );
}