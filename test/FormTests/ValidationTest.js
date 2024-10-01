import { UUID } from "@default-js/defaultjs-common-utils";
import "../../browser.js";

describe("Validation Test -", () => {
	it("one validation as child of field", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field">
                        <input type="text">                        
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldValidations = field.validationHandle.validations;
		expect(fieldValidations != null).toBe(true);
		expect(fieldValidations.size).toBe(1);

		const pageValidations = page.validationHandle.validations;
		expect(pageValidations != null).toBe(true);
		expect(pageValidations.size).toBe(0);

		form.remove();
	});

	it("three validation as child of field", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field">
                        <input type="text">                        
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldValidations = field.validationHandle.validations;
		expect(fieldValidations != null).toBe(true);
		expect(fieldValidations.size).toBe(3);

		const pageValidations = page.validationHandle.validations;
		expect(pageValidations != null).toBe(true);
		expect(pageValidations.size).toBe(0);

		form.remove();
	});

	it("one validation for field by attribute", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                    </d-field>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldValidations = field.validationHandle.validations;
		expect(fieldValidations != null).toBe(true);
		expect(fieldValidations.size).toBe(1);

		const pageValidations = page.validationHandle.validations;
		expect(pageValidations != null).toBe(true);
		expect(pageValidations.size).toBe(0);

		form.remove();
	});

	it("three validation for field by attribute", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                    </d-field>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldValidations = field.validationHandle.validations;
		expect(fieldValidations != null).toBe(true);
		expect(fieldValidations.size).toBe(3);

		const pageValidations = page.validationHandle.validations;
		expect(pageValidations != null).toBe(true);
		expect(pageValidations.size).toBe(0);

		form.remove();
	});

	it("three validation for field by attribute and as children", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                    </d-field>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                    <d-validation for="#${id}" condition="$value != 'invalid'">valid</d-validation>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldValidations = field.validationHandle.validations;
		expect(fieldValidations != null).toBe(true);
		expect(fieldValidations.size).toBe(6);

		const pageValidations = page.validationHandle.validations;
		expect(pageValidations != null).toBe(true);
		expect(pageValidations.size).toBe(0);

		form.remove();
	});

	it("initial state not active", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                    </d-field>
                    <d-validation for="#${id}" condition="$value == 'valid'">invalid</d-validation>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const validations = form.find("d-validation");

		for (let validation of validations) {
			expect(validation != null).toBe(true);
			expect(validation.attr("active") == null).toBe(true);
		}

		form.remove();
	});

	it("state active", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-validation condition="$value == 'valid'">invalid</d-validation>
                    </d-field>
                    <d-validation for="#${id}" condition="$value == 'valid'">invalid</d-validation>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		await form.value({ field: "invalid" });
		const validations = form.find("d-validation");

		expect(validations.map((validation) => validation.attr("active") != null).every((e) => e)).toBe(true);

		form.remove();
	});
});
