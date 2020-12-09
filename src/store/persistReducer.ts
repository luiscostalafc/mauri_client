import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


export default (reducers: any) => {
	const persistedReducer = persistReducer(
		{
			key: 'liconnection',
			storage,
			whitelist: ['cart'],
		},
		reducers
	);

	return persistedReducer;
};
