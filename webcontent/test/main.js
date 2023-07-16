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
	const form = document.querySelector("d-form");

	await form.ready;
	
	await form.value(testData);
	const data = await form.value();
	console.log("1. correctly:", equalObjects(testData, data) == false);

	await form.value(data);
	const data2 = await form.value();
	console.log("2. correctly:", equalObjects(data, data2) == true);

	console.log(testData);
	console.log(data);
	console.log(data2);




}