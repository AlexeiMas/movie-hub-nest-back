import { Module } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { MovieController } from 'src/movie/movie.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MovieModel } from 'src/movie/models/movie.model';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MovieModel,
				schemaOptions: {
					collection: 'Movie',
				},
			},
		]),
	],
	controllers: [MovieController],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
