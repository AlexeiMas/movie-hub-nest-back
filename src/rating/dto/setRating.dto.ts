import {Types} from 'mongoose';
import {IsMongoId, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SetRatingDto {
  @IsMongoId()
  @ApiProperty({type: 'string'})
  movieId: Types.ObjectId;

  @IsNumber()
  @ApiProperty({type: 'number'})
  value: number;
}
