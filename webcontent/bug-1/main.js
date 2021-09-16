const form = document.querySelector("d-form");

function loadDataMessage() {
	form.value({
		field1: "message"
	});
}

function loadDataInvalid() {
	form.value({
		field1: "valid"
	});
}
