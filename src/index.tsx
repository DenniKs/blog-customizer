import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const getArticleStyleVariables = (
	articleState: ArticleStateType
): CSSProperties =>
	({
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties);

const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState(defaultArticleState);

	return (
		<main className={styles.main} style={getArticleStyleVariables(appliedArticleState)}>
			<ArticleParamsForm
				initialState={defaultArticleState}
				onApply={setAppliedArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
