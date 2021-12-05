import { Request, Body, Controller,  Post, UseGuards, HttpCode, Get, Res, Redirect } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LocalAuthenticationGuard } from '../localauthentication.guard';
import { AuthenticationService } from './authentication.service';

@Controller('/api/auth/')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService){}
@Post('register')
async registration(@Body() registData:CreateUserDto){
return this.authenticationService.regiser(registData);
}

@HttpCode(200)
@UseGuards(LocalAuthenticationGuard)
@Post('/login')
async logIn(@Request() req){
    return req.user;
}



@Get('/logout')
@Redirect('/')
async logOut(@Res() res:Response){
    
}
}
