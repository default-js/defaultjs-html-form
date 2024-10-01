import { treeFilter } from "./NodeHelper.js";
import Validation from "../Validation";
import Base from "../Base";
import { ATTRIBUTE_FOR } from "../Constants.js";

export const validateFields = async (data, fields) => {
    return (await Promise.all(fields.map(field => field.validate(data))))
        .reduce((valid, fieldValid) => valid ? fieldValid: false, true);
}

/** 
 * @function findValidations
 * 
 * Find all validations of root as children on dom tree
 * 
 * @param {Base} root 
 * 
 * @returns {Array<Validation>}
 */
export const findValidations = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof Base) return { accept: false, stop: true };
				else if (element instanceof Validation && element.attr(ATTRIBUTE_FOR) == null) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};