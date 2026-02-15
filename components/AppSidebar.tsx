import React from 'react';

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
import ImportData from './ImportData';
import { useAceEditor } from '@/context/AceEditorContext';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { commands } = useAceEditor();
  const editorMode = useAppStore((state) => state.editorMode);
  const setEditorMode = useAppStore((state) => state.setEditorMode);
  const isContentCopied = useAppStore((state) => state.isContentCopied);

  const onChangeEditorMode = (mode: EditorMode) => {
    setEditorMode(mode);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p className="p-2 bg-accent rounded-md">Tools</p>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <Button
          onClick={commands.generateFake}
          variant="outline"
          className="cursor-pointer"
          size="lg">
          Generate Fake JSON
        </Button>
        <ButtonGroup className="w-full grid grid-cols-2">
          <Button
            onClick={() => console.log('minify')}
            variant="outline"
            className="cursor-pointer"
            size="lg">
            Minify
          </Button>
          <Button
            onClick={() => console.log('Shinify')}
            variant="outline"
            className="cursor-pointer"
            size="lg">
            Shinify
          </Button>
        </ButtonGroup>
        <Button
          onClick={commands.copy}
          variant="outline"
          className="cursor-pointer disabled:opacity-100!"
          size="lg"
          disabled={isContentCopied}>
          {isContentCopied ? (
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
              onValueChange={onChangeEditorMode}
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

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="p-0">Import Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <ImportData />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
