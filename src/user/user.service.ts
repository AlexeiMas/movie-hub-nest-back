import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import * as argon2 from 'argon2';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async byId(_id: string) {
		const user = await this.UserModel.findById(_id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id);

		const isSameUser = await this.UserModel.findOne({ email: dto.email });

		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Such email is already exists');
		}

		if (dto.password) {
			user.password = await this.hashData(dto.password);
		}

		user.email = dto.email;

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin;
		}

		await user.save();

		return;
	}

	hashData(data: string) {
		return argon2.hash(data);
	}

	async getCount() {
		return this.UserModel.find().count().exec();
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.UserModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec();
	}

	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec();
	}

	async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
		const { _id, favorites } = user;

		await this.UserModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(_id))
				: [...favorites, movieId],
		});
	}

	async getFavoriteMovies(_id: Types.ObjectId) {
		return this.UserModel.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((data) => data.favorites);
	}
}
