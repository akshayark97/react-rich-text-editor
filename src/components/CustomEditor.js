import React, { useState } from "react";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const focus = () => editorRef.current.focus();

  const editorRef = React.createRef();

  // const handleEditorChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  // };

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
    } else if (text === "*" && char === " ") {
      if (text.length > 1 && text[0] === "* ") {
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
    } else if (text === "**" && char === " ") {
      if (char === " ") {
        console.log(char);
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(selection.getStartKey());
        const text = block.getText();

        if (text.length > 1 && text[0] === "**") {
          // Clear the '** ' only when the user types any text
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

        if (text === "**") {
          const toggledColor = "red";

          // Apply the red color to the new text
          const contentState = Modifier.applyInlineStyle(
            editorState.getCurrentContent(),
            selection.merge({
              anchorOffset: selection.getAnchorOffset() - 2,
              focusOffset: selection.getFocusOffset(),
            }),
            toggledColor
          );

          const newEditorState = EditorState.push(
            editorState,
            contentState,
            "change-inline-style"
          );

          setEditorState(newEditorState);
          return "handled";
        }
      }
      return "not-handled";
    } else if (text === "***" && char === " ") {
      if (char === " ") {
        console.log(char);
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(selection.getStartKey());
        const text = block.getText();

        if (text.length > 1 && text[0] === "***") {
          // Clear the '** ' only when the user types any text
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

        if (text === "***") {
          const underline = "UNDERLINE";

          // Apply the red color to the new text
          const contentState = Modifier.applyInlineStyle(
            editorState.getCurrentContent(),
            selection.merge({
              anchorOffset: selection.getAnchorOffset() - 3,
              focusOffset: selection.getFocusOffset(),
            }),
            underline
          );

          const newEditorState = EditorState.push(
            editorState,
            contentState,
            "change-inline-style"
          );

          setEditorState(newEditorState);
          return "handled";
        }
      }
      return "not-handled";
    }
  };

  return (
    <div>
      <Editor
        customStyleMap={colorStyleMap}
        editorState={editorState}
        handleBeforeInput={(char) => handleBeforeInput(char)}
        onChange={setEditorState}
        placeholder="Write something colorful..."
        ref={editorRef}
      />
    </div>
  );
};

const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)",
  },
};

export default CustomEditor;
