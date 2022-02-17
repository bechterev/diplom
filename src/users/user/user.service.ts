import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Model } from 'mongoose';
import { UserSchema } from '../entity/user.entity';
import { ID } from '../../types';
import bcrypt from 'bcrypt';

interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(UserSchema) private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt(10);

    data.passwordHash = await bcrypt.hash(data.passwordHash, salt);

    return this.userModel.create(data);
  }

  async findById(id: ID): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findAll(params: SearchUserParams): Promise<User[]> {
    let filter: { [k: string]: any } = {};

    if (params.name) filter.name = params.name;

    if (params.email) filter.email = params.email;

    if (params.contactPhone) filter.contactPhone = params.contactPhone;

    if (params.limit && params.offset) {
      return await this.userModel
        .find(filter)
        .skip(params.offset)
        .limit(params.limit);
    } else {
      return await this.userModel.find(filter);
    }
  }
}
