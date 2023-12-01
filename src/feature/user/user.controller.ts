import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/roles.decorator';
import { UserRole } from './entities/user.entity';
import { CurrentUser } from '../../decorator/current-user.decorator';

@Controller('user')
@ApiTags('user (Available for Admin role)')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiTags('user (Available for User role)')
  @Roles([UserRole.ADMIN, UserRole.USER])
  findOneByCurrentUser(@CurrentUser() user: CurrentUser) {
    return this.userService.findOneById(user.id);
  }

  @Patch('/me')
  @ApiTags('user (Available for User role)')
  @Roles([UserRole.ADMIN, UserRole.USER])
  updateByCurrentUser(
    @CurrentUser() user: CurrentUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Post()
  @Roles([UserRole.ADMIN])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: `Search user's email, firstname, lastname`,
  })
  @Roles([UserRole.ADMIN])
  findAll(@Query('keyword') keyword?: string) {
    return this.userService.findAll(keyword);
  }

  @Get(':id')
  @Roles([UserRole.ADMIN])
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @Roles([UserRole.ADMIN])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
