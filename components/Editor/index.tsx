import CodeView from './CodeView';
import TreeView from './TreeView';
import { EditorModes, useAppStore } from '@/stores/useAppStore';
import { formatJsonByDepth, getJsonDepth } from '@/lib/jsonUtils';

const Editor = () => {
  const editorMode = useAppStore((state) => state.editorMode);
  const jsonValue = useAppStore((state) => state.jsonValue);
  const setJsonValue = useAppStore((state) => state.setJsonValue);

  const onChangeJsonValue = (value: string | undefined) => {
    try {
      if (value) {
        const depthLevel = getJsonDepth(value);
        const formatted = formatJsonByDepth(value, { level: depthLevel });
        setJsonValue(formatted);
      } else {
        setJsonValue(undefined);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        setJsonValue(value);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="shadow border border-gray-200 rounded-md m-1 h-[calc(100vh-4.6rem)] overflow-hidden">
      {editorMode === EditorModes.CODE ? (
        <CodeView value={jsonValue} onChange={onChangeJsonValue} />
      ) : (
        <TreeView value={JSON.parse(jsonValue || '{}')} />
      )}
    </div>
  );
};

export default Editor;
