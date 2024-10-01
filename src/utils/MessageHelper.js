import { treeFilter } from "./NodeHelper.js";
import Base from "../Base.js";
import { ATTRIBUTE_FOR } from "../Constants.js";
import Message from "../Message.js";

/** 
 * @function findMessages
 * 
 * Find all messages of root as children on dom tree
 * 
 * @param {Base} root 
 * 
 * @returns {Array<Validation>}
 */
export const findMessages = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof Base) return { accept: false, stop: true };
				else if (element instanceof Message && element.attr(ATTRIBUTE_FOR) == null) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};