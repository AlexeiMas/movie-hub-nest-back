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

export class UpdateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(25, {
		message: 'Maximum length equals 25 symbols',
	})
	email: string;

	@IsString()
	@IsOptional()
	@Length(6, 50)
	password?: string;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => {
		if (value === 'true') return true;
		if (value === 'false') return false;
		return value;
	})
	isAdmin?: boolean;
}
