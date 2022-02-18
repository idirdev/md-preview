/**
 * Insert markdown formatting around selected text or at cursor position.
 * Returns [newValue, newCursorPosition].
 */
export function insertFormatting(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  format: string
): [string, number, number] {
  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);

  switch (format) {
    case "bold": {
      const wrapped = `**${selected || "bold text"}**`;
      const newValue = before + wrapped + after;
      const start = selectionStart + 2;
      const end = selected ? selectionEnd + 2 : start + 9;
      return [newValue, start, end];
    }

    case "italic": {
      const wrapped = `*${selected || "italic text"}*`;
      const newValue = before + wrapped + after;
      const start = selectionStart + 1;
      const end = selected ? selectionEnd + 1 : start + 11;
      return [newValue, start, end];
    }

    case "strikethrough": {
      const wrapped = `~~${selected || "strikethrough"}~~`;
      const newValue = before + wrapped + after;
      const start = selectionStart + 2;
      const end = selected ? selectionEnd + 2 : start + 13;
      return [newValue, start, end];
    }

    case "h1": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const text = `${prefix}# ${selected || "Heading 1"}\n`;
      const newValue = before + text + after;
      const start = selectionStart + prefix.length + 2;
      const end = selected ? start + selected.length : start + 9;
      return [newValue, start, end];
    }

    case "h2": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const text = `${prefix}## ${selected || "Heading 2"}\n`;
      const newValue = before + text + after;
      const start = selectionStart + prefix.length + 3;
      const end = selected ? start + selected.length : start + 9;
      return [newValue, start, end];
    }

    case "h3": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const text = `${prefix}### ${selected || "Heading 3"}\n`;
      const newValue = before + text + after;
      const start = selectionStart + prefix.length + 4;
      const end = selected ? start + selected.length : start + 9;
      return [newValue, start, end];
    }

    case "ul": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const lines = selected
        ? selected.split("\n").map((l) => `- ${l}`).join("\n")
        : "- List item";
      const newValue = before + prefix + lines + "\n" + after;
      const start = selectionStart + prefix.length + 2;
      const end = start + (selected ? selected.length + (selected.split("\n").length * 2) : 9);
      return [newValue, start, end];
    }

    case "ol": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const lines = selected
        ? selected.split("\n").map((l, i) => `${i + 1}. ${l}`).join("\n")
        : "1. List item";
      const newValue = before + prefix + lines + "\n" + after;
      const start = selectionStart + prefix.length + 3;
      const end = start + (selected || "List item").length;
      return [newValue, start, end];
    }

    case "code": {
      if (selected.includes("\n")) {
        const wrapped = `\n\`\`\`\n${selected}\n\`\`\`\n`;
        const newValue = before + wrapped + after;
        return [newValue, selectionStart + 5, selectionStart + 5 + selected.length];
      }
      const wrapped = `\`${selected || "code"}\``;
      const newValue = before + wrapped + after;
      const start = selectionStart + 1;
      const end = selected ? selectionEnd + 1 : start + 4;
      return [newValue, start, end];
    }

    case "codeblock": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const block = `${prefix}\`\`\`javascript\n${selected || "// code here"}\n\`\`\`\n`;
      const newValue = before + block + after;
      const start = selectionStart + prefix.length + 14;
      const end = start + (selected || "// code here").length;
      return [newValue, start, end];
    }

    case "link": {
      const text = selected || "link text";
      const wrapped = `[${text}](url)`;
      const newValue = before + wrapped + after;
      const urlStart = selectionStart + text.length + 3;
      return [newValue, urlStart, urlStart + 3];
    }

    case "image": {
      const alt = selected || "alt text";
      const wrapped = `![${alt}](image-url)`;
      const newValue = before + wrapped + after;
      const urlStart = selectionStart + alt.length + 4;
      return [newValue, urlStart, urlStart + 9];
    }

    case "table": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const table = `${prefix}| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n`;
      const newValue = before + table + after;
      const start = selectionStart + prefix.length + 2;
      return [newValue, start, start + 8];
    }

    case "quote": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const lines = selected
        ? selected.split("\n").map((l) => `> ${l}`).join("\n")
        : "> Quote";
      const newValue = before + prefix + lines + "\n" + after;
      const start = selectionStart + prefix.length + 2;
      const end = start + (selected || "Quote").length;
      return [newValue, start, end];
    }

    case "hr": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const newValue = before + prefix + "\n---\n\n" + after;
      const pos = selectionStart + prefix.length + 6;
      return [newValue, pos, pos];
    }

    case "task": {
      const prefix = before.endsWith("\n") || before.length === 0 ? "" : "\n";
      const lines = selected
        ? selected.split("\n").map((l) => `- [ ] ${l}`).join("\n")
        : "- [ ] Task item";
      const newValue = before + prefix + lines + "\n" + after;
      const start = selectionStart + prefix.length + 6;
      const end = start + (selected || "Task item").length;
      return [newValue, start, end];
    }

    default:
      return [value, selectionStart, selectionEnd];
  }
}
