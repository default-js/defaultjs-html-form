import "../Field";

export default class Wrapper {
	
	/**
	 * 
	 * @param {Field} field 
	 * @returns 
	 */
	static findInput(field){ return null;}
	
	/**
	 * 
	 * @param {Field} field 
	 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} input 
	 */
	constructor(field, input) {
		this.field = field;
		this.input = input;
	}

	/**
	 * @async
	 */
	async init() { }

	

	/**
	 * Description placeholder
	 *
	 * @type {boolean}
	 */
	set readonly(disabled) { }

	/**
	 * 
	 * @param {*} value 
	 * @returns {Promise<boolean>} 
	 */
	async acceptValue(value) {
		return true;
	}

	/**
	 * 
	 * @param {*} value 
	 * @returns {Promise<*>}
	 */
	async normalizeValue(value) {
		return value;
	}

	/**
	 * 
	 */
	async updatedValue() {
	}

	
	/**
	 * Description placeholder
	 *
	 * @readonly
	 * @type {*}
	 */
	get value(){
		return null;
	}
	
	
	/**
	 * Description placeholder
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get valid(){
		return true;
	}
}
