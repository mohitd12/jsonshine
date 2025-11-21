'use client';

import ReactAceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-searchbox';

const CodeView = ({
  value,
  onChange,
  theme = 'github',
  tabSize = 4,
  fontSize = 16,
}: IAceEditorProps) => {
  return (
    <ReactAceEditor
      mode="json"
      value={value}
      theme={theme}
      onChange={onChange}
      focus={true}
      showPrintMargin={false}
      tabSize={tabSize}
      wrapEnabled={true}
      width="100%"
      height="100%"
      fontSize={fontSize}
    />
  );
};

export default CodeView;
