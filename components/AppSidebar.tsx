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
import { CopyIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EditorMode, useAppStore } from '@/stores/useAppStore';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const editorMode = useAppStore((state) => state.editorMode);
  const setEditorMode = useAppStore((state) => state.setEditorMode);

  const onChangeMode = (mode: EditorMode) => {
    setEditorMode(mode);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p className="p-2 bg-accent rounded-md">Tools</p>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <ButtonGroup className="w-full grid grid-cols-2">
          <Button variant="outline" className="cursor-pointer" size="lg">
            Minify
          </Button>
          <Button variant="outline" className="cursor-pointer" size="lg">
            Prettify
          </Button>
        </ButtonGroup>
        <Button variant="outline" className="cursor-pointer" size="lg">
          <CopyIcon /> Copy JSON
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
