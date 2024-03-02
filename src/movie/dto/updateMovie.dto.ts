import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class Parameters {
  @IsNumber()
  @ApiProperty({type: 'number'})
  year: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  duration: number;

  @IsString()
  @ApiProperty()
  country: string;
}

export class UpdateMovieDto {
  @IsString()
  @ApiProperty()
  poster: string;

  @IsString()
  @ApiProperty()
  bigPoster: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsObject()
  @ApiProperty({required: false})
  parameters?: Parameters;

  @IsString()
  @ApiProperty()
  videoUrl: string;

  @IsArray()
  @IsString({each: true})
  @ApiProperty({type: 'array', items: {type: 'string'}})
  genres: string[];

  @IsArray()
  @IsString({each: true})
  @ApiProperty({type: 'array', items: {type: 'string'}})
  actors: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({default: false, required: false})
  isSendTelegram?: boolean;
}
