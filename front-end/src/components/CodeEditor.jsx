import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

const CodeEditor = () => {
    const { id: meetingId } = useParams(); // Add this to get the meeting ID from URL
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Welcome!');
    const [output, setOutput] = useState('');

    const sendCodeUpdate = async (newCode) => {
        try {
            await fetch(`http://localhost:8080/code/${meetingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: newCode,
                    language
                }),
            });
        } catch (error) {
            console.error('Error sending code update:', error);
        }
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        sendCodeUpdate(newCode);
    };

    useEffect(() => {
        const fetchCodeHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/code/${meetingId}`);
                const history = await response.json();
                if (history.length > 0) {
                    // Get the most recent code update
                    const lastUpdate = history[history.length - 1];
                    setCode(lastUpdate.data.code);
                    setLanguage(lastUpdate.data.language);
                }
            } catch (error) {
                console.error('Error fetching code history:', error);
            }
        };

        fetchCodeHistory();
    }, [meetingId]);

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
        <div className="h-full flex flex-col">
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
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    automaticLayout: true,
                }}
            />
            <div className="h-[30%] w-full bg-gray-900 text-white p-4 overflow-auto">
                <h3 className="text-xl mb-2">Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;