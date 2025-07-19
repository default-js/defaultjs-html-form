import { createUUID, define } from "@default-js/defaultjs-html-components";
import BaseField from "../../src/BaseField.js";
import "../../browser.js";

describe("Editable Test -", () => {
	const TESTFIELD_NODENAME = `testfield-${createUUID()}`;
	class TestField extends BaseField {
		static NODENAME = TESTFIELD_NODENAME;

		constructor(options) {
			super(options);
		}

		async init() {
			await super.init();
		}
	}

	define(TestField);

	it("default field", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();

		expect(field.editable).toBe(true);
		expect(field.readonly).toBe(false);

		form.remove();
	});

	it("default field - editable false", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field" editable-condition="false">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();

		expect(field.editable).toBe(false);
		expect(field.readonly).toBe(true);

		form.remove();
	});

	it("default field - editable false", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="test">
                        <input type="text">
                    </d-field>
                    <d-field name="field" editable-condition="typeof test !== 'undefined' && test == 'test'">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("[name='field']").first();

		expect(field.editable).toBe(false);
		expect(field.readonly).toBe(true);

		await form.value({ test: "test" });

		expect(field.editable).toBe(true);
		expect(field.readonly).toBe(false);

		form.remove();
	});

	it("default field - editable false", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="test">
                        <input type="text">
                    </d-field>
                    <${TESTFIELD_NODENAME} name="field" editable-condition="typeof test !== 'undefined' && test == 'test'">
                    </${TESTFIELD_NODENAME}>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("[name='field']").first();

		expect(field.editable).toBe(false);
		expect(field.readonly).toBe(true);

		await form.value({ test: "test" });

		expect(field.editable).toBe(true);
		expect(field.readonly).toBe(false);

		form.remove();
	});
});
