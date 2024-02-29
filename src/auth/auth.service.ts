import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/models/user.model';
import * as argon2 from 'argon2';
import { AuthDto, RefreshTokenDto } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { AT_EXPIRES_TIME_JWT, RT_EXPIRES_IN_SECONDS } from 'src/config';
import { ITokenPair } from 'src/auth/interfaces';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private jwtService: JwtService
	) {}

	async register(dto: AuthDto) {
		const oldUser = await this.findUserByEmail(dto.email);

		if (oldUser) {
			return Promise.reject(
				new ConflictException('User with such email already exists')
			);
		}

		const hashedPassword = await this.hashData(dto.password);

		const newUser = new this.UserModel({
			email: dto.email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const tokens = await this.getTokenPair(String(user._id));

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		const tokens = await this.getTokenPair(String(user._id));

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async refreshTokenPair({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) {
			throw new UnauthorizedException('Please, sign in');
		}

		try {
			const result = await this.jwtService.verifyAsync(refreshToken);

			const user = await this.UserModel.findById(result._id);

			const tokens = await this.getTokenPair(String(user._id));

			return {
				user: this.returnUserFields(user),
				...tokens,
			};
		} catch (e) {
			throw new UnauthorizedException('Invalid token or expired');
		}
	}

	async findUserByEmail(email: string) {
		const user = await this.UserModel.findOne({
			email,
		});

		return user;
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.findUserByEmail(dto.email);

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const isValidPassword = await argon2.verify(user.password, dto.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('User not found or credentials wrong');
		}

		return user;
	}

	hashData(data: string) {
		return argon2.hash(data);
	}

	async getTokenPair(userId: string): Promise<ITokenPair> {
		const data = {
			_id: userId,
		};

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(data, {
				expiresIn: AT_EXPIRES_TIME_JWT,
			}),
			this.jwtService.signAsync(data, {
				expiresIn: RT_EXPIRES_IN_SECONDS,
			}),
		]);
		return {
			accessToken: at,
			refreshToken: rt,
		};
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		};
	}
}
