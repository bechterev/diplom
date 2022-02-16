import { Body, Controller, Get, HttpCode, Post, Redirect, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';
import { LocalAuthenticationGuard } from 'src/auth/localauthentication.guard';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authenticationService: AuthenticationService){}
    @Post('register')
    async registration(@Body() registData:CreateUserDto){
    return this.authenticationService.regiser(registData);
    }
    
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('/login')
    async logIn(
        @Body() email: string,
        @Body() password: string,
        @Res() response: Response,
    ){
        const user = await this.authenticationService.getAuthenticationUser(email, password);
        if (user) { response.cookie('user', user.id); }
    }
    
    
    
    @Get('/logout')
    @Redirect('/')
    async logOut(@Res() res:Response){
        
    }
}
