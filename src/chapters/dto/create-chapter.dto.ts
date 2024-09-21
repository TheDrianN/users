import { IsString } from "class-validator";

export class CreateChapterDto {
    @IsString()
    public name: string;
    
    @IsString()
    public status:string;

}
