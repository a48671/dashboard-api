import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject<IConfigService>(TYPES.IConfigService) private configService: IConfigService,
		@inject<IUsersRepository>(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(dto.login, dto.email);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(dto.password, salt);

		const isExistedUser = await this.usersRepository.find(newUser.email);

		if (isExistedUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}
	async validateUser({ password, email }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const user = new User(existedUser.name, existedUser.email, existedUser.password);

		return user.comparePassword(password);
	}
}
