<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import Navbar from "@components/layout/navbar.vue";
import Foot from "@components/layout/footer.vue";
import ClassTable from "@components/pages/main/classTable.vue";
import Box from "@components/pages/main/search_box.vue";
import comment from "@components/pages/main/comment.vue";
import inputArea from "@components/pages/main/inputArea.vue";
import Colorpick from "@components/pages/main/colorTemplate.vue";
import timeSelection from "@components/pages/main/timeSelection.vue";
import store from "../store";

const show_colorpick = computed(
  () => store.state.course.show_ColorPick,
);
const show_search_mode = computed(
  () => store.state.course.timeSearchMode,
);
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const status = computed(() => store.state.course.show);

watch(status, async (val) => {
  if (val) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
});

import { getVisitCount, visitWeb } from "@functions/web_statistic.ts";
import Time from "../components/pages/main/serach_modes/time.vue";
import TimeSelection from "../components/pages/main/timeSelection.vue";
import { set } from "lodash";
const visitCount = ref(0);
const tabIsEditing = ref([]);

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const left = ref();
const wid = ref();
const resizeObserver = new ResizeObserver((entries) => {
  wid.value = entries.slice(-1)[0].target.clientWidth;
});

const tabs = computed(() => store.state.course.TotalCourseData);

const oldName = ref("");
const ret = ref("0");

onMounted(async () => {
  let succ = await visitWeb("main"); // 訪問網站 目前在後台測試已經成功
  visitCount.value = await getVisitCount("main");
  console.log(`visit count: ${visitCount.value}`);
  resizeObserver.observe(left.value);
  tabIsEditing.value = Array(tabs.value.length).fill(false);
});

const showModal = ref(false);

const addTab = () => {
  if (tabs.value.length >= 8) {
    alert("最多只能開啟 8 組課表!");
    return;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  ret.value = "0";
};

const SubmitModal = () => {
  if (ret === null) return;
  let copy = parseInt(ret.value);
  if (copy >= 1 && copy <= tabs.value.length) {
    store.dispatch("addTabs", tabs.value[copy - 1].id);
    // copy data from copy-th tab here
    closeModal();
    return;
  } else if (copy != 0) {
    alert("輸入錯誤!");
    return;
  }
  store.dispatch("addTabs", null);
  closeModal();
};

const activateInputFocus = (index) => {
  oldName.value = tabs.value[index].name;
  tabIsEditing.value[index] = true;
  setTimeout(() => {
    let div = document.getElementsByClassName("tab")[index];
    let input = div.querySelector("input");
    input.select();
    input.focus();
  }, 10);
};

function renameTab(index, newName) {
  console.log("rename");
  if (newName === "") {
    tabs.value[index].name = oldName.value;
    alert("名稱不可為空!");
    return;
  }
  if (tabs.value[index]) {
    store.dispatch("renameTabs", {
      id: tabs.value[index].id,
      name: newName,
    });
  }
}

const removeTab = (index) => {
  if (tabs.value.length === 1) {
    alert("至少要保留一組課表!");
    return;
  }
  if (confirm("確定要刪除此課表?") === false) return;
  store.dispatch("deleteTabs", tabs.value[index].id);
};

const activeIndex = computed(() => store.state.course.activeIndex);

const setactiveIndex = (index) => {
  store.dispatch("setactiveIndex", index);
};
</script>

<template>
  <div id="main" class="flex">
    <div>
      <Navbar />
      <Box />
      <splitpanes class="bg-white">
        <pane class="w-full" min-size="50" size="70">
          <div
            class="h-full"
            :class="{ main_page_left: status }"
            ref="left">
            <inputArea />
            <Colorpick v-show="show_colorpick" />
            <div
              class="bg-orange-100 rounded-lg px-2 flex py-2 mx-auto md:w-6/12 max-w-[60rem] min-w-[60rem] overflow-auto flex-nowrap">
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                @click="setactiveIndex(index)"
                @dblclick="activateInputFocus(index)"
                :class="[
                  'tab rounded-lg text-center justify-center py-2 px-4 mx-1 flex max-w-full flex-auto grow-0 min-w-[5rem] w-36',
                  {
                    'bg-orange-300': activeIndex === index,
                    'bg-orange-200': activeIndex !== index,
                  },
                ]">
                <div
                  class="w-[8rem] text-center"
                  v-if="!tabIsEditing[index]">
                  {{ tab.name }}
                </div>
                <input
                  v-else
                  v-model="tab.name"
                  @blur="
                    renameTab(index, tab.name);
                    tabIsEditing[index] = false;
                  "
                  @keyup.enter="$event.target.blur()"
                  class="bg-transparent !shadow-none w-[8rem] max-w-[90%] text-center border border-transparent focus:outline-none focus:border-white focus:bg-white/60" />
                <button
                  @click.stop="removeTab(index)"
                  v-if="tabs.length > 1 && activeIndex === index"
                  class="ml-2 font-bold hover:text-red-700 inline-flex items-center justify-center z-20">
                  <CloseOutlined />
                </button>
              </div>
              <button
                @click="addTab"
                class="tab rounded-lg text-center py-2 px-4 bg-orange-200 hover:bg-orange-300 mx-1">
                +
              </button>
            </div>
            <timeSelection :message="wid" />
            <classTable />
            <!-- <div v-if="tabs.length > 0">
              <component :is="tabs[activeIndex].component1" />
              <component :is="tabs[activeIndex].component2" />
            </div> -->
          </div>
        </pane>
        <pane v-if="status" min-size="30" max-size="50" size="30">
          <comment />
        </pane>
      </splitpanes>
      <Foot />
    </div>
  </div>
  <div
    class="z-40 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm"
    v-show="showModal">
    <div
      id="modal-container"
      class="fixed inset-0 flex justify-center h-full md:h-6/12 w-full md:w-7/12 mx-auto"
      v-show="showModal">
      <div class="bg-white p-8 rounded-3xl shadow-lg my-auto">
        <h2 class="text-xl font-semibold mb-4 text-center">
          新增課表
        </h2>
        <hr class="py-2" />
        <p class="mb-4">
          請問你是要新增一個空白課表還是複製一個現有的課表?
        </p>
        <div class="mb-4">
          <select
            v-model="ret"
            class="w-full bg-gray-100 py-2 rounded-lg text-center">
            <option value="0" selected>新增空白課表</option>
            <option
              v-for="(tab, index) in tabs"
              :key="index"
              :value="index + 1">
              複製 {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <button
            id="close-modal"
            class="bg-red-300 px-3 py-1 rounded hover:bg-red-400"
            @click="closeModal">
            取消
          </button>
          <button
            id="add-tab"
            class="bg-green-300 px-3 py-1 rounded hover:bg-green-400 ml-2"
            @click="SubmitModal">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
