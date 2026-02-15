import { FormEvent, useState } from 'react';
import { LinkIcon } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatJsonByDepth, getJsonDepth } from '@/lib/jsonUtils';
import { useAceEditor } from '@/context/AceEditorContext';

type ImportByUrlModalProps = {
  open: boolean;
  onToggleOpen: () => void;
};

const importByUrlSchema = z.object({
  url: z.preprocess(
    (value) => (typeof value === 'string' ? value.trim() : value),
    z
      .string()
      .min(1, 'URL is required.')
      .pipe(z.url('Please enter a valid URL.'))
      .refine(
        (value) => value.startsWith('http://') || value.startsWith('https://'),
        'URL must start with http:// or https://.',
      ),
  ),
});

export default function ImportByUrlDialog({
  open,
  onToggleOpen,
}: ImportByUrlModalProps) {
  const { commands } = useAceEditor();
  const [importUrl, setImportUrl] = useState('');
  const [isImportingUrl, setIsImportingUrl] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const resetDialogState = () => {
    setImportUrl('');
    setImportError(null);
    setIsImportingUrl(false);
  };

  const onDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialogState();
    }
    onToggleOpen();
  };

  const applyImportedJson = (raw: string) => {
    const depthLevel = getJsonDepth(raw);
    if (depthLevel === undefined) {
      setImportError('Invalid JSON. Please check the file or URL.');
      return false;
    }

    const formatted = formatJsonByDepth(raw, { level: depthLevel });
    if (!formatted) {
      setImportError('Invalid JSON. Please check the file or URL.');
      return false;
    }

    setImportError(null);
    commands.setValue(formatted);
    return true;
  };

  const onImportFromUrl = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = importByUrlSchema.safeParse({ url: importUrl });
    if (!parsed.success) {
      setImportError(parsed.error.issues[0]?.message ?? 'Invalid URL.');
      return;
    }

    setImportError(null);
    setIsImportingUrl(true);

    try {
      const response = await fetch(parsed.data.url);
      if (!response.ok) {
        setImportError(`Request failed (${response.status}).`);
        return;
      }

      const text = await response.text();
      const ok = applyImportedJson(text);
      if (ok) {
        onDialogOpenChange(false);
      }
    } catch {
      setImportError('Could not fetch the URL. Check the link and try again.');
    } finally {
      setIsImportingUrl(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent className="sm:max-w-sm p-0">
        <form onSubmit={onImportFromUrl}>
          <DialogHeader className="border-b p-4">
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon />
              Import Data Via URL
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <FieldGroup>
              <Field data-invalid={Boolean(importError)}>
                <Label htmlFor="url">API Endpoint URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="http:// or https://"
                  value={importUrl}
                  onChange={(e) => {
                    setImportUrl(e.target.value);
                    if (importError) {
                      setImportError(null);
                    }
                  }}
                  aria-invalid={Boolean(importError)}
                />
                <FieldError>{importError}</FieldError>
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="border-t p-4">
            <DialogClose>
              <Button
                type="button"
                className="cursor-pointer"
                variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isImportingUrl}>
              {isImportingUrl ? 'Importing...' : 'Import'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
