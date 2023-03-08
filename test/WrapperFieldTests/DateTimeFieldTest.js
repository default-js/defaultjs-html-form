import "../../browser";

describe("Wrapper Field - Date Time Locale Field", () => {
	it("update value by input field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datetimefield">
                            <input type="datetime-locale">
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

		const date = new Intl.DateTimeFormat(navigator.language, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
			.format(new Date())
			.replace(" ", "T");
		input.value = date;

		return new Promise((r) => {
			setTimeout(async () => {
				const value = await field.value();
				expect(value).toBe(date);

				const data = await form.value();
				expect(data.datetimefield).toBe(date);

				container.remove();
				r();
			}, 1000);
		});
	});

	it("update value by field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datetimefield">
                            <input type="datetime-locale">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

		const date = new Intl.DateTimeFormat(navigator.language, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
			.format(new Date())
			.replace(" ", "T");
		await field.value(date);

		const value = await field.value();
		expect(value).toBe(date);

		const data = await form.value();
		expect(data.datetimefield).toBe(date);

		container.remove();
	});
});
