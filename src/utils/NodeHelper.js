import Field from "../Field";
import Validation from "../Validation";

export const treeFilter = ({ root, filter }) => {
	const { accept, stop = false } = filter(root);

	if (stop) return accept ? root : null;

	let elements = accept ? [root] : [];

	root.children.forEach((element) => {
		const result = treeFilter({ root: element, filter });
		if (result instanceof Array) elements = elements.concat(result);
		else if (result) elements.push(result);
	});

	return elements;
};

export const findFields = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (element instanceof Field) return { accept: true, stop: true };
			return { accept: false };
		},
	});
};

export const findValidations = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof Field) return { accept: false, stop: true };
				else if (element instanceof Validation) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};
