import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Question, QuestionDocument } from './entities/question.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@ApiTags("Questions API")
@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>) { }

  async create(question: CreateQuestionDto): Promise<Question> {
    return await this.questionModel.create(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find();
  }


  async findOne(id: string): Promise<Question> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException(`Id not valid -  ${id}`);

    const question = await this.questionModel.findById(id);

    if (!question) throw new NotFoundException(`Test with id ${id} not exist`)
    else return question;

  }

  async update(id: string, updateData: UpdateQuestionDto): Promise<Question> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException(`Id not valid -  ${id}`);

    const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedQuestion) throw new NotFoundException(`Question with id ${id} not exist`)
    else return updatedQuestion
  }


  async remove(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Id not valid -  ${id}`);

    const updatedQuestion = await this.questionModel.findByIdAndRemove(id);

    if (!updatedQuestion) throw new NotFoundException(`Question with id ${id} not exist`)
    else return {
      deleting: "delete successful",
      updatedQuestion
    }
  }
}
