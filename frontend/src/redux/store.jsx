import {configureStore} from '@reduxjs/toolkit'


export default configureStore({
    reducer:{
        authentication_user:authenticationSliceReducer,
    }
})