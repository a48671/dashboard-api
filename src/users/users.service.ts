import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
	async createUser(dto: UserRegisterDto): Promise<User | null> {
		const newUser = new User(dto.login, dto.email);
		await newUser.setPassword(dto.password);
		return null;
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean> {
		return true;
	}
}
