const form = document.querySelector("d-form");

function loadDataMessage() {
	form.data({
		field1: "message"
	});
}

function loadDataInvalid() {
	form.data({
		field1: "valid"
	});
}
