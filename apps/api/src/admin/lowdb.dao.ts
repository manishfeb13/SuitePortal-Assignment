import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as nanoid from 'nanoid';

type CollctionName = 'auths';

@Injectable()
export class LowdbDao {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase('auths');
  }

  private get collection(): any {
    return this.db.get('auths');
  }


  private async initDatabase(collctionName: CollctionName) {
    const adapter = new FileAsync('./db/user_db.json');
    this.db = await lowdb(adapter);
    const listUsers = await this.db.get(collctionName).value();
    if (!listUsers) {
      await this.db.set(collctionName, []).write();
    }
  }

//   async findAll(collctionName: CollctionName): Promise<any> {
//     const listUsers = await this.db.get(collctionName).value();
//     return listUsers;
//   }

  async find(condition: object, collctionName: CollctionName): Promise<any> {
    let temp = await this.collection.value()
    console.log((temp),"################## colection-daofile find function line 37");
    let values = await this.collection.find( condition ).value();
    // const values = await this.db.get(collctionName).find(condition).value();
    return values;
  }

  // async update(
  //   key: string,
  //   value: string | String,
  //   collctionName: string,
  //   dataUpdate: any,
  // ): Promise<any> {
  //   const listUsers = await this.db.get(collctionName).value();
  //   let out;
  //   const listData = listUsers.map(user => {
  //     if (user[key] !== value) return user;
  //     if (user[key] === value) {
  //       out = Object.assign(user, dataUpdate);
  //       return out;
  //     }
  //   });
  //   await this.db.set(collctionName, listData).write();
  //   return out;
  // }

  async add(record: any, collctionName: CollctionName): Promise<any> {
    const listData = await this.db.get(collctionName).value();
    record.id = nanoid.nanoid(10);
    listData.push(record);
    await this.db.set(collctionName, listData).write();
    return record;
  }
}