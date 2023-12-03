import React, { useState } from "react";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (char) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    console.log("text", text, block);
    if (text === "#" || (char === " " && text.includes("#"))) {
      if (char === " ") {
        console.log("char", char, block.getText());

        if (text.length > 1 && text[0] === "#") {
          const newText = text.slice(1);
          const newContentState = Modifier.replaceText(
            contentState,
            selection.merge({
              anchorOffset: 0,
              focusOffset: text.length,
            }),
            newText
          );

          const newEditorState = EditorState.push(
            editorState,
            newContentState,
            "replace-text"
          );

          setEditorState(newEditorState);
          return "handled";
        }

        if (text === "#") {
          // Convert to Heading 1
          const newContentState = Modifier.setBlockType(
            contentState,
            selection,
            "header-one"
          );

          const newEditorState = EditorState.push(
            editorState,
            newContentState,
            "change-block-type"
          );

          setEditorState(newEditorState);
          return "handled";
        }
      }

      return "not-handled";
    } else if (text === "*") {
      if (text.length > 1 && text[0] === "#") {
        const newText = text.slice(1);
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          newText
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "replace-text"
        );

        setEditorState(newEditorState);
        return "handled";
      }

      if (text === "*") {
        // Convert to Heading 1
        const newText = text.slice(2);
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          newText
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "replace-text"
        );

        setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
        return "handled";
      }
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        handleBeforeInput={(char) => handleBeforeInput(char)}
      />
    </div>
  );
};

export default CustomEditor;
