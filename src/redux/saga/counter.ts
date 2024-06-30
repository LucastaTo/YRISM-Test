import { all, takeLatest, call, put } from 'redux-saga/effects';
import { incrementAsync, incrementAsyncSuccess } from '../slices/counterSlice';
import { displayErrorToast } from '../../utils/toast';

const api = {
  fetchIncrementData: () => new Promise<number>((resolve) => setTimeout(() => resolve(1), 1000)),
};

function* incrementAsyncSaga(action: ReturnType<typeof incrementAsync>) : Generator<any, void, number> {
  try {
    const data: number = yield call(api.fetchIncrementData);
    yield put(incrementAsyncSuccess(data));
  } catch (error) {
    displayErrorToast(error);  
  }
}

function* watchIncrementAsync() {
  yield takeLatest(incrementAsync.type, incrementAsyncSaga);
}

export default function* counterSaga() {
  yield all([
    watchIncrementAsync(),
    // Đây là nơi bạn có thể thêm các watcher khác nếu cần
  ]);
}
