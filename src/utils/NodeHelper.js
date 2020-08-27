import BaseField from "../BaseField";
import Validation from "../Validation";

export const treeFilter = ({ root, filter }) => {
	let elements = [];
	root.children.forEach((element) => {
		const { accept, stop = false } = filter(element);

		if (accept) elements.push(element);

		if (!stop) {
			const result = treeFilter({ root: element, filter });
			if (result instanceof Array) elements = elements.concat(result);
			else if (result) elements.push(result);
		}
	});

	return elements;
};

export const findFields = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (element instanceof BaseField) return { accept: true, stop: true };
			return { accept: false };
		},
	});
};

export const findValidations = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof BaseField) return { accept: false, stop: true };
				else if (element instanceof Validation) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};
