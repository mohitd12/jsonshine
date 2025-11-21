import { JsonEditor, JsonEditorProps, githubLightTheme } from 'json-edit-react';
import { CircleChevronDown } from 'lucide-react';
import { useMemo } from 'react';

type TreeViewProps = Omit<JsonEditorProps, 'data'> & {
  value: JsonEditorProps['data'];
  fontSize?: string | number;
};

const TreeView = ({
  value,
  fontSize = 16,
  theme = githubLightTheme,
  indent = 2,
}: TreeViewProps) => {
  const isEmptyValue = useMemo(
    () => Object.values(value || {}).length < 1,
    [value]
  );

  return (
    <JsonEditor
      rootName=""
      viewOnly
      data={value}
      collapse={isEmptyValue ? 0 : undefined}
      theme={theme}
      rootFontSize={fontSize}
      indent={indent}
      minWidth={'100%'}
      maxWidth={'100%'}
      showCollectionCount={'when-closed'}
      icons={{
        chevron: (
          <CircleChevronDown
            className="text-slate-400 cursor-pointer"
            size={14}
          />
        ),
      }}
    />
  );
};

export default TreeView;
