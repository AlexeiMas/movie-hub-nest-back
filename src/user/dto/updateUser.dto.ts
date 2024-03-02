import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(25, {
		message: 'Maximum length equals 25 symbols',
	})
	@ApiProperty({maxLength: 25})
	email: string;

	@IsString()
	@IsOptional()
	@Length(6, 50)
	@ApiProperty({required: false, minLength: 6, maxLength: 50})
	password?: string;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => {
		if (value === 'true') return true;
		if (value === 'false') return false;
		return value;
	})
	@ApiProperty({default: false, required: false})
	isAdmin?: boolean;
}
