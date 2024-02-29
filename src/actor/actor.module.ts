import { Module } from '@nestjs/common';
import { ActorService } from 'src/actor/actor.service';
import { ActorController } from 'src/actor/actor.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ActorModel } from 'src/actor/models/actor.model';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ActorModel,
				schemaOptions: {
					collection: 'Actor',
				},
			},
		]),
	],
	controllers: [ActorController],
	providers: [ActorService],
})
export class ActorModule {}
