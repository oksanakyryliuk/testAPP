import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {


    constructor(
        private jwtService: JwtService,
    ) { }

    async login(user) {
        const {username, _id}= user;
        const payload = { username, _id };
        return  this.jwtService.sign(payload);
    }

}
