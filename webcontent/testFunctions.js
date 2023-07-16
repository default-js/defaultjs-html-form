function equalObjects(o1, o2){

	const t1 = typeof o1;
	const t2 = typeof o2;
	if(t1 !== t2)
		return false

	if(t1 === "object" && t2 === "object"){
		const n1 = Object.getOwnPropertyNames(o1);
		const n2 = Object.getOwnPropertyNames(o2);
		if(n1.length != n2.length)
			return false;

		for(let name of n1)
			if(!equalObjects(o1[name], o2[name]))
				return false;

	} else if(t1 instanceof Array && t2 instanceof Array){
		if(o1.length != o2.length)
			return false;
		
		const length = o1.length;
		for(let i = 0; i < length; i++)
			if(!equalObjects(o1[i], o2[i]))
				return false;
	} else 
		return t1 == t2;

	return true;	
};