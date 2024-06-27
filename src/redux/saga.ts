import { all } from "redux-saga/effects";
import counterSaga from "./saga/counter";

function* saga(): Generator {
    yield all([
        counterSaga,
    ]);
}

export default saga;
