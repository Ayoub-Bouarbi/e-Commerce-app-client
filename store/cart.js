
import Cookies from 'js-cookie';


export const state = () => ({
  items: []
})

export const getters = {
  itemsCount: state => {
    return state.items.length;
  },
  items: state => {
    return state.items;
  },
  subAmount: state => {
    let subAmount = 0;

    state.items.forEach(item => {
      subAmount += item.price * item.quantity;
    });

    return subAmount;
  },
  Tax: (state,getters) => {
    return getters.subAmount * 20/100;
  },
  Amount: (state,getters) => {
    return getters.subAmount + getters.Tax;
  }
}

export const mutations = {
  setItems(state,items){
    if(items == null){
      state.items = [];
      return;
    }

    state.items = items;
  },
  addItem(state,item){
    let record = state.items.find(x => x.id == item.id);

    if(!record){
      state.items.push(item);
    }
    else{
      record.quantity = parseInt(record.quantity) + parseInt(item.quantity);
    }
    Cookies.set("cart",state.items);
  },
  removeItem(state,item){
    let index = state.items.indexOf(item);
    state.items.splice(index,1);
    Cookies.set("cart",state.items);
  },
  emptyList(state){
    state.items = [];
    Cookies.set("cart",[]);
  }
}
