import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from './employee.response.dto';
import { DocumentoResponseDto } from './documento.response.dto';

export class DocumentoEmployeeResponseDto extends DocumentoResponseDto {
  @ApiProperty({
    type: () => EmployeeResponseDto,
    description: 'Objeto do funcionário',
  })
  employee: EmployeeResponseDto;
}
