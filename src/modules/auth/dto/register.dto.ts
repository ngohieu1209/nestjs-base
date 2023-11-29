import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength, NotContains, ValidateNested } from 'class-validator';
import { GENDER } from 'src/shared/enums/gender.enum';

class CreateStudentDto {
  @ApiProperty({
    required: true,
    description: 'Ma so sinh vien'
  })
  @IsString()
  @IsNotEmpty()
  studentCode: string
  
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
  phoneNumber: string

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  birthday: Date
  
  @ApiProperty({
    required: true,
    enum: Object.keys(GENDER),
    example: GENDER.MALE
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER
  
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string
}

export class RegisterRequestDto {
  @ApiProperty({
    required: true,
    example: 'vlsa-tsa@gmail.com',
  })
  @MinLength(6)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '123456',
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @NotContains(" ")
  @Transform(({ value }): string => value?.trim())
  @MinLength(2)
  @MaxLength(25)
  name: string;
  
  @ApiProperty({
    description: 'Thong tin sinh vien',
    type: () => CreateStudentDto
  })
  @ValidateNested()
  @Type(() => CreateStudentDto)
  student: CreateStudentDto
}

export class RegisterResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string
}
