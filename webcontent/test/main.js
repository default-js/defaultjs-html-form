async function loadData() {
	console.log("loadData");
	const testData = {
		nofiled : "nofield",
		foo: {
			bar : {
				text1: "text1",
				text2: "text2"
			},
			text1: "text1"
		},
		field1: "invalid",
		field2: "load 2",
		field3: "load 3",
		field4: "load 4",
		container1: {
			field1: "message",
			field2: "load 2",
			field3: "load 3",
			field4: "load 4"
		},
		list1: [
			{
				field1: "field",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			},
			{
				field1: "message",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			},
			{
				field1: "invalid",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			}
		]
	};
	const testDataJson = JSON.stringify(testData);
	const form = document.querySelector("d-form");
	
	await form.data(testData);
	const data1 = await form.data();
	const data1Json = JSON.stringify(data1);

	console.log("eq", data1Json == testDataJson, testDataJson, data1Json, testData, data1);


	const data2 = await form.data(data1);
	const data2Json = JSON.stringify(data2);

	console.log("eq", data1Json == data2Json, data1Json, data2Json, data1, data2);




}

document.ready(() => {
	loadData();
});