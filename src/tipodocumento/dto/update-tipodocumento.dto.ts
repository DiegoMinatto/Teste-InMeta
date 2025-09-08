import { PartialType } from '@nestjs/mapped-types';
import { CreateTipodocumentoDto } from './create-tipodocumento.dto';

export class UpdateTipodocumentoDto extends PartialType(CreateTipodocumentoDto) {}
