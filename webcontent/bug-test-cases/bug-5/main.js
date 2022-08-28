async function logData() {
	const form = find("d-form").first();
	const log = find("#log").first();

	log.textContent = JSON.stringify(await form.value(), null, "\t");
}



const BaseField = defaultjs.html.form.BaseField;

class TestField extends BaseField{
	
	constructor(){
		super("test-value");
	}	
};

customElements.define("d-test-field", TestField)