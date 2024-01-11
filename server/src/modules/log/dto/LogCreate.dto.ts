import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class LogCreateDto {
  @IsString()
  readonly method: string;

  @IsNumber()
  readonly status: number;

  @IsString()
  readonly path: string;

  @IsNumber()
  readonly time: number;

  @IsBoolean()
  readonly isLogin: boolean;
}
