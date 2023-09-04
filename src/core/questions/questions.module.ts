import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.entity';
import { TestsService } from '../tests/tests.service';
import { TestsModule } from '../tests/tests.module';

@Module({
    imports:[
      MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    TestsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, TestsService],
})
export class QuestionsModule {}
