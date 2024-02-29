import { TypeRole } from 'src/auth/interfaces';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, OnlyAdminGuard } from 'src/auth/guards';

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	);
