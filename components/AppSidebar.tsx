import React, { useCallback, useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { ButtonGroup } from './ui/button-group';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EditorMode, useAppStore } from '@/stores/useAppStore';
import { copyJsonToClipboard } from '@/lib/jsonUtils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const editorMode = useAppStore((state) => state.editorMode);
  const setEditorMode = useAppStore((state) => state.setEditorMode);
  const jsonValue = useAppStore((state) => state.jsonValue);
  const setMinifiedJsonValue = useAppStore(
    (state) => state.setMinifiedJsonValue
  );
  const setPrettyJsonValue = useAppStore((state) => state.setPrettyJsonValue);
  const [isJsonCopied, setIsJsonCopied] = useState(false);

  const onChangeMode = (mode: EditorMode) => {
    setEditorMode(mode);
  };

  const onCopyJsonValue = useCallback(async () => {
    const isJsonCopied = await copyJsonToClipboard(jsonValue!);

    if (!isJsonCopied) return;

    setIsJsonCopied(true);
    setTimeout(() => {
      setIsJsonCopied(false);
    }, 950);
  }, [jsonValue]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p className="p-2 bg-accent rounded-md">Tools</p>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <ButtonGroup className="w-full grid grid-cols-2">
          <Button
            onClick={() => setMinifiedJsonValue()}
            variant="outline"
            className="cursor-pointer"
            size="lg">
            Minify
          </Button>
          <Button
            onClick={() => setPrettyJsonValue()}
            variant="outline"
            className="cursor-pointer"
            size="lg">
            Prettify
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => onCopyJsonValue()}
          variant="outline"
          className="cursor-pointer disabled:opacity-100!"
          size="lg"
          disabled={isJsonCopied}>
          {isJsonCopied ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy JSON
            </>
          )}
        </Button>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="p-0">View Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <ToggleGroup
              type="single"
              className="w-full grid grid-cols-2 gap-0"
              size="lg"
              onValueChange={onChangeMode}
              value={editorMode}>
              <ToggleGroupItem
                value="code"
                aria-label="Toggle Code mode"
                className="border rounded-none rounded-l-md border-r-0 cursor-pointer bg-white">
                Code
              </ToggleGroupItem>
              <ToggleGroupItem
                value="tree"
                aria-label="Toggle Tree mode"
                className="border rounded-none rounded-r-md cursor-pointer bg-white">
                Tree
              </ToggleGroupItem>
            </ToggleGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
