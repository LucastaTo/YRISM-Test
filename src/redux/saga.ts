import { all, fork } from "typed-redux-saga";
import counterSaga from "./saga/counter";
import employeeSaga from "./saga/employee";

function* saga(): Generator {
    yield all([
        fork(counterSaga),
        fork(employeeSaga),
    ]);
}

export default saga;
