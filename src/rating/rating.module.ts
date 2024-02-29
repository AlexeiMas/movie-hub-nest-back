import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RatingService } from 'src/rating/rating.service';
import { RatingController } from 'src/rating/rating.controller';
import { RatingModel } from 'src/rating/models/rating.model';
import { MovieModule } from 'src/movie/movie.module';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: RatingModel,
				schemaOptions: {
					collection: 'Rating',
				},
			},
		]),
		MovieModule,
	],
	controllers: [RatingController],
	providers: [RatingService],
})
export class RatingModule {}
