import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsTimeZone, Matches } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsString()
  @IsNotEmpty()
  document: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  hiredAt: string;
}
