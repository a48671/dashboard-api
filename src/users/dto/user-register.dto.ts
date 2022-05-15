import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Login isn`t valid' })
	login: string;
	@IsString({ message: 'Password isn`t valid' })
	password: string;
	@IsEmail({}, { message: 'Email isn`t valid' })
	email: string;
}
