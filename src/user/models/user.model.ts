import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, Ref, Severity } from '@typegoose/typegoose';
import { MovieModel } from 'src/movie/models/movie.model';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string;

	@prop()
	password: string;

	@prop({ default: false })
	isAdmin?: boolean;

	@prop({ default: [], ref: () => MovieModel, allowMixed: Severity.ALLOW })
	favorites?: Ref<MovieModel>[];
}
