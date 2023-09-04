
import { ApiProperty } from "@nestjs/swagger";
import { title } from "process";

export class CreateQuestionDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    variants: [
        {  name: String,
            isCorrect: Boolean
        }];
}
