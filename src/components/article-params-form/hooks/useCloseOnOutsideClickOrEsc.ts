import { RefObject, useEffect } from 'react';

type UseCloseOnOutsideClickOrEscProps = {
	isOpen: boolean;
	elementRef: RefObject<HTMLElement>;
	onClose: () => void;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	elementRef,
	onClose,
}: UseCloseOnOutsideClickOrEscProps) => {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof Node &&
				!elementRef.current?.contains(target)
			) {
				onClose();
			}
		};

		const handleEscapeKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);
		window.addEventListener('keydown', handleEscapeKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
			window.removeEventListener('keydown', handleEscapeKeyDown);
		};
	}, [elementRef, isOpen, onClose]);
};
