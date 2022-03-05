"use client";

import { useState } from "react";
import { insertFormatting } from "@/lib/markdown";
import { templates, MarkdownTemplate } from "@/lib/templates";

interface ToolbarProps {
  value: string;
  onChange: (value: string) => void;
  getSelection: () => { start: number; end: number };
  setSelection: (start: number, end: number) => void;
}

interface ToolbarButton {
  label: string;
  format: string;
  title: string;
  shortcut?: string;
}

const TOOLBAR_GROUPS: ToolbarButton[][] = [
  [
    { label: "B", format: "bold", title: "Bold", shortcut: "Ctrl+B" },
    { label: "I", format: "italic", title: "Italic", shortcut: "Ctrl+I" },
    { label: "S", format: "strikethrough", title: "Strikethrough" },
  ],
  [
    { label: "H1", format: "h1", title: "Heading 1" },
    { label: "H2", format: "h2", title: "Heading 2" },
    { label: "H3", format: "h3", title: "Heading 3" },
  ],
  [
    { label: "UL", format: "ul", title: "Unordered list" },
    { label: "OL", format: "ol", title: "Ordered list" },
    { label: "Task", format: "task", title: "Task list" },
    { label: "Quote", format: "quote", title: "Blockquote" },
  ],
  [
    { label: "</>", format: "code", title: "Inline code" },
    { label: "```", format: "codeblock", title: "Code block" },
  ],
  [
    { label: "Link", format: "link", title: "Insert link" },
    { label: "Img", format: "image", title: "Insert image" },
    { label: "Table", format: "table", title: "Insert table" },
    { label: "---", format: "hr", title: "Horizontal rule" },
  ],
];

export default function Toolbar({
  value,
  onChange,
  getSelection,
  setSelection,
}: ToolbarProps) {
  const [showTemplates, setShowTemplates] = useState(false);

  function handleFormat(format: string) {
    const { start, end } = getSelection();
    const [newValue, newStart, newEnd] = insertFormatting(value, start, end, format);
    onChange(newValue);
    setSelection(newStart, newEnd);
  }

  function handleTemplate(template: MarkdownTemplate) {
    onChange(template.content);
    setShowTemplates(false);
  }

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-border bg-panel/50
      overflow-x-auto scrollbar-thin relative">
      {TOOLBAR_GROUPS.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {gi > 0 && <div className="w-px h-5 bg-border mx-1" />}
          {group.map((btn) => (
            <button
              key={btn.format}
              onClick={() => handleFormat(btn.format)}
              title={btn.title + (btn.shortcut ? ` (${btn.shortcut})` : "")}
              className="px-2 py-1 text-[11px] font-medium text-slate-400
                hover:text-slate-200 hover:bg-white/5 rounded transition-all
                whitespace-nowrap"
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}

      <div className="w-px h-5 bg-border mx-1" />

      {/* Templates dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="px-2 py-1 text-[11px] font-medium text-slate-400
            hover:text-slate-200 hover:bg-white/5 rounded transition-all
            whitespace-nowrap"
        >
          Templates
        </button>

        {showTemplates && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowTemplates(false)}
            />
            <div className="absolute top-full left-0 mt-1 w-64 bg-panel border border-border
              rounded-lg shadow-xl z-20 overflow-hidden">
              {templates.map((t) => (
                <button
                  key={t.name}
                  onClick={() => handleTemplate(t)}
                  className="w-full text-left px-3 py-2 hover:bg-white/5 transition-colors"
                >
                  <div className="text-xs font-medium text-slate-300">{t.name}</div>
                  <div className="text-[10px] text-slate-500">{t.description}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
