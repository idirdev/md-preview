"use client";

import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react";

export interface EditorHandle {
  getSelection: () => { start: number; end: number };
  setSelection: (start: number, end: number) => void;
  focus: () => void;
}

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = forwardRef<EditorHandle, EditorProps>(function Editor(
  { value, onChange },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useImperativeHandle(ref, () => ({
    getSelection() {
      const ta = textareaRef.current;
      if (!ta) return { start: 0, end: 0 };
      return { start: ta.selectionStart, end: ta.selectionEnd };
    },
    setSelection(start: number, end: number) {
      const ta = textareaRef.current;
      if (!ta) return;
      requestAnimationFrame(() => {
        ta.selectionStart = start;
        ta.selectionEnd = end;
        ta.focus();
      });
    },
    focus() {
      textareaRef.current?.focus();
    },
  }));

  useEffect(() => {
    setLineCount(value.split("\n").length);
  }, [value]);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = value.slice(0, start) + "  " + value.slice(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  }

  // Word and character count
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Editor
        </span>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span>{wordCount} words</span>
          <span>{charCount} chars</span>
          <span>{lineCount} lines</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 overflow-hidden bg-panel/50 border-r border-border
            text-right select-none pt-3 pr-2 pl-2"
          style={{ width: "3.5rem" }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="text-[11px] leading-[1.6rem] font-mono text-slate-600"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Write your markdown here..."
          className="flex-1 bg-transparent resize-none p-3
            font-mono text-sm leading-[1.6rem] text-slate-200
            focus:outline-none scrollbar-thin
            placeholder:text-slate-600"
        />
      </div>
    </div>
  );
});

export default Editor;
