import {LOGOUT, SAVE} from "./constant";

const initState = {
  user_id: localStorage.getItem('id'),
  user_name: localStorage.getItem('user_name'),
}

const actions = {
  logout: () => ({type: LOGOUT}),
  save: (data: any) => ({type: SAVE, data}),
}

const userReducer = (state: any = initState, action: any) => {
  const {type,data}=action;
  switch (type) {
    case SAVE:
      const {id, user_name, token} = data;
      state.user_id = id;
      state.user_name = user_name;
      state.token = token;
      localStorage.setItem('id', id);
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('token', token);
      return {...state};

    case LOGOUT:
      state.user_id = null;
      state.user_name = null;
      state.token = null;
      localStorage.removeItem('id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('token');
      return {...state};

    default:
      return state;
  }
}
export const {logout, save} = actions
export default userReducer;
