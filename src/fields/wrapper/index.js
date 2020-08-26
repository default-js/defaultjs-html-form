import Text from "./Text";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import File from "./File";

export const wrappers = [Text, Checkbox, Radio, File];

export const findWrapper = (field) => {
	for (let wrapper of wrappers) {
		if (wrapper.accept(field)) return new wrapper(field);
	}

	return null;
};
