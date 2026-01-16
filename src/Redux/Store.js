import { legacy_createStore, combineReducers, applyMiddleware } from "redux"
import { authReducer } from "./Auth/Reducer"
import { thunk } from 'redux-thunk'
import { projectReducer } from "./Project/Reducer"
import ChatReducer from "./Chat/Reducer"
import commentReducer from "./Comment/Reducer"
import issueReducer from "./Issue/Reducer"
import subscriptionReducer from "./Subscription/Reducer"
import metricsReducer from "./Metrics/Reducer"
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
     auth:authReducer,
     project:projectReducer,
     chat:ChatReducer,
     comment:commentReducer,
     issue:issueReducer,
     subscription:subscriptionReducer,
     metrics:metricsReducer,
})

export const store = legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk), ))
