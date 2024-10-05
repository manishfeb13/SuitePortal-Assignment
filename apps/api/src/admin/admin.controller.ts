import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    @Get()
    helloworld():string{
        return 'Hello World from Admin Section'
    }

    @Post('login')
    async login(@Body() userLoginDetails){
        console.log(userLoginDetails)
        return await this.adminService.login(userLoginDetails);
    }

    @Post('register')
    async register(@Body() newUserRegister){
        return await this.adminService.register(newUserRegister);
        }
    }
