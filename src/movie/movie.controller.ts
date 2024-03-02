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
import {MovieService} from 'src/movie/movie.service';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {IdValidationPipe} from 'src/pipes/id.validation.pipe';
import {GenreIdsDto, UpdateCountOpenedDto, UpdateMovieDto,} from 'src/movie/dto';
import {Types} from 'mongoose';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('movie')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {
  }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.movieService.bySlug(slug);
  }

  @ApiParam({name: 'actorId', type: 'string'})
  @Get('by-actor/:actorId')
  async byActor(@Param('actorId', IdValidationPipe) actorId: Types.ObjectId) {
    return this.movieService.byActor(actorId);
  }

  @UsePipes(new ValidationPipe())
  @Post('by-genres')
  @HttpCode(200)
  async byGenres(@Body() dto: GenreIdsDto) {
    return this.movieService.byGenres(dto);
  }

  @ApiQuery({name: 'searchTerm', required: false})
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular();
  }

  @Put('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body() dto: UpdateCountOpenedDto) {
    return this.movieService.updateCountOpened(dto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.byId(id);
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
    return this.movieService.create();
  }

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateMovieDto
  ) {
    return this.movieService.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.delete(id);
  }
}
