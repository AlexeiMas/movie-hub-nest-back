import {IsNotEmpty, MinLength} from 'class-validator';
import {Types} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export class GenreIdsDto {
  @IsNotEmpty()
  @MinLength(24, {each: true})
  @ApiProperty({type: 'array', items: {type: 'string'}})
  genreIds: Types.ObjectId[];
}
