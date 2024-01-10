import { IsString } from 'class-validator';

export class TokenCreateDto {
  @IsString()
  readonly code: string;
}
