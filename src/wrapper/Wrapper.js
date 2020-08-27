import Field from "../Field";

export default class Wrapper {
	static accept(field) { }

	constructor(field) {
		this.field = field;
		this.init();
	}

	init() { }

	set readonly(disabled) { }

	acceptValue(value) {
		return true;
	}

	normalizeValue(value) {
		return value;
	}

	updatedValue() {

	}
	
	get value(){
		return null;
	}
}
