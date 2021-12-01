import { ActionTree, createLogger, createStore, GetterTree, MutationTree } from "vuex";
import { Actions, ActionsTypes, Getters, Mutations, MutationsTypes, State, Store } from "./types";

// state
const state: State = { counter: 0 };

// mutations
const mutations:MutationTree<State> & Mutations = {
  [MutationsTypes.INC_COUNTER](state, payload) {
    state.counter += payload;
  }
};

// actions
export const actions:ActionTree<State,State> & Actions={
  [ActionsTypes.INC_COUNTER]({commit},payload){
    commit(MutationsTypes.INC_COUNTER,payload);
  }
};

// getters
export const getters:GetterTree<State,State> & Getters = {  
  doubleCounter(state){
    return state.counter * 2;
  }
};

// creating the store
export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins:[createLogger()]
});

// when you want to use the store in a component you need to import the store from here
export function useStore(){
  return store as Store
}
