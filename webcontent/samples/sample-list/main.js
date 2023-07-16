const loadData = async () => {

	const testData = {
		"list": [
			{"input" : "test"},
			{"input" : "test"},
			{"input" : "test"}
		]
	};

	const form = document.querySelector("d-form");
	await form.value(testData);
	const data = await form.value();

	console.log("load correct:", equalObjects(testData, data))
};

