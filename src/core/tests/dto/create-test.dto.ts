import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    descriprion: string;

    @ApiProperty()
    ownerId: string; 
}
