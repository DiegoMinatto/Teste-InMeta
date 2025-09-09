import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDocumentosDto {
  @IsNumber()
  @IsNotEmpty()
  documentTypeId: number;
}
