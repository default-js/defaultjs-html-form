import Field from "../../Field";

export default class Wrapper {
	static accept(field) {}

	constructor(field) {
		this.field = field;
	}

    set readonly(disabled) {}
    
    get hasValue() {
		if (this.value) return true;
		return false;
	}

	get value() {}

	set value(value) {}
}
