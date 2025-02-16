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
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor';

import { useTheme } from 'next-themes';
import { basicDark } from "cm6-theme-basic-dark";
import '@mdxeditor/editor/style.css'
import "./dark-editor.css";

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
   const { resolvedTheme } = useTheme();

   const theme = resolvedTheme === "dark" ? [basicDark] : [];


    return (
        <MDXEditor
          key={resolvedTheme}
          markdown={value}
          ref={editorRef}
          className='background-light800_dark200 light-border-2
          markdown-editor dark-editor w-full grid border'
          onChange={fieldChange}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            imagePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
            codeMirrorPlugin({ 
               codeBlockLanguages: {
                  html: "html",
                  css: "css",
                  js: "javascript",
                  ts: "typescript",
                  saas: "saas",
                  scss: "scss",
                  txt: "txt",
                  sql: "sql",
                  bash: "bash",
                  json: "json",
                  "": "unspecified",
                  jsx: "JavaScript (React)",
                  tsx: "TypeScript (React)",
               },
               autoLoadLanguageSupport: true,
               codeMirrorExtensions: theme,     
            }),
            diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
            toolbarPlugin({
              toolbarContents: () => (
                <ConditionalContents 
                  options={[
                    {
                      when: (editor) => editor?.editorType === 'codeblock',
                      contents: () => <ChangeCodeMirrorLanguage />
                    },
                    {
                      fallback: () => (
                        <>
                         <UndoRedo />
                         <Separator />

                         <BoldItalicUnderlineToggles />
                         <Separator />

                         <ListsToggle />
                         <Separator />

                         <CreateLink />
                         <InsertImage />
                         <Separator />

                         <InsertTable />
                         <InsertThematicBreak />

                         <InsertCodeBlock />
                        </>
                      )
                    }
                  ]}
                />
                )
            }),
          ]}
          {...props}
        />
      )
   }

export default Editor;