import "../../browser";

describe("Wrapper Field - Date Time Locale Field", () => {
	it("update value by input field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datetimefield">
                            <input type="datetime-local">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();
		const input = container.find("input").first();		

		const date = new Date();
		input.value = JSON.parse(JSON.stringify(date));

		const value = await field.value();
		expect(value.getTime()).toBe(date.getTime());

		const data = await form.value();
		expect(data.datetimefield.getTime()).toBe(date.getTime());

		container.remove();
	});

	/*
	it("update value by field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datetimefield">
                            <input type="datetime-local">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();
		const date = new Date();
		await field.value(date);

		const value = await field.value();
		expect(value.getTime()).toBe(date.getTime());

		const data = await form.value();
		expect(data.datetimefield.getTime()).toBe(date.getTime());

		container.remove();
	});


	it("update value by json date String", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datetimefield">
                            <input type="datetime-local">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();
		const date = new Date();
		const dateString = JSON.parse(JSON.stringify(date));

		await field.value(dateString);

		const value = await field.value();
		expect(value.getTime()).toBe(date.getTime());

		const data = await form.value();
		expect(data.datetimefield.getTime()).toBe(date.getTime());

		container.remove();
	});
	*/
});
