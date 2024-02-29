import { Types } from 'mongoose';
import { IsMongoId, IsNumber } from 'class-validator';

export class SetRatingDto {
	@IsMongoId()
	movieId: Types.ObjectId;

	@IsNumber()
	value: number;
}
