import { IsString } from 'class-validator';

export class LogCreateDto {
  @IsString()
  readonly logLevel: string;

  @IsString()
  readonly message: string;
}
