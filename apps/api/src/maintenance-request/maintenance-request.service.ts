import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getAllMaintenanceRequest(): Promise<MaintenanceRequestDB[]> {
    let data =  await this.maintReqDao.getAllMaintenanceRequest();
    console.log(data,typeof(data),'################################### return all requests')
    return data
  }

  async closeMaintenanceRequest(id: string, markedByAdmin): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.closeMaintenanceRequest(id, markedByAdmin);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }
}
