'use client';

import React, { FC, useEffect, useState } from 'react';
import { Allotment } from 'allotment';
import CodeEditor from './CodeEditor';
import ManagePanel from './ManagePanel';
import { LOCAL_STORAGE_CODE_KEY } from './problem.constants';
import fetcher from '../../../utils/fetcher';
import { IResponseCompiler, Verdict } from './compiler.d';
import SpinLoader from './SpinLoader';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import { Problem } from '../../../models/problem/problem.type';
import ProblemService from '../../../services/problem.service';
import CompilerService, { TLanguage } from '../../../services/compiler.service';
import Comments from './Comments';

interface ProblemPageContent {
	id: string,
}

enum SelectedPanel {
	Desc,
	Sol,
	Comments,
}

const ProblemPageContent: FC<ProblemPageContent> = ({ id }) => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;
	CompilerService.axiosAuth = axiosAuth;

	const [problem, setProblem] = useState<Problem>();

	useEffect(() => {
		fetchProblem();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const fetchProblem = async () => { 
		try {
			const res = await ProblemService.findOne(id);
			setProblem(res.data);
		} catch (e: any) {
			console.log(e);
		}
	}

	const storedCodeBuffer = Buffer.from(localStorage.getItem(LOCAL_STORAGE_CODE_KEY + problem?.id) || []);

	const [colorDesc, setColorDesc] = useState<string>('bg-main-blue');
	const [colorSol, setColorSol] = useState<string>('bg-command-blue');
	const [colorComments, setcolorComments] = useState<string>('bg-command-blue');
	const [selectedPanel, setSelectedPanel] = useState<SelectedPanel>(SelectedPanel.Desc);
	const [code, setCode] = useState<Buffer>(storedCodeBuffer);
	const [lang, setLang] = useState<TLanguage>('js');	
	const [compilerResponse, setCompilerResponse] = useState<IResponseCompiler>();
	const [disable, setDisable] = useState<boolean>(false);
	const [btnRunStyle, setBtnRunStyle] = useState<string>('hover:bg-orange-500');
	const [btnSubmitStyle, setBtnSubmitStyle] = useState<string>('hover:bg-lime-800');
	const [loading, setLoading] = useState<boolean>(false);

	const switchToDesc = (e) => {
		setSelectedPanel(SelectedPanel.Desc);
		setColorDesc('bg-main-blue');
		setColorSol('bg-command-blue');
		setcolorComments('bg-command-blue');
	};

	const switchToSol = (e) => {
		setSelectedPanel(SelectedPanel.Sol);
		setColorSol('bg-main-blue');
		setColorDesc('bg-command-blue');
		setcolorComments('bg-command-blue');
	};

	const switchToComments = (e) => {
		setSelectedPanel(SelectedPanel.Comments);
		setcolorComments('bg-main-blue');
		setColorSol('bg-command-blue');
		setColorDesc('bg-command-blue');
	};

	const getCode = (usercode: string) => {
		const codeBuffer = Buffer.from(usercode);
		setCode(codeBuffer);
	};

	const fetchCompiledInfo = async (e) => {
		setDisable(true);
		setBtnRunStyle('opacity-60');
		setBtnSubmitStyle('opacity-60');
		setLoading(true);
		try {
			const response = await CompilerService.compile({
				lang,
				code,
				problemId: problem!.id,
				submit: e.currentTarget.id === 'submit' ? true : false,
			})
			setCompilerResponse(response.data);
			setDisable(false);
			setBtnRunStyle('hover:bg-orange-500');
			setBtnSubmitStyle('hover:bg-lime-800');
			setLoading(false);
		} catch (e) {
			setDisable(false);
			setBtnRunStyle('hover:bg-orange-500');
			setBtnSubmitStyle('hover:bg-lime-800');
			setLoading(false);
		}
	};

	return (
		<Allotment className='flex'>
			<Allotment.Pane snap minSize={400} preferredSize={650}>
				<ManagePanel>
					<div
						className={'h-11 border-t border-r border-nav-blue pt-2 cursor-pointer w-24 ' + colorDesc}
						onClick={switchToDesc}
					>
						<div className='text-center'>Description</div>
					</div>
					<div
						className={'h-11 border-t border-r border-nav-blue pt-2 cursor-pointer w-24 ' + colorSol}
						onClick={switchToSol}
					>
						<div className='text-center'>Solution</div>
					</div>
					<div
						className={'h-11 border-t border-r border-nav-blue pt-2 cursor-pointer w-24 ' + colorComments}
						onClick={switchToComments}
					>
						<div className='text-center'>Comments</div>
					</div>
				</ManagePanel>
				{
					selectedPanel === SelectedPanel.Desc
						?
						<div className='px-2 mt-3'>
							<div>{problem?.description}</div>
							<ul className='pt-4 pl-2 list-disk'>
								<p>Constraints:</p>
								{problem?.constraints?.map((e, i) => (
									<li key={i} className='pt-1'><p>{e}</p></li>
								))}
							</ul>
						</div>
						: 
						selectedPanel === SelectedPanel.Sol
						?
						<div className='px-2 mt-3'>
							{problem?.solution}
						</div>
						:
						<div className='px-2 mt-3'>
							<Comments problemId={id} />
						</div>
				}
			</Allotment.Pane>
			<Allotment.Pane minSize={500}>
				<Allotment vertical>
					<Allotment.Pane minSize={300} className='flex flex-col'>
						<ManagePanel>
							<div className='w-full justify-between flex'>
								<div className='ml-8 text-command-blue'>
									<select 
										className='form-select rounded-md py-0' 
										onChange={e => setLang(e.target.value as TLanguage)} value={lang}>
										<option value='js'>JavaScript</option>
										<option value='py'>Python</option>
									</select>
								</div>
								<div className='mr-4 justify-between w-56 flex'>
									<button
										id='run' 
										className={'bg-orange-400 rounded-md px-3 ml-12 ' + btnRunStyle}
										onClick={fetchCompiledInfo}
										disabled={disable}
									>
										Run code
									</button>
									<button
										id='submit' 
										className={'bg-lime-700 rounded-md px-3 ' + btnSubmitStyle}
										onClick={fetchCompiledInfo}
										disabled={disable}
									>
										Submit
									</button>
								</div>
							</div>
						</ManagePanel>
						<CodeEditor getCode={getCode} pageID={problem?.id} />
					</Allotment.Pane>
					<Allotment.Pane preferredSize={275} minSize={275} maxSize={275}>
						<ManagePanel>
							<span className='ml-4'>Console</span>
						</ManagePanel>
						<div className={'bg-github-dark min-w-fit h-[70%] mx-4 my-5 rounded-md pt-2 pl-2 pr-2 pb overflow-x-hidden overflow-y-auto flex ' + (loading ? 'justify-center items-center' : '')}>
							{loading ? (
								<SpinLoader />
							) : (
								compilerResponse?.verdict === Verdict.Accepted || compilerResponse?.verdict === Verdict.Correct
									? (
										<div className='pl-2 pt-2 pr-2 w-full flex justify-between'>
											<div className='text-xl text-green-600'>{compilerResponse?.verdict}</div>
											<div className='text-slate-300'>Run time: {compilerResponse?.runTime} sec</div>
										</div>
									)
									: compilerResponse?.verdict === Verdict.WrongAnswer
										? (
											<div className='flex flex-col w-full'>
												<div className='pl-2 pt-2 pr-2 flex justify-between'>
													<div className='text-xl text-red-600'>{compilerResponse?.verdict}</div>
													<div className='text-slate-300'>Run time: {compilerResponse?.runTime} sec</div>
												</div>
												<div className='pt-2'>{compilerResponse?.logs}</div>
											</div>
										)
										: compilerResponse?.verdict === Verdict.Error
											? (
												<div className='flex flex-col'>
													<div className='text-xl text-red-600 pl-2 pt-2'>{compilerResponse?.verdict}</div>
													<div className='pt-2 pl-1 flex flex-col'>
														{
															compilerResponse?.logs
																.split(',')
																.filter((s) => !!s && s !== ' ^')
																.map((s, i) => (
																	<div key={i}>{s}</div>
																))
														}
													</div>
												</div>
											)
											: (<></>)
							)}
						</div>
					</Allotment.Pane>
				</Allotment>
			</Allotment.Pane >
		</Allotment >
	);
};

export default ProblemPageContent;
