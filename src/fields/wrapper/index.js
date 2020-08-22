import Text from "./Text";
import Checkbox from "./Checkbox";
import Radio from "./Radio";

export const wrappers = [Text, Checkbox, Radio];

export const findWrapper = (field) => {
	for (let wrapper of wrappers) {
		if (wrapper.accept(field)) return new wrapper(field);
	}

	return null;
};
