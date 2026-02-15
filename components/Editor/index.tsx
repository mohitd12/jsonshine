import CodeView from './CodeView';
import TreeView from './TreeView';
import { EditorModes, useAppStore } from '@/stores/useAppStore';

const Editor = () => {
  const editorMode = useAppStore((state) => state.editorMode);

  return (
    <div className="shadow border border-gray-200 rounded-md m-1 h-[calc(100vh-4.6rem)] overflow-hidden">
      {editorMode === EditorModes.CODE ? (
        <CodeView />
      ) : (
        <TreeView value={JSON.parse('{}')} />
      )}
    </div>
  );
};

export default Editor;
