import Field from "../Field";

const treeFilter = ({ root, filter }) => {
	if (filter(root)) return root;

	let elements = [];
	root.children.forEach((element) => {
		const result = treeFilter({ root: element, filter });
		if (result instanceof Array) elements = elements.concat(result);
		else if (result) elements.push(result);
	});

	return elements;
};

const findFields = (root) => {
	return treeFilter({root, filter: (element) => {
		if (element instanceof Field) return true;
		return false;
	}});
};

export { treeFilter, findFields };
