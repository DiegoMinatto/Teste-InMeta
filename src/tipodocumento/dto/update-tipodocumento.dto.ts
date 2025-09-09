import { PartialType } from '@nestjs/swagger';
import { CreateTipodocumentoDto } from './create-tipodocumento.dto';

export class UpdateTipodocumentoDto extends PartialType(CreateTipodocumentoDto) {}
