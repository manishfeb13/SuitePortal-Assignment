import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
   //isResolved means if the problem is resolved and if yes by whom. {False,{}}  {True,{admin details object telling who marked true and his details}}
   resolutionState:object;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
        resolutionState: {"isResolved": false, "byAdmin":{}}
      })
      .write()
    return id;
  }

  async getAllMaintenanceRequest(): Promise<MaintenanceRequestDB[]> {
    return await this.collection.value();
  }

  async closeMaintenanceRequest(id: string, markedByAdmin): Promise<MaintenanceRequestDB> {
    
    let list_requests = await this.collection.value();
    console.log(list_requests,'11111')

    let updated_list_requests = await list_requests.map(request => {
      if(request.id !== id){return request}
      if(request.id === id){
        request.resolutionState = {"isResolved":!request.resolutionState.isResolved, "byAdmin":markedByAdmin}
        return request
      }
    })

    await this.collection.set('requests', updated_list_requests).write();

    
   
    console.log(updated_list_requests,'222222')

    return updated_list_requests;

    // return await this.collection.find({ id }).value();
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }
}






