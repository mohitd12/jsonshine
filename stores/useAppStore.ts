import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const EditorModes = {
  CODE: 'code',
  TREE: 'tree',
} as const;

export type EditorMode = (typeof EditorModes)[keyof typeof EditorModes];

type AppState = {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
  isSidebarOpen: boolean;
  toggleSidebarOpen: () => void;
  isContentCopied: boolean;
  setIsContentCopied: (isContentCopied: boolean) => void;
};

const makeStore = () =>
  create<AppState>()(
    devtools(
      persist(
        (set) => ({
          editorMode: EditorModes.CODE,
          isSidebarOpen: false,
          jsonValue: undefined,
          isContentCopied: false,

          setEditorMode: (mode: EditorMode) => {
            set(() => ({ editorMode: mode }));
          },
          toggleSidebarOpen: () => {
            set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
          },
          setIsContentCopied: (isContentCopied: boolean) => {
            set(() => ({ isContentCopied }));
          },
        }),
        {
          name: 'app-storage',
          partialize: (state) => ({
            isSidebarOpen: state.isSidebarOpen,
            editorMode: state.editorMode,
          }),
        },
      ),
    ),
  );

// export the store instance
export const useAppStore = makeStore();
