import api from "@/config/api"
import { API_BASE_URL } from "@/config/api"
import { GET_USER_REQUEST,
     REGISTER_REQUEST,
     REGISTER_SUCCESS , 
     LOGOUT_REQUEST , 
     LOGIN_SUCCESS,
     LOGIN_REQUEST, 
     GET_USER_SUCCESS} from "./ActionType"

export const register=userData=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
       const {data} = await api.post(`${API_BASE_URL}/auth/signup`,userData)
       if(data.jwt){
          localStorage.setItem('jwt',data.jwt)
          dispatch({type:REGISTER_SUCCESS,payload:data})
       }
    }catch(error) {
        console.log(error)
    }
}

export const login=userData=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
       const {data} = await api.post(`${API_BASE_URL}/auth/signin`,userData)
       if(data.jwt){
          localStorage.setItem('jwt',data.jwt)
          dispatch({type:LOGIN_SUCCESS,payload:data})
       }
       console.log('LOGIN success',data)
    }catch(error) {
        console.log(error)
    }
}

export const getUser=()=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
       const {data} = await api.get(`${API_BASE_URL}/api/users/profile`)
      //  if(data.jwt){
      //     localStorage.setItem('jwt',data.jwt)
          dispatch({type:GET_USER_SUCCESS,payload:data})
      //  }
      console.log("user success",data)
    }catch(error) {
        console.log(error)
    }
}


export const logout = () => async (dispatch) => {
    dispatch({type:LOGOUT_REQUEST})
    localStorage.clear()
    // localStorage.removeItem("jwt");
}