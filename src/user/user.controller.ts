import {Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UsePipes, ValidationPipe,} from '@nestjs/common';
import {UserService} from 'src/user/user.service';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {User} from 'src/user/decorators/user.decorator';
import {UpdateUserDto} from 'src/user/dto/updateUser.dto';
import {IdValidationPipe} from 'src/pipes/id.validation.pipe';
import {UserModel} from 'src/user/models/user.model';
import {Types} from 'mongoose';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiBearerAuth()
  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
  }

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(_id, dto);
  }

  @ApiBearerAuth()
  @Get('profile/favorites')
  @HttpCode(200)
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return this.userService.getFavoriteMovies(_id);
  }

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movieId: {
          type: 'string',
        }
      },
    }
  })
  @Put('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorites(
    @Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
    @User() user: UserModel
  ) {
    return this.userService.toggleFavorite(movieId, user);
  }

  @ApiBearerAuth()
  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.userService.getCount();
  }

  @ApiBearerAuth()
  @ApiQuery({name: 'searchTerm', required: false})
  @Get()
  @Auth('admin')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.byId(id);
  }

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateProfileAsAdmin(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.updateProfile(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id);
  }
}
