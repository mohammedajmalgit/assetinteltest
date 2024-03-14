import React, { useEffect, useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyEditor({ setStyles, styles }) {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const [keys, setKeys] = useState([])
  useEffect(() => {
    const loadedContent = loadContentFromLocalStorage();
    if (loadedContent) {
      setEditorState(loadedContent);
    }
  }, []);

  const styleMap = {
    'HIGHLIGHT': {
      'backgroundColor': '#faed27',
    },
    'red': {
      'color': 'red'
    },
  }
  const handleKeyCommand = (command, editorState) => {
    console.log(command);
    if (command === 'custom-heading1') {
      const newEditorState = deleteChars(editorState, 1);
      setEditorState(RichUtils.toggleBlockType(newEditorState, 'header-one'));
      return 'handled';
    } else if (command === 'custom-bold') {
      const newEditorState = deleteChars(editorState, 1);
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'BOLD'));
      return 'handled';
    } else if (command === 'custom-red-font') {
      const newEditorState = deleteChars(editorState, 2);
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'red'))
      return 'handled';
    } else if (command === 'custom-underline') {
      const newEditorState = deleteChars(editorState, 3);
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE'));
      return 'handled';
    } else if (command === 'custom-highlight') {
      const newEditorState = deleteChars(editorState, 3);
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'HIGHLIGHT'))
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.key === ' ') {
      const sequence = keys.join('');
      setKeys([]);
      console.log(sequence);
      // Check for specific sequences
      if (sequence === 'Shift#') {
        setStyles({
          ...styles,
          heading: !styles.heading,
        });
        return 'custom-heading1';
      } else if (sequence === 'Shift*') {
        setStyles({
          ...styles,
          bold: !styles.bold,
        });
        return 'custom-bold';
      } else if (sequence === 'Shift**') {
        setStyles({
          ...styles,
          font: !styles.font,
        });
        return 'custom-red-font';
      } else if (sequence === 'Shift***') {
        setStyles({
          ...styles,
          underline: !styles.underline,
        });
        return 'custom-underline';
      } else if (sequence === '```') {
        setStyles({
          ...styles,
          highlight: !styles.highlight,
        });
        return 'custom-highlight';
      }
    } else {
      if ((keys.length > 0 || e.key === 'Shift')) {
        if (keys[0] && e.key === 'Shift') {
          return
        }
        // console.log(keys[0] && e.key === 'Shift');
        setKeys([...keys, e.key]);
      } else if (e.key === '`') {
        setKeys([...keys, e.key]);
      }
    }

    return getDefaultKeyBinding(e);
  };

  const saveContentToLocalStorage = (editorState) => {
    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const contentString = JSON.stringify(rawContentState);
      localStorage.setItem('draftjs_content', contentString);
      toast("Saved Successfully")
    } catch (error) {
      console.error('Error saving content to local storage:', error);
      toast("Error Saving")
    }
  };

  const loadContentFromLocalStorage = () => {
    try {
      const contentString = localStorage.getItem('draftjs_content');
      if (contentString === null) return EditorState.createEmpty();

      const rawContentState = JSON.parse(contentString);
      const contentState = convertFromRaw(rawContentState);
      return EditorState.createWithContent(contentState);
    } catch (error) {
      console.error('Error loading content from local storage:', error);
      return EditorState.createEmpty();
    }
  };

  const deleteChars = (editorState, count) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const endOffset = selection.getEndOffset() - count;

    console.log('End Offset:', endOffset);

    if (endOffset < 0) {
      console.log('Removing all characters');
      return EditorState.createEmpty();
    }

    const newSelection = selection.merge({
      anchorOffset: endOffset,
      focusOffset: selection.getEndOffset(),
    });

    console.log('New Selection:', newSelection.toJS());

    const newContentState = Modifier.removeRange(
      contentState,
      newSelection,
      'backward'
    );

    console.log('New Content State:', newContentState.toJS());

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'remove-characters'
    );

    console.log('New Editor State:', newEditorState.toJS());

    return newEditorState;
  };

  return (
    <div className='h-full w-full'>
      <button
        className="absolute right-[30px] top-[100px] px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
        onClick={() => saveContentToLocalStorage(editorState)}
      >
        Save
      </button>

      <Editor
        customStyleMap={styleMap}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
      />
      <ToastContainer />
    </div>
  )

}