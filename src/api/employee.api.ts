import { IEmployee } from "../@types/employee";
import { IPosition } from "../@types/position";
import { IPagination, IResponse } from "../@types/response";
import * as employeesJson from '../mock_data/API_GET_Employees.json';
import * as positionJson from '../mock_data/API_GET_PositionResources.json';
import * as employeeJson from '../mock_data/API_GET_Employee.json';

export const api = {
    fetchListEmployeesData: (): Promise<IResponse<IPagination<IEmployee[]>>> => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(employeesJson.Response);
        }, 3000)
      );
    },
    fetchtEmployeeData: (): Promise<IResponse<IEmployee>> => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(employeeJson.Response);
        }, 3000)
      );
    },
    fetchPositionsData: (): Promise<IResponse<IPosition[]>> => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(positionJson.Response);
        }, 1000)
      );
    },
  };