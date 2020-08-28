export const HTML_TAG_PREFIX = "d-";
export const TRIGGER_TIMEOUT = 100;
export const EVENTHANDLE_TIMEOUT = 200;

export const NODENAMES = {
	Form: HTML_TAG_PREFIX + "form",
	Control: HTML_TAG_PREFIX + "control",
	BackButton: HTML_TAG_PREFIX + "control-back",
	NextButton: HTML_TAG_PREFIX + "control-next",
	SummaryButton: HTML_TAG_PREFIX + "control-summary",
	SubmitButton: HTML_TAG_PREFIX + "control-submit",
	CancelButton: HTML_TAG_PREFIX + "control-cancel",
	Page: HTML_TAG_PREFIX + "page",
	Field: HTML_TAG_PREFIX + "field",
	WrapperField: HTML_TAG_PREFIX + "wrapper-field",
	List: HTML_TAG_PREFIX + "list",
	ListRows: HTML_TAG_PREFIX + "rows",
	ListRow: HTML_TAG_PREFIX + "row",
	ButtonAddRow: HTML_TAG_PREFIX + "add-row",
	ButtonDeleteRow: HTML_TAG_PREFIX + "delete-row",
	Container: HTML_TAG_PREFIX + "container",
	Validation: HTML_TAG_PREFIX + "validation",
	Message: HTML_TAG_PREFIX + "message",
};
export const FORMSTATES = {
	init: "init",
	input: "input",
	summary: "summary",
	submit: "submit",
	finished: "finished",
};

export const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

export const EVENT_PREFIX = HTML_TAG_PREFIX + "event-";

export const EVENTS = {
	initialize: EVENT_PREFIX + "initialize",
	/* fired by change value from an field implementation 
	 * and consumed by the reference implementation of 
	 * BaseField to make validation and fire valueChanged 
	 * event
	 */
	input: EVENT_PREFIX + "input",
	/* internal event for publish that a value of field has changed (event after validation) */
	valueChanged: EVENT_PREFIX + "value-changed",
	/* internal event to start validation at elements -> only fired at form*/
	executeValidate: EVENT_PREFIX + "execute-validate",
	/* */
	activeStateChanged: EVENT_PREFIX + "active-state-changed",
	/* */
	conditionStateChanged: EVENT_PREFIX + "condition-state-changed",
	/* */
	validStateChanged: EVENT_PREFIX + "valid-state-changed",
    /* */
	siteChanged: EVENT_PREFIX + "site-changed",
	/* */
	formStateChanged: EVENT_PREFIX + "form-state-changed",
	
	//old need to be refactored

	added: EVENT_PREFIX + "added",
	change: EVENT_PREFIX + "change",
	changeAttributeEventBuilder: (name) => {
		return EVENT_PREFIX + "change-attribute-" + name;
	},
	changeActive: EVENT_PREFIX + "change-active",
	changeValue: EVENT_PREFIX + "change-value",
	changeCondition: EVENT_PREFIX + "change-condition",
	changeValidation: EVENT_PREFIX + "change-validation",

	//LIST EVENTS
	listRowAdd: EVENT_PREFIX + "list-row-add",
	listRowDelete: EVENT_PREFIX + "list-row-delete",
};

export const SPECIALVARS = {
	CURRENTVALUE: "$value",
	CURRENTLISTROW: "$item"
}

//ATTRIBUTES

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_STEP = "step";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
export const ATTRIBUTE_REQUIRED = "required";
export const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
export const ATTRIBUTE_CONDITION = "condition";
export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_DISABLED = "disabled";
export const ATTRIBUTE_READONLY = "readonly";
export const ATTRIBUTE_NOVALUE = "no-value";
export const ATTRIBUTE_VALID = "valid";
export const ATTRIBUTE_INVALID = "invalid";
export const ATTRIBUTE_CONDITION_VALID = "condition-valid";
export const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";
export const ATTRIBUTE_MAX = "max";

