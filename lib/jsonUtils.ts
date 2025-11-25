export type FormatOptions = {
  level?: number;
  indent?: string;
};

/**
 * Take a JSON string (or undefined) and return a formatted JSON string that:
 * - expands object/array structure up to `level` depth (root = 1),
 * - renders nodes deeper than `level` as compact single-line JSON,
 *
 * @param text - JSON string to format. If `undefined` or `null`, returns `undefined`.
 * @param options - Formatting options. `level` controls expansion depth. `indent` controls indentation string.
 * @returns Formatted JSON string, or `undefined` when input is invalid/missing.
 */
export const formatJsonByDepth = (
  text?: string,
  options: FormatOptions = {}
): string | undefined => {
  if (text === undefined || text === null) return undefined;

  const { level = 1, indent = '  ' } = options;

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    return undefined;
  }

  if (typeof level !== 'number' || level <= 0) return JSON.stringify(parsed);

  function serialize(v: any, depth: number): string {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);

    if (depth > level) return JSON.stringify(v);

    if (Array.isArray(v)) {
      if (v.length === 0) return '[]';
      const inner = v.map((it) => serialize(it, depth + 1));
      const pad = indent.repeat(Math.max(0, depth - 1));
      const innerPad = indent.repeat(depth);
      return `[\n${innerPad}${inner.join(`,\n${innerPad}`)}\n${pad}]`;
    }

    const keys = Object.keys(v);
    if (keys.length === 0) return '{}';
    const pad = indent.repeat(Math.max(0, depth - 1));
    const innerPad = indent.repeat(depth);
    const parts = keys.map(
      (k) => `${JSON.stringify(k)}: ${serialize(v[k], depth + 1)}`
    );
    return `{\n${innerPad}${parts.join(`,\n${innerPad}`)}\n${pad}}`;
  }

  return serialize(parsed, 1);
};

/**
 * Depth definition:
 * - root object/array counts as 1
 * - only objects/arrays increase depth when nested
 * - primitives (string/number/boolean/null) do not increase depth
 *
 * @param input - JSON string or already-parsed object/array. If `undefined`/`null` returns `undefined`.
 * @returns Maximum depth (root = 1) or `undefined` on invalid input.
 */
export const getJsonDepth = (
  input: string | object | undefined
): number | undefined => {
  if (input === undefined || input === null) return undefined;

  let obj: any;
  try {
    obj = typeof input === 'string' ? JSON.parse(input) : input;
  } catch {
    return undefined;
  }

  function depthOf(node: any): number {
    if (node === null || typeof node !== 'object') return 0;
    const children = Array.isArray(node) ? node : Object.values(node);
    if (children.length === 0) return 1;
    let maxChild = 0;
    for (const c of children) {
      maxChild = Math.max(maxChild, depthOf(c));
    }
    return 1 + maxChild;
  }

  return depthOf(obj);
};

/**
 * Copies a JSON string exactly as provided.
 *
 * @param jsonText - The raw JSON string.
 * @returns `true` on success, `false` on failure.
 */
export const copyJsonToClipboard = async (
  jsonText: string
): Promise<boolean> => {
  if (!jsonText) return false;

  try {
    await navigator.clipboard.writeText(jsonText);
    return true;
  } catch {
    return fallbackCopy(jsonText);
  }
};

/** Fallback for older browsers (execCommand). */
const fallbackCopy = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
};
