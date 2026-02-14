import { useRef, useState } from 'react';
import { ChevronDownIcon, UploadIcon } from 'lucide-react';
import { formatJsonByDepth, getJsonDepth } from '@/lib/jsonUtils';
import { useAppStore } from '@/stores/useAppStore';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import ImportDataMenu from './ImportDataMenu';

export default function ImportData() {
  const setJsonValue = useAppStore((state) => state.setJsonValue);
  const [isImportMenuOpen, setIsImportMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onToggleOpenImportMenu = () => setIsImportMenuOpen(!isImportMenuOpen);

  const applyImportedJson = (raw: string) => {
    const depthLevel = getJsonDepth(raw);
    if (depthLevel === undefined) {
      return false;
    }

    const formatted = formatJsonByDepth(raw, { level: depthLevel });
    if (!formatted) {
      return false;
    }

    setJsonValue(formatted);
    return true;
  };

  const onFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const ok = applyImportedJson(text);
      if (ok) setIsImportMenuOpen(false);
    } finally {
      event.target.value = '';
    }
  };

  const onOpenFileExplorer = () => fileInputRef.current?.click();

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={onFileImport}
      />
      <ButtonGroup className="w-full">
        <Button
          onClick={onOpenFileExplorer}
          variant="outline"
          className="cursor-pointer items-center gap-2 flex-1"
          size="lg">
          <UploadIcon /> File Upload
        </Button>
        <ImportDataMenu
          open={isImportMenuOpen}
          onToggleOpen={onToggleOpenImportMenu}
          onOpenFileExplorer={onOpenFileExplorer}
          trigger={
            <Button
              variant="outline"
              className="cursor-pointer rounded-r-md"
              size="lg">
              <ChevronDownIcon />
            </Button>
          }
        />
      </ButtonGroup>
    </div>
  );
}
