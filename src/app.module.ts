import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypegooseModule} from 'nestjs-typegoose';
import {AuthModule} from 'src/auth/auth.module';
import {UserModule} from 'src/user/user.module';
import {getMongoDbConfig} from 'src/config';
import {GenreModule} from 'src/genre/genre.module';
import {FileModule} from 'src/file/file.module';
import {ActorModule} from 'src/actor/actor.module';
import {MovieModule} from 'src/movie/movie.module';
import {RatingModule} from 'src/rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    GenreModule,
    FileModule,
    ActorModule,
    MovieModule,
    RatingModule,
  ]
})
export class AppModule {
}
