"use client";

import { useState, useRef, useCallback } from "react";
import Editor, { EditorHandle } from "@/components/Editor";
import Preview from "@/components/Preview";
import Toolbar from "@/components/Toolbar";
import { templates } from "@/lib/templates";

export default function Home() {
  const [markdown, setMarkdown] = useState(templates[0].content);
  const editorRef = useRef<EditorHandle>(null);

  const getSelection = useCallback(() => {
    if (editorRef.current) return editorRef.current.getSelection();
    return { start: 0, end: 0 };
  }, []);

  const setSelection = useCallback((start: number, end: number) => {
    if (editorRef.current) editorRef.current.setSelection(start, end);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">Md</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-200">MD Preview</h1>
              <p className="text-[10px] text-slate-500">by idirdev</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="bg-panel border border-border rounded-md px-2 py-1">
              GFM + Syntax Highlighting
            </span>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar
        value={markdown}
        onChange={setMarkdown}
        getSelection={getSelection}
        setSelection={setSelection}
      />

      {/* Split View */}
      <main className="flex-1 flex min-h-0">
        {/* Left: Editor */}
        <div className="w-1/2 border-r border-border flex flex-col min-h-[calc(100vh-6.5rem)]">
          <Editor
            ref={editorRef}
            value={markdown}
            onChange={setMarkdown}
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 flex flex-col min-h-[calc(100vh-6.5rem)]">
          <Preview content={markdown} />
        </div>
      </main>
    </div>
  );
}
