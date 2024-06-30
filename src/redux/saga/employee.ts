import { all, takeLatest, call, put } from "redux-saga/effects";
import { displayErrorToast } from "../../utils/toast";
import {
  getEmployeeByIdAsync,
  listEmployeesAsync,
  listEmployeesAsyncSuccess,
  positionResourcesAsync,
  positionResourcesAsyncSuccess,
} from "../slices/employeeSlice";
import { IEmployee } from "../../@types/employee";
import { IPagination, IResponse } from "../../@types/response";
import { api } from "../../api/employee.api";
import { IPosition } from "../../@types/position";

function* listEmployeesAsyncSaga() {
  try {
    const responsePosition: IResponse<IPosition[]> = yield call(
      api.fetchPositionsData
    );
    const response: IResponse<IPagination<IEmployee[]>> = yield call(
      api.fetchListEmployeesData
    );
    if (response.statusCode === 200 && responsePosition.statusCode === 200) {
      response.data.pageItems.forEach((emp) =>
        emp.positions.forEach((empPos) => {
          let matchingPosition = responsePosition.data?.find(
            (pos) => pos.positionResourceId === empPos.positionResourceId
          );

          // Update positionResource name if found
          if (matchingPosition) {
            empPos.positionResourceName = matchingPosition?.name;
          }

          // Update toolLanguages if available
          empPos.toolLanguages.forEach((toolLang) => {
            // Find corresponding toolLanguageResource from toolLanguageResourceId
            let matchingToolLang = matchingPosition?.toolLanguageResources.find(
              (lang) =>
                lang.toolLanguageResourceId === toolLang.toolLanguageResourceId
            );

            // Update toolLanguageResource name if found
            if (matchingToolLang) {
              toolLang.toolLanguageResourceName = matchingToolLang.name;
            }
          });
        })
      );

      yield put(positionResourcesAsyncSuccess(responsePosition.data));
      yield put(listEmployeesAsyncSuccess(response.data));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    displayErrorToast(error);
  }
}

function* positionResourcesAsyncSaga() {
  try {
    const response: IResponse<IPosition[]> = yield call(
      api.fetchPositionsData
    );
    if (response.statusCode === 200) {
      yield put(positionResourcesAsyncSuccess(response.data));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    displayErrorToast(error);
  }
}

function* getEmployeeByIdAsyncSaga(_: ReturnType<typeof getEmployeeByIdAsync>): Generator<any, void, IResponse<IEmployee>> {
  try {
    const response: IResponse<IEmployee> = yield call(
      api.fetchtEmployeeData,
    );
    if (response.statusCode === 200) {
      // yield put(getEmployeeByIdAsyncSaga(response.data));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    displayErrorToast(error);
  }
}

export default function* employeeSaga(): Generator {
  yield all([takeLatest(listEmployeesAsync.type, listEmployeesAsyncSaga)]);
  yield all([takeLatest(positionResourcesAsync.type, positionResourcesAsyncSaga)]);
  yield all([takeLatest(getEmployeeByIdAsync.type, getEmployeeByIdAsyncSaga)]);
}
