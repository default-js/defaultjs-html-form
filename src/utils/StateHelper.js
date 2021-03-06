import { EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_ACTIVE, ATTRIBUTE_VALID, ATTRIBUTE_INVALID, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_EDITABLE, ATTRIBUTE_READONLY } from "../Constants";

export const updateValidState = (target, valid, initial = false) => {
	const oldState = target.valid;
	if (typeof valid === "undefined" || valid == null) {
		target.attr(ATTRIBUTE_INVALID, null);
		target.attr(ATTRIBUTE_VALID, null);
	} else if (valid) {
		target.attr(ATTRIBUTE_INVALID, null);
		target.attr(ATTRIBUTE_VALID, "");
	} else {
		target.attr(ATTRIBUTE_INVALID, "");
		target.attr(ATTRIBUTE_VALID, null);
	}

	if (oldState != valid || initial){ 
		target.trigger(EVENTS.validStateChanged);
	}
};

export const updateConditionState = (target, valid, initial = false) => {
	
	const oldState = target.condition;
	if (valid) {
		target.attr(ATTRIBUTE_CONDITION_INVALID, null);
		target.attr(ATTRIBUTE_CONDITION_VALID, "");
	} else {
		target.attr(ATTRIBUTE_CONDITION_VALID, null);
		target.attr(ATTRIBUTE_CONDITION_INVALID, "");
	}
	if (oldState != valid || initial) {		
		target.trigger(EVENTS.conditionStateChanged);
	}
};

export const updateActiveState = (target, active, initial = false) => {
	const oldState = target.active;
	active ? target.attr(ATTRIBUTE_ACTIVE, "") : target.attr(ATTRIBUTE_ACTIVE, null);
	if (oldState != active || initial) target.trigger(EVENTS.activeStateChanged);
};

export const updateEditableState = (target, editable, initial = false) => {
	const oldState = target.editable;
	if (editable) {
		target.attr(ATTRIBUTE_EDITABLE, "");
		target.attr(ATTRIBUTE_READONLY, null);
	} else {
		target.attr(ATTRIBUTE_EDITABLE, null);
		target.attr(ATTRIBUTE_READONLY, "");
	}
	if (oldState != editable || initial) target.trigger(EVENTS.editableStateChanged);
};