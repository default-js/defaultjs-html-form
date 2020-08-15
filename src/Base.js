class Base extends HTMLElement {

	constructor() {
		super();
	}

	get active() {
		return this.hasAttribute("active");
	}
	set active(active) {
		if (typeof active !== "boolean")
			throw new Error("argument must be a boolean");

		active ? this.attr("active", "") : this.attr("active", undefined);
    }
    
    toggleActive(){
        this.active = !this.active;
    }

	get readonly() {
		return this.hasAttribute("readonly");
	}
	set readonly(readonly) {
		if (typeof readonly !== "boolean")
			throw new Error("argument must be a boolean");

		readonly ? this.attr("readonly", "") : this.attr("readonly", undefined);
    }
    
    toggleReadonly(){
        this.readonly = !this.readonly;
    }

	get condition() {
        return true;
    }

    get valid() {
        return true;
    }

	get value() {
        return null;
    }

	set value(data) {}
}

export default Base;
