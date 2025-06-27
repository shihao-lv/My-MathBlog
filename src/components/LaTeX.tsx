import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface LaTeXProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const LaTeX: React.FC<LaTeXProps> = ({ math, block = false, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          strict: false,
          trust: true,
          macros: {
            '\\RR': '\\mathbb{R}',
            '\\CC': '\\mathbb{C}',
            '\\ZZ': '\\mathbb{Z}',
            '\\QQ': '\\mathbb{Q}',
            '\\NN': '\\mathbb{N}',
          }
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    }
  }, [math, block]);

  return <div ref={containerRef} className={className} />;
};

// 导出一个函数，用于在文本中渲染数学公式
export const renderMathInText = (text: string): JSX.Element[] => {
  const parts: JSX.Element[] = [];
  let currentIndex = 0;
  let partIndex = 0;

  // Match display math ($$...$$) and inline math ($...$)
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]*?\$)/g;
  let match;

  while ((match = mathRegex.exec(text)) !== null) {
    // Add text before math
    if (match.index > currentIndex) {
      const textPart = text.slice(currentIndex, match.index);
      parts.push(<span key={`text-${partIndex++}`}>{textPart}</span>);
    }

    // Add math
    const mathContent = match[1];
    const isDisplayMath = mathContent.startsWith('$$');
    const cleanMath = isDisplayMath 
      ? mathContent.slice(2, -2).trim()
      : mathContent.slice(1, -1).trim();

    parts.push(
      <LaTeX 
        key={`math-${partIndex++}`}
        math={cleanMath} 
        block={isDisplayMath}
        className={isDisplayMath ? 'my-4' : 'inline'}
      />
    );

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(<span key={`text-${partIndex++}`}>{text.slice(currentIndex)}</span>);
  }

  return parts.length > 0 ? parts : [<span key="text-0">{text}</span>];
};