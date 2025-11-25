import { formatJsonByDepth, getJsonDepth } from '@/lib/jsonUtils';
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
  jsonValue: string | undefined;
  setJsonValue: (value: string | undefined) => void;
  setMinifiedJsonValue: () => void;
  setPrettyJsonValue: () => void;
};

const makeStore = () =>
  create<AppState>()(
    devtools(
      persist(
        (set) => ({
          editorMode: EditorModes.CODE,
          isSidebarOpen: false,
          jsonValue: undefined,

          setEditorMode: (mode: EditorMode) => {
            set(() => ({ editorMode: mode }));
          },
          toggleSidebarOpen: () => {
            set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
          },
          setJsonValue: (value) => {
            set(() => ({ jsonValue: value }));
          },
          setMinifiedJsonValue: () => {
            set((state) => ({
              jsonValue: formatJsonByDepth(state.jsonValue, { level: 0 }),
            }));
          },
          setPrettyJsonValue: () => {
            set((state) => {
              const depthLevel = getJsonDepth(state.jsonValue);
              return {
                jsonValue: formatJsonByDepth(state.jsonValue, {
                  level: depthLevel,
                }),
              };
            });
          },
        }),
        {
          name: 'app-storage',
          partialize: (state) => ({
            isSidebarOpen: state.isSidebarOpen,
            editorMode: state.editorMode,
          }),
        }
      )
    )
  );

// export the store instance
export const useAppStore = makeStore();
