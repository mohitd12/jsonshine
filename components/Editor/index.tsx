import CodeView from './CodeView';
import { EditorModes, useAppStore } from '@/stores/useAppStore';
import TreeView from './TreeView';

const Editor = () => {
  const editorMode = useAppStore((state) => state.editorMode);
  const jsonValue = useAppStore((state) => state.jsonValue);
  const setJsonValue = useAppStore((state) => state.setJsonValue);

  const onChangeJsonValue = (value: string | undefined) => {
    try {
      setJsonValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow border border-gray-200 rounded-md m-1 h-[calc(100vh-4.6rem)] overflow-hidden">
      {editorMode === EditorModes.CODE ? (
        <CodeView value={jsonValue} onChange={onChangeJsonValue} />
      ) : (
        <TreeView value={{}} />
      )}
    </div>
  );
};

export default Editor;
