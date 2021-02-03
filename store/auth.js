
import Cookies from 'js-cookie';



export const state = () => {}

export const mutations = {
  setUser(state,user){
    state.user = user
    Cookies.set('user',user);
  },
  logout(state){
    state.user = null;
    Cookies.set('user',null);
  }
}

export const getters = {
  fullname: state => {
    if(state.user != null)
      return state.user.first_name + ' ' + state.user.last_name;
  },
  isAuth: state => {
    return state.user == null;
  },
  email: state => {
    return state.user != null ? state.user.email : null;
  },
  id: state => {
    return state.user != null ? state.user.id : null;
  }
}
