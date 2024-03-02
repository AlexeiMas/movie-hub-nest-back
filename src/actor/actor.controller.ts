import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ActorService } from 'src/actor/actor.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { ActorDto } from 'src/actor/dto/actor.dto';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('actor')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug);
	}

	@ApiQuery({name: 'searchTerm', required: false})
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm);
	}

	@ApiBearerAuth()
	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.byId(id);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'create new record',
		description: 'This endpoint creates a new record in DB and return the ID for subsequent information input'
	})
	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.actorService.create();
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		return this.actorService.update(id, dto);
	}

	@ApiBearerAuth()
	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.delete(id);
	}
}
