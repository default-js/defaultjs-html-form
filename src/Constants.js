export const HTML_TAG_PREFIX = "d-";
export const TRIGGER_TIMEOUT = 10;
export const EVENTHANDLE_TIMEOUT = 10;
export const EVENTHANDLE_INPUT_TIMEOUT = 50 * EVENTHANDLE_TIMEOUT;

export const NODENAME_FORM = `${HTML_TAG_PREFIX}form`;
export const NODENAME_SUBMIT_ACTION = `${HTML_TAG_PREFIX}submit-action`;


export const NODENAMES = {
	Form: NODENAME_FORM,
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
	ProgressBar: HTML_TAG_PREFIX + "progress-bar",
	Step: HTML_TAG_PREFIX + "step",
	SubmitAction: NODENAME_SUBMIT_ACTION,
};

export const FORMSTATE_INIT = "init";
export const FORMSTATE_INPUT = "input";
export const FORMSTATE_SUMMARY = "summary";
export const FORMSTATE_FINISHED = "finished";
export const FORMSTATES = {
	init: FORMSTATE_INIT,
	input: FORMSTATE_INPUT,
	summary: FORMSTATE_SUMMARY,
	finished: FORMSTATE_FINISHED,
};

export const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

export const EVENT_PREFIX = HTML_TAG_PREFIX + "form-";

export const EVENT_INITIALIZE = `${EVENT_PREFIX}initialize`;
export const EVENT_INITIALIZE_SUBMIT_ACTION = `${EVENT_INITIALIZE}submit-action`;

export const EVENTS = {
	initialize: EVENT_INITIALIZE,
	/* fired by change value from an field implementation
	 * and consumed by the reference implementation of
	 * BaseField to make validation and fire valueChanged
	 * event
	 */
	input: EVENT_PREFIX + "field-input",
	/* internal event for publish that a value of field has changed (event after validation) */
	valueChanged: EVENT_PREFIX + "field-value-changed",
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
	formStateChanged: EVENT_PREFIX + "state-changed",
	/* */
	allPublishValue: EVENT_PREFIX + "all-publish-value",
	/* */
	submit: EVENT_PREFIX + "submit",
	/* */
	progressbarChanged : EVENT_PREFIX + "progress-bar-changed",

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
	
	editableStateChanged: EVENT_PREFIX + "editable-state-changed",

	// Other Events
	initializeSubmitAction: EVENT_INITIALIZE_SUBMIT_ACTION
};



export const SPECIALVARS = {
	CURRENTVALUE: "$value",
	CURRENTLISTROW: "$item",
};

//ATTRIBUTES

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_ENDPOINT = "endpoint";
export const ATTRIBUTE_METHOD = "method";
export const ATTRIBUTE_STATE = "state";

export const ATTRIBUTE_STEP = "step";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
export const ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT = "input-mode-after-submit";
export const ATTRIBUTE_REQUIRED = "required";
export const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
export const ATTRIBUTE_CONDITION = "condition";
export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_DISABLED = "disabled";
export const ATTRIBUTE_EDITABLE = "editable";
export const ATTRIBUTE_EDITABLE_CONDITION = "editable-condition";
export const ATTRIBUTE_READONLY = "readonly";
export const ATTRIBUTE_NOVALUE = "no-value";
export const ATTRIBUTE_VALID = "valid";
export const ATTRIBUTE_INVALID = "invalid";
export const ATTRIBUTE_CONDITION_VALID = "condition-valid";
export const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";
export const ATTRIBUTE_MIN = "min";
export const ATTRIBUTE_MAX = "max";
export const ATTRIBUTE_PROGRESS = "progress";
