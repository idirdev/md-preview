"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  if (!content.trim()) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center px-3 py-2 border-b border-border">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Preview
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
          <div className="text-center space-y-2">
            <p className="text-2xl opacity-30">Aa</p>
            <p>Start typing markdown in the editor</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 py-2 border-b border-border">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Preview
        </span>
      </div>

      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <div className="prose-preview max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Override checkbox rendering for task lists
              input: ({ type, checked, ...props }) => {
                if (type === "checkbox") {
                  return (
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="mr-2 accent-accent"
                      {...props}
                    />
                  );
                }
                return <input type={type} {...props} />;
              },
              // Add copy button to code blocks
              pre: ({ children, ...props }) => (
                <div className="relative group">
                  <pre {...props}>{children}</pre>
                  <button
                    onClick={() => {
                      const code = (props as { node?: { children?: { children?: { value?: string }[] }[] } })
                        ?.node?.children?.[0]?.children?.[0]?.value;
                      if (code) navigator.clipboard.writeText(code);
                    }}
                    className="absolute top-2 right-2 px-2 py-1 text-[10px] text-slate-500
                      bg-panel border border-border rounded opacity-0 group-hover:opacity-100
                      hover:text-slate-300 transition-all"
                  >
                    Copy
                  </button>
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
