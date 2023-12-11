import React, { useState } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import "./customEditor.css";
import Button from "./Button";

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    // Load from local storage or create an empty EditorState
    const storedContent = localStorage.getItem("editorContent");
    return storedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(storedContent)))
      : EditorState.createEmpty();
  });

  const editorRef = React.createRef();

  const handleBeforeInput = (char) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();

    if (text === "#" || (char === " " && text.includes("#"))) {
      if (char === " ") {
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
    } else if (text === "```" && char === " ") {
      // Remove the "```"
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(selection.getStartKey());
      const text = block.getText();

      if (text === "```" && char === " ") {
        debugger;
        // Remove the "```"
        const withoutBackticks = text.slice(0, -3);
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          withoutBackticks
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "replace-text"
        );

        // Add a new block with code block type and gray background
        const codeBlockSelection = newEditorState.getSelection();
        const codeBlockContentState = newEditorState.getCurrentContent();
        const codeBlockKey = codeBlockSelection.getStartKey();
        const codeBlockBlock =
          codeBlockContentState.getBlockForKey(codeBlockKey);

        if (codeBlockBlock.getType() !== "code-block") {
          const newCodeBlockContentState = Modifier.setBlockType(
            codeBlockContentState,
            codeBlockSelection,
            "code-block"
          );

          const newCodeBlockEditorState = EditorState.push(
            newEditorState,
            newCodeBlockContentState,
            "change-block-type"
          );

          setEditorState(newCodeBlockEditorState);
          return "handled";
        }
      }
    }
  };

  const handleSave = () => {
    // Save the editor content to local storage whenever it changes
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("editorContent", contentStateJSON);
  };

  return (
    <div>
      <div className="customContainer">
        <div></div>
        <div className="customTitle">Portle</div>
        <Button onSubmitSave={handleSave} />
      </div>
      <div className="editorContainer">
        <Editor
          customStyleMap={colorStyleMap}
          editorState={editorState}
          handleBeforeInput={(char) => handleBeforeInput(char)}
          onChange={setEditorState}
          placeholder="Write something colorful..."
          ref={editorRef}
        />
      </div>
    </div>
  );
};

const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)",
  },
};

export default CustomEditor;
