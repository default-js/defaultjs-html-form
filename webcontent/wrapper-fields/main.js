function loadData() {

	const form = document.querySelector("d-form");
	form.value({
		text: "textinput",
		number: 42,
		textarea: "textarea",
		singleCheckbox: true,
		multiCheckbox: ["value-2", "value-3"],
		radioinput: "value-2",
		select: "value-3",
		selectMultiple: ["value-1", "value-3"],
	});
}