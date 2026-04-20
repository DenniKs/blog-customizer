import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useCloseOnOutsideClickOrEsc } from './hooks/useCloseOnOutsideClickOrEsc';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
	const [articleFormState, setArticleFormState] = useState(initialState);
	const articleFormRef = useRef<HTMLDivElement>(null);

	useCloseOnOutsideClickOrEsc({
		isOpen: isArticleFormOpen,
		elementRef: articleFormRef,
		onClose: () => setIsArticleFormOpen(false),
	});

	const handleArticleFormToggle = () => {
		setIsArticleFormOpen((isOpen) => !isOpen);
	};

	const handleArticleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(articleFormState);
	};

	const handleArticleFormReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleFormState(initialState);
		onApply(initialState);
	};

	const handleArticleFormFieldChange =
		(fieldName: keyof ArticleStateType) => (option: OptionType) => {
			setArticleFormState((currentArticleState) => ({
				...currentArticleState,
				[fieldName]: option,
			}));
		};

	return (
		<div className={styles.wrapper} ref={articleFormRef}>
			<ArrowButton
				isOpen={isArticleFormOpen}
				onClick={handleArticleFormToggle}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isArticleFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleArticleFormSubmit}
					onReset={handleArticleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={articleFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleArticleFormFieldChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={articleFormState.fontSizeOption}
						onChange={handleArticleFormFieldChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleFormState.fontColor}
						options={fontColors}
						onChange={handleArticleFormFieldChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={articleFormState.backgroundColor}
						options={backgroundColors}
						onChange={handleArticleFormFieldChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={articleFormState.contentWidth}
						options={contentWidthArr}
						onChange={handleArticleFormFieldChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
