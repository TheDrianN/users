import { IsDate, IsNumber, IsString, Min } from "class-validator";
import { Transform } from 'class-transformer';

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

    @IsDate()
    @Transform(({ value }) => new Date(value)) // Transforma la cadena a Date
    public date_of_birth: Date;

    @IsString()
    public code_access:string;
}
