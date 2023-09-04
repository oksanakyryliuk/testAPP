import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { TestsService } from '../tests/tests.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService, private readonly testService: TestsService) {}

  @Post(':testId')
  async create(@Param('testId') testId: string, @Body() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionsService.create(createQuestionDto);
    const test=await this.testService.addQuestion(testId, question._id)
    console.log(test.title);
    
    return {test: test.title, question }
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
