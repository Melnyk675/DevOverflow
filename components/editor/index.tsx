'use client';

import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
} from '@mdxeditor/editor';

interface Props {
    value: string;
    fieldChange: (value: string) => void;
    editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({
    value,
    editorRef,
    fieldChange,
    ...props
  }: Props) => {
    return (
        <MDXEditor
          markdown={value}
          onChange={fieldChange}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin()
          ]}
          {...props}
          ref={editorRef}
        />
      )
   }

export default Editor;