import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, Ref } from '@typegoose/typegoose';
import { UserModel } from 'src/user/models/user.model';
import { MovieModel } from 'src/movie/models/movie.model';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	userId: Ref<UserModel>;

	@prop({ ref: () => MovieModel })
	movieId: Ref<MovieModel>;

	@prop()
	value: number;
}
