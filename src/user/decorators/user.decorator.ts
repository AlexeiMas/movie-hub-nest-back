import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TypeData } from 'src/user/interfaces/user.interface';

export const User = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		const request: Express.Request = ctx.switchToHttp().getRequest();

		const user = request.user;

		return data ? user[data] : user;
	}
);
