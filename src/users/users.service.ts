import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject<IConfigService>(TYPES.IConfigService) private configService: IConfigService,
	) {}

	async createUser(dto: UserRegisterDto): Promise<User | null> {
		const newUser = new User(dto.login, dto.email);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(dto.password, salt);
		return newUser;
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean> {
		return true;
	}
}
