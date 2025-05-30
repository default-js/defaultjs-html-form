import BaseField from "../BaseField";

/**
 * 
 * @param {object} option 
 * @param {HTMLElement} option.root 
 * @param {Function} option.filter 
 * @returns 
 */
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


