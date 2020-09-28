class Ready{
	constructor(){
		this.done = new Promise((resolve) => {
			this.ready = resolve;
		});
	}
};

export default Ready;
