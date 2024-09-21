import "../../index.js";
import { define } from "@default-js/defaultjs-html-components";
import BaseSubmitAction from "../../src/submitActions/BaseSubmitAction";
import { EVENT_SUBMIT_RESULTS } from "../../src/Constants";


describe("Custom Form Submit Action Tests", () => {

	class CustomSuccessAction extends BaseSubmitAction {
		
		static get NODENAME() { return "d-custom-form-submit-action-success-test"; }
		
		constructor(){
			super();
		}
		
		async execute(data) {
		}
	};
	define(CustomSuccessAction);
	
	class CustomSuccessFail extends BaseSubmitAction {
		
		static get NODENAME() { return "d-custom-form-submit-action-fail-test"; }
		
		constructor(){
			super();
		}
		
		async execute(data) {
			throw new Error();
		}
	};
	define(CustomSuccessFail);

	it("custom success action", async () => {
		const container = create("<div></div>").first();
		
		const form = create(`<d-form>
			<d-custom-form-submit-action-success-test></d-custom-form-submit-action-success-test>		
		</d-form>`).first();
		container.append(form);
		document.body.append(container);			
		
		
		const promise =  new Promise((r) => {
			form.on(EVENT_SUBMIT_RESULTS, (e) => {
				const results = e.detail;
				expect(results.length).toBe(1);
				expect(results[0].state).toBe("success");
			})	
		
			container.remove();	
			r();
		});		
		
		form.submit();
		
		return promise;
	});
	
	it("custom fail action", async () => {
		const container = create("<div></div>").first();
		
		const form = create(`<d-form>
			<d-custom-form-submit-action-fail-test></d-custom-form-submit-action-fail-test>		
		</d-form>`).first();
		container.append(form);
		document.body.append(container);			
		
		const promise =  new Promise((r) => {
			form.on(EVENT_SUBMIT_RESULTS, (e) => {
				const results = e.detail;
				expect(results.length).toBe(1);
				expect(results[0].state).toBe("fail");
			})	
		
			container.remove();	
			r();
		});		
		
		
		form.submit();
		
		return promise;
	});
});