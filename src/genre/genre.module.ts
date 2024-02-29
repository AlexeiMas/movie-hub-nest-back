import { Module } from '@nestjs/common';
import { GenreService } from 'src/genre/genre.service';
import { GenreController } from 'src/genre/genre.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { GenreModel } from 'src/genre/models/genre.model';
import { MovieModule } from 'src/movie/movie.module';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: GenreModel,
				schemaOptions: {
					collection: 'Genre',
				},
			},
		]),
		MovieModule,
	],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenreModule {}
