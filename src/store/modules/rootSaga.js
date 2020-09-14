import dynamic from 'next/dynamic'

import { all } from 'redux-saga/effects'

const auth = dynamic(() => import('./auth/sagas'), {ssr: false})
// const user = dynamic(() => import('./user/sagas'), {ssr: false})

export default function* rootSaga() {
  return yield all([auth])
}
