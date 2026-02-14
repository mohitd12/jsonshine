import { useState } from 'react';
import { LinkIcon, UploadIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ImportByUrlDialog from './ImportByUrlDialog';

type ImportOtherProps = {
  open: boolean;
  onToggleOpen: () => void;
  onOpenFileExplorer: () => void;
  trigger: React.ReactNode;
};

export default function ImportDataMenu({
  open,
  onToggleOpen,
  onOpenFileExplorer,
  trigger,
}: ImportOtherProps) {
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);

  const onToggleUrlDialogOpen = () => setIsUrlDialogOpen(!isUrlDialogOpen);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={() => onToggleOpen()}>
        <DropdownMenuTrigger asChild className="rounded-r">
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="px-0">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer rounded-none px-4"
              onClick={onOpenFileExplorer}>
              <UploadIcon />
              Import via File Upload
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer rounded-none px-4"
              onClick={() => onToggleUrlDialogOpen()}>
              <LinkIcon />
              Import via URL
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ImportByUrlDialog
        open={isUrlDialogOpen}
        onToggleOpen={onToggleUrlDialogOpen}
      />
    </>
  );
}
