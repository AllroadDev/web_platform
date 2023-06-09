'use client';

import { FC, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { LOCAL_STORAGE_CODE_KEY } from './problem.constants';

interface CodeEditorProps {
	getCode: Function,
	pageID?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({ getCode, pageID = '' }) => {
	const initCode = 'module.exports = function solver(args) {\n\n};';
	const [code, setCode] = useState<string>(initCode);

	const codeChange = (value) => {
		setCode(value);
		getCode(value);
		localStorage.setItem('inputCode' + pageID, value);
	};

	useEffect(() => {
		setCode(localStorage.getItem(LOCAL_STORAGE_CODE_KEY + pageID) || initCode);
	}, [pageID]);

	return (
		<CodeMirror
			value={code}
			height="calc(100vh - 2.75rem - 3.5rem - 17.1875rem)"
			extensions={[javascript()]}
			theme={githubDark}
			onChange={codeChange}
		/>
	);
};

export default CodeEditor;