import { ApiProperty } from '@nestjs/swagger';

export class InternalServerError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  error: string;
}
