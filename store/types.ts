import { ActionContext,CommitOptions,DispatchOptions,Store as VuexStore } from "vuex";

// state interface
export interface State {
  counter:number;
};

// your mutations types
export enum MutationsTypes {
  INC_COUNTER = 'SET_COUNTER'
};

// your actions types

export enum ActionsTypes {
  INC_COUNTER = 'INC_COUNTER'
};

// mutations types
export type Mutations<S = State> = {
  [MutationsTypes.INC_COUNTER]: (state:S,payload:number) => void;
}

// actions types
export type AugumentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]):
    ReturnType<Mutations[K]>;
} & Omit<ActionContext<State,State>, "commit">;

// action interface
export interface Actions {
  [ActionsTypes.INC_COUNTER](
    {commit}:AugumentedActionContext,
    payload:number
  ):void
};

// getters types
export type Getters = {
  doubleCounter(state:State):number
};


// store types
export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
};