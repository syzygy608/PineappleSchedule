import { Module } from "vuex";

interface State {
  main_modal_show: boolean;
  tab_is_editing: Array<boolean>;
}

const general: Module<State, any> = {
  state: {
    main_modal_show: false,
    tab_is_editing: [],
  },
  mutations: {
    open_main_modal(state: State) {
      state.main_modal_show = true;
    },
    close_main_modal(state: State) {
      state.main_modal_show = false;
    },
    init_tab_is_editing(state: State, payload: number) {
      state.tab_is_editing = new Array(payload).fill(false);
    },
    set_tab_is_editing(
      state: State,
      payload: { index: number; value: boolean },
    ) {
      state.tab_is_editing[payload.index] = payload.value;
    },
  },
  actions: {
    open_main_modal(context: any) {
      context.commit("open_main_modal");
    },
    close_main_modal(context: any) {
      context.commit("close_main_modal");
    },
    init_tab_is_editing(context: any, payload: number) {
      context.commit("init_tab_is_editing", payload);
    },
  },
};

export default general;
