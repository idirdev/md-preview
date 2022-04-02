import { describe, it, expect } from 'vitest';
import { insertFormatting } from '../src/lib/markdown';
import { templates } from '../src/lib/templates';

describe('insertFormatting', () => {
  describe('bold', () => {
    it('should wrap selected text in bold markers', () => {
      const [result] = insertFormatting('hello world', 6, 11, 'bold');
      expect(result).toBe('hello **world**');
    });

    it('should insert placeholder bold text when nothing is selected', () => {
      const [result] = insertFormatting('hello ', 6, 6, 'bold');
      expect(result).toBe('hello **bold text**');
    });

    it('should return correct cursor positions for selection', () => {
      const [, start, end] = insertFormatting('hello world', 6, 11, 'bold');
      expect(start).toBe(8);  // after **
      expect(end).toBe(13);   // selectionEnd + 2
    });
  });

  describe('italic', () => {
    it('should wrap selected text in italic markers', () => {
      const [result] = insertFormatting('hello world', 6, 11, 'italic');
      expect(result).toBe('hello *world*');
    });

    it('should insert placeholder italic text when nothing is selected', () => {
      const [result] = insertFormatting('hello ', 6, 6, 'italic');
      expect(result).toBe('hello *italic text*');
    });
  });

  describe('strikethrough', () => {
    it('should wrap text in strikethrough markers', () => {
      const [result] = insertFormatting('hello world', 6, 11, 'strikethrough');
      expect(result).toBe('hello ~~world~~');
    });
  });

  describe('headings', () => {
    it('should insert h1 heading', () => {
      const [result] = insertFormatting('', 0, 0, 'h1');
      expect(result).toContain('# ');
    });

    it('should insert h2 heading', () => {
      const [result] = insertFormatting('', 0, 0, 'h2');
      expect(result).toContain('## ');
    });

    it('should insert h3 heading', () => {
      const [result] = insertFormatting('', 0, 0, 'h3');
      expect(result).toContain('### ');
    });

    it('should add newline prefix when text precedes cursor', () => {
      const [result] = insertFormatting('some text', 9, 9, 'h1');
      expect(result).toBe('some text\n# Heading 1\n');
    });
  });

  describe('lists', () => {
    it('should insert unordered list marker', () => {
      const [result] = insertFormatting('', 0, 0, 'ul');
      expect(result).toContain('- ');
    });

    it('should insert ordered list marker', () => {
      const [result] = insertFormatting('', 0, 0, 'ol');
      expect(result).toContain('1. ');
    });

    it('should convert selected multiline text to unordered list', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const [result] = insertFormatting(text, 0, text.length, 'ul');
      expect(result).toContain('- Line 1');
      expect(result).toContain('- Line 2');
      expect(result).toContain('- Line 3');
    });
  });

  describe('code', () => {
    it('should wrap inline selection in backticks', () => {
      const [result] = insertFormatting('const x = 1', 0, 11, 'code');
      expect(result).toBe('`const x = 1`');
    });

    it('should wrap multiline selection in fenced code block', () => {
      const text = 'line 1\nline 2';
      const [result] = insertFormatting(text, 0, text.length, 'code');
      expect(result).toContain('```');
      expect(result).toContain('line 1');
      expect(result).toContain('line 2');
    });

    it('should insert placeholder for empty selection', () => {
      const [result] = insertFormatting('', 0, 0, 'code');
      expect(result).toBe('`code`');
    });
  });

  describe('codeblock', () => {
    it('should insert a fenced code block with language', () => {
      const [result] = insertFormatting('', 0, 0, 'codeblock');
      expect(result).toContain('```javascript');
      expect(result).toContain('```');
    });
  });

  describe('link', () => {
    it('should create a markdown link', () => {
      const [result] = insertFormatting('', 0, 0, 'link');
      expect(result).toBe('[link text](url)');
    });

    it('should use selected text as link text', () => {
      const [result] = insertFormatting('Click me', 0, 8, 'link');
      expect(result).toBe('[Click me](url)');
    });
  });

  describe('image', () => {
    it('should create a markdown image', () => {
      const [result] = insertFormatting('', 0, 0, 'image');
      expect(result).toBe('![alt text](image-url)');
    });
  });

  describe('table', () => {
    it('should insert a markdown table', () => {
      const [result] = insertFormatting('', 0, 0, 'table');
      expect(result).toContain('| Header 1 |');
      expect(result).toContain('| -------- |');
      expect(result).toContain('| Cell 1   |');
    });
  });

  describe('quote', () => {
    it('should insert a blockquote', () => {
      const [result] = insertFormatting('', 0, 0, 'quote');
      expect(result).toContain('> Quote');
    });

    it('should prefix selected lines with >', () => {
      const text = 'Line 1\nLine 2';
      const [result] = insertFormatting(text, 0, text.length, 'quote');
      expect(result).toContain('> Line 1');
      expect(result).toContain('> Line 2');
    });
  });

  describe('hr', () => {
    it('should insert a horizontal rule', () => {
      const [result] = insertFormatting('', 0, 0, 'hr');
      expect(result).toContain('---');
    });
  });

  describe('task', () => {
    it('should insert a task list item', () => {
      const [result] = insertFormatting('', 0, 0, 'task');
      expect(result).toContain('- [ ] Task item');
    });

    it('should convert selected lines to task items', () => {
      const text = 'Item 1\nItem 2';
      const [result] = insertFormatting(text, 0, text.length, 'task');
      expect(result).toContain('- [ ] Item 1');
      expect(result).toContain('- [ ] Item 2');
    });
  });

  describe('unknown format', () => {
    it('should return original value for unknown format', () => {
      const [result, start, end] = insertFormatting('hello', 0, 5, 'unknown');
      expect(result).toBe('hello');
      expect(start).toBe(0);
      expect(end).toBe(5);
    });
  });
});

describe('templates', () => {
  it('should have at least one template', () => {
    expect(templates.length).toBeGreaterThan(0);
  });

  it('should have required fields on each template', () => {
    for (const template of templates) {
      expect(template.name).toBeTruthy();
      expect(template.description).toBeTruthy();
      expect(template.content).toBeTruthy();
    }
  });

  it('should have the Getting Started template', () => {
    const getting = templates.find(t => t.name === 'Getting Started');
    expect(getting).toBeDefined();
    expect(getting!.content).toContain('# Welcome');
  });

  it('should have the API Documentation template', () => {
    const api = templates.find(t => t.name === 'API Documentation');
    expect(api).toBeDefined();
    expect(api!.content).toContain('# API Reference');
  });

  it('should have the Project README template', () => {
    const readme = templates.find(t => t.name === 'Project README');
    expect(readme).toBeDefined();
    expect(readme!.content).toContain('# Project Name');
  });
});
