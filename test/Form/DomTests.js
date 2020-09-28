import Form from "../../src/Form";
describe("Dom Tests", () => {	
	it("document.createElement test", async () => {		
		const form = document.createElement(Form.NODENAME);

		expect(form instanceof Form).toBe(true);

	});
});