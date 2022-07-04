import { hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(private readonly _login: string, private readonly _email: string) {}

	get login(): string {
		return this._login;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	async setPassword(password: string, salt: number): Promise<void> {
		this._password = await hash(password, salt);
	}
}
