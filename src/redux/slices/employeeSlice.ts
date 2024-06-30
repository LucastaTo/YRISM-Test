import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../../@types/employee";
import { IPagination } from "../../@types/response";
import { IPosition } from "../../@types/position";

interface EmployeeState {
  listEmployees: IPagination<IEmployee[]>;
  positionResources: IPosition[];
  employee: IEmployee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  listEmployees: {
    pageItems: [],
    totalItems: 1,
    totalPages: 1
  },
  employee: null,
  positionResources: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    listEmployeesAsync(state) {
      state.loading = true;
      state.error = null;
    },
    listEmployeesAsyncSuccess(state, action: PayloadAction<IPagination<IEmployee[]>>) {
      state.loading = false;
      state.listEmployees = action.payload;
    },
    positionResourcesAsync() {},
    positionResourcesAsyncSuccess(state, action: PayloadAction<IPosition[]>) {
      state.positionResources = action.payload;
    },
    listEmployeesAsyncFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getEmployeeByIdAsync(_, _1: PayloadAction<number>) {},
    getEmployeeByIdAsyncSuccess(state, action: PayloadAction<IEmployee>) {
      state.employee = action.payload;
    },
  },
});

export const {
  listEmployeesAsync,
  listEmployeesAsyncSuccess,
  listEmployeesAsyncFailure,
  positionResourcesAsync,
  positionResourcesAsyncSuccess,
  getEmployeeByIdAsync,
  getEmployeeByIdAsyncSuccess,
} = employeeSlice.actions;
export default employeeSlice.reducer;
