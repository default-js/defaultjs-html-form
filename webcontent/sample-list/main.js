const loadData = async () => {

	const testData = {
		"list": [
			{"input" : "test"},
			{"input" : "test"},
			{"input" : "test"}
		]
	};

	const testDataJson = JSON.stringify(testData);

	const form = document.querySelector("d-form");
	await form.data(testData);
	const data = await form.data();
	const dataJson = JSON.stringify(data);

	console.log("eq", dataJson == testDataJson, testDataJson, dataJson, testData, data);
	

	setTimeout(async () => {
		const data = await form.data();
		const dataJson = JSON.stringify(data);
		console.log("eq after 5000ms", dataJson == testDataJson, testDataJson, dataJson, testData, data);
	}, 5000);	

};

