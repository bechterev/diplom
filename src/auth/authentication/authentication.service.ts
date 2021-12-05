import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserService } from 'src/users/user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserService){}
public async regiser(registartionData:CreateUserDto){
    const hashingPassword = await bcrypt.hash(registartionData.passwordHash, 10);
    try{
        const createUser = await this.userService.create({
            ...registartionData,
            passwordHash: hashingPassword
        })
        createUser.passwordHash = undefined;
        return createUser;
    }
    catch(err){
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
public async getAuthenticationUser(email:string, textPassword:string){
    try{
        const user = await this.userService.findByEmail(email);
        await this.verifyPassword(textPassword,user.passwordHash);
        user.passwordHash = undefined;
        return user;
    }
    catch(err){
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
}
private async verifyPassword(password:string, hashingPassword:string){
    const isMatching = await bcrypt.compare(password, hashingPassword);
    if(!isMatching) throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
}
}
