import "../../browser";

const HTML = `<div>   
	<d-form>
		<d-page>
            <d-container name="container">
                <d-field name="textfield">
                    <input type="text">
                </d-field>
            </d-container>
		</d-page>                
	</d-form>
</div>`;

describe("Container Field", () => {
	it("update value", async () => {
		const container = create(HTML).first();
		document.body.append(container);

        const testData = {
            container: {
                textfield : "test-value"
            }
        };

		const form = container.find("d-form").first();
		const field = container.find("d-container").first();
        const textField = container.find("d-field").first();

        await textField.value(testData.container.textfield);

        expect(await field.value()).toEqual(testData.container);
        expect(await form.value()).toEqual(testData);

		container.remove();
	});
});
