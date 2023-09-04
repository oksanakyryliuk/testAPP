import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { Test, TestSchema } from './entities/test.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports:[TestsModule, MongooseModule]
})
export class TestsModule {}
