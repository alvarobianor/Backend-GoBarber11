export default class AppError {
	public readonly message: string;

	public readonly code: number;

	constructor(message: string, code = 400) {
		this.message = message;
		this.code = code;
	}
}
