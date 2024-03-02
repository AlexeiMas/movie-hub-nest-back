import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RefreshTokenDto {
	@IsString({
		message: 'You did not pass refresh token or it is not a string!',
	})
	@ApiProperty()
	refreshToken: string;
}
