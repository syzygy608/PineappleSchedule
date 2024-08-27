import { createStore } from "vuex";
import course from "./course";
import ccuplus from "./ccuplus";
import general from "./general";

const store = createStore({
  modules: {
    course: course,
    ccuplus: ccuplus,
    general: general,
  },
});

export default store;
