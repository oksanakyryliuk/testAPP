import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>) { }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.usersModel(user);
    newUser.password = await bcrypt.hash(user.password, 10);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersModel.findOne({username});
  }


  async findOne(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException(`Id not valid -  ${id}`);

    const user = await this.usersModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not exist`)
    else return user;

  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {

    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException(`Id not valid -  ${id}`);

    const updatedUser = await this.usersModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) throw new NotFoundException(`User with id ${id} not exist`)
    else return updatedUser
  }


  async remove(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Id not valid -  ${id}`);

    const deletedUser = await this.usersModel.findByIdAndRemove(id);

    if (!deletedUser) throw new NotFoundException(`User with id ${id} not exist`)
    else return {
      deleting: "delete successful",
      deletedUser
    }
  }


}
