import { useEffect, useRef } from 'react';

export default function BinaryBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate binary columns - MANY MORE COLUMNS
    const columnCount = Math.floor(window.innerWidth / 20);
    const columns = [];

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = `binary-column ${Math.random() > 0.5 ? 'glow' : ''}`;
      
      // Generate random binary string - VERY LONG STRINGS
      const length = Math.floor(Math.random() * 40) + 30;
      let binaryText = '';
      for (let j = 0; j < length; j++) {
        binaryText += Math.random() > 0.5 ? '1' : '0';
        if (j < length - 1) binaryText += '\n';
      }
      column.textContent = binaryText;
      
      // Random positioning and timing
      column.style.left = `${(i / columnCount) * 100}%`;
      column.style.animationDuration = `${Math.random() * 6 + 10}s`;
      column.style.animationDelay = `${Math.random() * 3}s`;
      
      container.appendChild(column);
      columns.push(column);
    }

    // Generate floating code snippets - MANY MORE SNIPPETS
    const codeSnippets = [
      'const code = () => {}',
      'function build()',
      'import React from',
      'export default',
      'async await',
      'npm install',
      'git commit -m',
      'console.log()',
      'return true;',
      'if (condition)',
      'map(item =>',
      'useState()',
      'useEffect()',
      'className=""',
      'onClick={}',
      'props.data',
      'API.get()',
      'try { catch }',
      'Promise.all()',
      'setTimeout()',
      '{ ...spread }',
      'fetch(url)',
      'await response',
      'const [state]',
      'useCallback()',
    ];

    const floatingElements = [];
    for (let i = 0; i < 35; i++) {
      const floater = document.createElement('div');
      floater.className = 'floating-code';
      floater.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      floater.style.top = `${Math.random() * 100}%`;
      floater.style.left = `${Math.random() * 100}%`;
      floater.style.animationDelay = `${Math.random() * 10}s`;
      floater.style.animationDuration = `${Math.random() * 10 + 15}s`;
      container.appendChild(floater);
      floatingElements.push(floater);
    }

    // Generate circuit lines - MANY MORE LINES
    const circuitLines = [];
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line';
      line.style.width = `${Math.random() * 400 + 200}px`;
      line.style.top = `${Math.random() * 100}%`;
      line.style.left = `${Math.random() * 100}%`;
      line.style.animationDelay = `${Math.random() * 3}s`;
      line.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(line);
      circuitLines.push(line);
    }

    // Cleanup
    return () => {
      columns.forEach(col => col.remove());
      floatingElements.forEach(el => el.remove());
      circuitLines.forEach(line => line.remove());
    };
  }, []);

  return (
    <>
      <div className="hex-grid" />
      <div ref={containerRef} className="binary-background" />
    </>
  );
}
