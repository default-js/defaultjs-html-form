async function loadData() {
	const data = {
		text: "textinput",
		number: 42,
		textarea: "textarea",
		singleCheckbox: true,
		multiCheckbox: ["value-2", "value-3"],
		radioinput: "value-2",
		select: "value-3",
		selectMultiple: ["value-1", "value-3"],
	};

	const form = document.querySelector("d-form");
	await form.value(data);
	const test = await form.value();

	console.log("equal:", equalObjects(data, test));
};


