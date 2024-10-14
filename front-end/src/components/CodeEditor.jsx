import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Welcome!');
    const [output, setOutput] = useState('');

    const runCode = () => {
        // run code locally for now
        let output = '';
        const originalLog = console.log;
        console.log = (...args) => {
            output += args.map(String).join(' ') + '\n';
        };
    
        try {
            const wrappedCode = `(function() { ${code} })()`;
            eval(wrappedCode);
            setOutput(output || 'Code executed successfully, but produced no output.');
        } catch (error) {
            setOutput(error.toString());
        } finally {
            console.log = originalLog;
        }
    };

    return (
        <div className="w-full h-[90vh] flex flex-col">
            <div className="flex justify-between p-2 bg-gray-800">
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded"
                >
                    <option value="javascript">JavaScript</option>
                </select>
                <button 
                    onClick={runCode}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Run Code
                </button>
            </div>
            <Editor
                height="70%"
                language={language}
                value={code}
                onChange={setCode}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                }}
            />
            <div className="h-[30%] bg-gray-900 text-white p-4 overflow-auto">
                <h3 className="text-xl mb-2">Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;