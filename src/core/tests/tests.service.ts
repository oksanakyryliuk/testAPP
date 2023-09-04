import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TestDocument } from './entities/test.entity';
import { Model } from 'mongoose';
import { Test } from './entities/test.entity';
import mongoose from 'mongoose';

@Injectable()
export class TestsService {
  
  constructor(
    @InjectModel(Test.name)
    private testsModel: Model<TestDocument>) { }

  async create(test: CreateTestDto): Promise<Test> {
    return await this.testsModel.create(test);
  }

  async findAll(): Promise<Test[]> {
    return this.testsModel.find();
  }


  async findOne(id: string): Promise<Test> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException(`Id not valid -  ${id}`);

    const test = await this.testsModel.findById(id);

    if (!test) throw new NotFoundException(`Test with id ${id} not exist`)
    else return test;

  }

  async update(id: string, updateData: UpdateTestDto): Promise<Test> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException(`Id not valid -  ${id}`);

    const updatedTest = await this.testsModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTest) throw new NotFoundException(`Test with id ${id} not exist`)
    else return updatedTest
  }


  async remove(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Id not valid -  ${id}`);

    const deletedTest = await this.testsModel.findByIdAndRemove(id);

    if (!deletedTest) throw new NotFoundException(`Test with id ${id} not exist`)
    else return {
      deleting: "delete successful",
      deletedTest
    }
  }
  async addQuestion(testId: string, questionId: any): Promise<any> {
    return await this.testsModel.findOneAndUpdate(
      { _id: testId },
      { $push: { questions: questionId } },
      { new: true } 
    );
  }

}
