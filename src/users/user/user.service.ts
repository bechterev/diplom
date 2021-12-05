import { Inject, Injectable } from '@nestjs/common';
import { User} from '../entity/user.entity';
import { Schema as MongooseSchema, Model } from 'mongoose';
import { CreateUserDto } from '../dto/createUser.dto';
import { Schema } from '@nestjs/mongoose';
import {UserSchema} from '../entity/user.entity';
import {ID} from '../../types';


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
    constructor(@Inject(UserSchema) private userModel: Model<User>){
    }
    async create(data: Partial<User>): Promise<User> {
        return this.userModel.create(data)
    } 
    async findById(id: ID): Promise<User> {
        return this.userModel.findById(id);
    }
    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email:email});
    }
    async findAll(params: SearchUserParams): Promise<User[]> {
        
        return this.userModel.find(
            Object.values(params).map(prop=>{
                if(prop==params.name||prop==params.email||prop==params.contactPhone)
                {return {$regexp:`/.*${prop}.*/gi`}}
                else{return prop} })
        );
    }
}
