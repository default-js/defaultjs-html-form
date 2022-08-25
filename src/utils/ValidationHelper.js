export const validateFields = async (data, fields) => {
    return  (await Promise.all(fields.map(field => field.validate(data))))
			.reduce((valid, fieldValid) => {return valid ? fieldValid: false}, true);
}