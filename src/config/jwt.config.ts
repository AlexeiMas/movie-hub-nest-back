import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET'),
});

export const AT_EXPIRES_TIME_JWT = '15m';
export const RT_EXPIRES_IN_SECONDS = 15 * 24 * 60 * 60; // 15 days
