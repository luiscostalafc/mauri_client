import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = (reducers: any): any => {
  const persistedReducer = persistReducer(
    {
      key: 'liconnection',
      storage,
      whitelist: ['cart'],
    },
    reducers,
  );

  return persistedReducer;
};

export default reducer;
