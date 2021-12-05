import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportrequestDto } from './create-supportrequest.dto';

export class UpdateSupportrequestDto extends PartialType(CreateSupportrequestDto) {}
