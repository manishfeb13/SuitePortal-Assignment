import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LowdbDao } from './lowdb.dao';


@Injectable()
export class AdminService {

  constructor(private lowdbDao: LowdbDao) {
    //
  }

  async register(newUserRegister: RegisterDto) {
    const { name, email, jobRole, phoneNo, address, age, password } = newUserRegister;
    const isUserExist = await this.lowdbDao.find({ email }, 'auths');
    console.log(isUserExist,"******************** register function in service isUserExist line 18")
    if (isUserExist) {
      throw new HttpException(
        `You are already registered with us.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const createdUser = await this.lowdbDao.add(newUserRegister, 'auths');
    return createdUser;
  }


  async login(userLoginDetail: LoginDto) {
    const { email, password } = userLoginDetail;
    console.log(email, password,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    const user = await this.lowdbDao.find({ email }, 'auths');
    if (!user) {
      throw new HttpException(
        `You are not registered with us.`,
        HttpStatus.UNAUTHORIZED,
      );
    } else if(password != user.password){

      throw new HttpException(
        `Wrong Password. Please try again`,
        HttpStatus.UNAUTHORIZED,
      );
      
    }

    return user;
  }


}