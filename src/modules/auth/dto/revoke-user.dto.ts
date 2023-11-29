import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RevokeUserRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  id: number;
}

export class RevokeUserResponseDto {
  @ApiProperty()
  revokeResult: boolean;
}
