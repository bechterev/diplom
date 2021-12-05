import { Injectable } from '@nestjs/common';
import { CreateSupportrequestDto } from './dto/create-supportrequest.dto';
import { UpdateSupportrequestDto } from './dto/update-supportrequest.dto';

@Injectable()
export class SupportrequestService {
  create(createSupportrequestDto: CreateSupportrequestDto) {
    return 'This action adds a new supportrequest';
  }

  findAll() {
    return `This action returns all supportrequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supportrequest`;
  }

  update(id: number, updateSupportrequestDto: UpdateSupportrequestDto) {
    return `This action updates a #${id} supportrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportrequest`;
  }
}
