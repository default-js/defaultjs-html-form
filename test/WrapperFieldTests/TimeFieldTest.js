import "../../browser";

describe("Wrapper Field - Time Field", () => {
	it("value update", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="timefield">
                            <input type="time">
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

		const date = new Date(`1970-01-01T10:00`);
		const TIMEFORMAT = new Intl.DateTimeFormat("default", {
			hour: "numeric",
			minute: "numeric",
		});
		input.value = TIMEFORMAT.format(date);

		return new Promise((r) => {
			setTimeout(async () => {
				const value = await field.value();
				expect(value.getTime()).toBe(date.getTime());

				const data = await form.value();
				expect(data.timefield.getTime()).toBe(date.getTime());

				container.remove();
				r();
			}, 1000);
		});
	});

	it("value update", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="timefield">
                            <input type="time">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

		const date = new Date(`1970-01-01T10:00`);
		await field.value(date);

		const value = await field.value();
		expect(value.getTime()).toBe(date.getTime());

		const data = await form.value();
		expect(data.timefield.getTime()).toBe(date.getTime());

		container.remove();
	});
});
