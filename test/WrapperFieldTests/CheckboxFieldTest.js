import "../../browser";

const HTML = `<div>   
	<d-form>
		<d-page>
			<d-field name="checkboxfield">
				<input type="checkbox" value="1">
				<input type="checkbox" value="2">
			</d-field>
		</d-page>                
	</d-form>
</div>`;

describe("Wrapper Field - Checkbox Field", () => {
	it("update value by input field", async () => {
		const container = create(HTML).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();
		const input = container.find("input").first();

		const testValue = [input.value];
		input.checked = true;

		return new Promise((r) => {
			setTimeout(async () => {
				const value = await field.value();
				expect(value).toEqual(testValue);

				const data = await form.value();
				expect(data.checkboxfield).toEqual(testValue);
				container.remove();
				r();
			}, 1000);
		});
	});

	it("update value by field", async () => {
		const container = create(HTML).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

		const testValue = ["1"];
		await field.value(testValue);

		const value = await field.value();
		expect(value).toEqual(testValue);

		const data = await form.value();
		expect(data.checkboxfield).toEqual(testValue);
		container.remove();
	});
});
