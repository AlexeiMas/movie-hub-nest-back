import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from 'src/user/models/user.model';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
	],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
