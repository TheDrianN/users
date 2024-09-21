import { IsNumber, IsString, Min } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @Min(1)
    public chapter_id: number;

    @IsString()
    public document: string;

    @IsString()
    public password: string;

    @IsString()
    public status : string;

    @IsString()
    public rol: string;

    @IsString()
    public names: string;

    @IsString()
    public surnames: string;
    
    @IsString()
    public phone: string;
    
    @IsString()
    public email: string;

    @IsString()
    public address: string;

    @IsString()
    public code_access:string;
}
