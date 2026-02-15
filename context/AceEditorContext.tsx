'use client';

import React, {
  createContext,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { Editor } from 'ace-builds';

import { getRandomJson } from '@/lib/utils';
import {
  copyJsonToClipboard,
  formatJsonByDepth,
  getJsonDepth,
} from '@/lib/jsonUtils';

import { useAppStore } from '@/stores/useAppStore';

export type EditorCommands = {
  format: () => void;
  minify: () => void;
  validate: () => boolean;
  getValue: () => string;
  setValue: (value: string) => void;
  generateFake: () => void;
  copy: () => void;
};

type AceEditorContextType = {
  onEditorLoad: (editor: Editor) => void;
  commands: EditorCommands;
  editorRef: RefObject<Editor | null>;
};

const AceEditorContext = createContext<AceEditorContextType | null>(null);

export const AceEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const editorRef = useRef<Editor | null>(null);

  const setIsContentCopied = useAppStore((state) => state.setIsContentCopied);

  const onEditorLoad = (editor: Editor) => {
    editorRef.current = editor;
  };

  const commands: EditorCommands = useMemo(() => {
    const safeEditor = () => editorRef.current;

    return {
      getValue() {
        return safeEditor()?.getValue() ?? '';
      },

      setValue(value: string) {
        safeEditor()?.setValue(value, -1);
      },

      generateFake() {
        const fakeJsonValue = getRandomJson();
        const depthLevel = getJsonDepth(fakeJsonValue);

        const formatted = formatJsonByDepth(JSON.stringify(fakeJsonValue), {
          level: depthLevel,
        });

        safeEditor()?.setValue(formatted || '', -1);
      },

      async copy() {
        const isJsonCopied = await copyJsonToClipboard(
          safeEditor()?.getValue() ?? '',
        );

        if (!isJsonCopied) return;

        setIsContentCopied(true);

        setTimeout(() => {
          setIsContentCopied(false);
        }, Number(process.env.NEXT_PUBLIC_COPY_CONTENT_TIMEOUT_MS));
      },

      format() {
        try {
          const value = safeEditor()?.getValue();
          if (!value) return;

          const formatted = JSON.stringify(JSON.parse(value), null, 2);

          safeEditor()?.setValue(formatted, -1);
        } catch {}
      },

      minify() {
        try {
          const value = safeEditor()?.getValue();
          if (!value) return;

          const minified = JSON.stringify(JSON.parse(value));

          safeEditor()?.setValue(minified, -1);
        } catch {}
      },

      validate() {
        try {
          JSON.parse(safeEditor()?.getValue() || '');
          return true;
        } catch {
          return false;
        }
      },
    };
  }, []);

  return (
    <AceEditorContext.Provider value={{ onEditorLoad, commands, editorRef }}>
      {children}
    </AceEditorContext.Provider>
  );
};

export const useAceEditor = () => {
  const ctx = useContext(AceEditorContext);

  if (!ctx) {
    throw new Error('useAceEditor must be used inside AceEditorProvider');
  }

  return ctx;
};
