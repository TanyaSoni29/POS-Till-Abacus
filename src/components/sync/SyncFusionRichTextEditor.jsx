// src/components/sync/SyncFusionRichTextEditor.jsx
import React, { useRef } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import {
  RichTextEditorComponent,
  Inject,
  Toolbar,
  Image,
  Link,
  HtmlEditor,
  QuickToolbar
} from '@syncfusion/ej2-react-richtexteditor';

// Syncfusion CSS इम्पोर्ट
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-richtexteditor/styles/material.css';

// लायसेंस की registration
registerLicense(import.meta.env.VITE_SYNC_URL || '');

const SyncFusionRichTextEditor = ({
  initialValue = '',
  onChange,
  height = 400
}) => {
  const rteRef = useRef(null);

  const handleChange = () => {
    if (onChange && rteRef.current) {
      onChange(rteRef.current.getContent());
    }
  };

  return (
    <RichTextEditorComponent
      ref={rteRef}
      value={initialValue}
      height={height}
      change={handleChange}
      toolbarSettings={{
        items: [
          'Bold','Italic','Underline','StrikeThrough',
          'FontName','FontSize','FontColor','BackgroundColor',
          'LowerCase','UpperCase','|',
          'Formats','Alignments','OrderedList','UnorderedList',
          'Outdent','Indent','|',
          'CreateLink','Image','|',
          'ClearFormat','Print','SourceCode','FullScreen','|',
          'Undo','Redo'
        ]
      }}
      quickToolbarSettings={{
        image: [
          'Replace','Align','Caption','Remove',
          'InsertLink','OpenImageLink','-',
          'EditImageLink','RemoveImageLink','Display',
          'AltText','Dimension'
        ],
        link: ['Open','Edit','UnLink']
      }}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
};

export default SyncFusionRichTextEditor;
