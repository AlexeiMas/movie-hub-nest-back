import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCountOpenedDto {
  @IsString()
  @ApiProperty()
  slug: string;
}
