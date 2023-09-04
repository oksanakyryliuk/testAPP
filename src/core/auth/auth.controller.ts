import { Controller, Body, Post, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import mongoose from 'mongoose';


@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) { }


  @Public()
  @Post('/signup')
  @ApiOperation({ summary: 'Endpoint for registration user' })
  async register(@Body() createUserDto: CreateUserDto) {
    const check = await this.userService.findOneByUsername(createUserDto.username);
    if (check) throw new BadRequestException(`User already exist with username ${createUserDto.username}`)
    else {
      const user = await this.userService.createUser(createUserDto);
      return { message: 'User created successfully', user };
    }
  }

  @Public()
  @Post("/login")
  @ApiOperation({ summary: 'Endpoint for login user' })
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.userService.findOneByUsername(loginDto.username);
    console.log(user);

    if (!user) {
      throw new BadRequestException('Invalid login')
    }
    if (!await bcrypt.compare(loginDto.password, user.password)) {
      throw new BadRequestException('invalid password')
    }

    return {
      token: await this.authService.login({
        username: loginDto.username,
        _id: new mongoose.Types.ObjectId(user._id)
      }), 
      user
    };
  }

  @ApiOperation({ summary: 'Endpoint for testing guards roles' })
  @Get('test')
  test() {
    return 'Guard works'
  }

}
