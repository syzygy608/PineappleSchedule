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
const visitCount = ref(0);
onMounted(async () => {
  let succ = await visitWeb("main"); // 訪問網站 目前在後台測試已經成功
  visitCount.value = await getVisitCount("main");
  console.log(`visit count: ${visitCount.value}`);
  resizeObserver.observe(left.value);
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const left = ref();
const wid = ref();
const resizeObserver = new ResizeObserver((entries) => {
  wid.value = entries.slice(-1)[0].target.clientWidth;
});

const tabs = ref([]);

const addTab = () => {
  if (tabs.value.length >= 4) {
    alert("最多只能開啟 4 組課表!");
    return;
  }
  let tab_name = `新課表 ${tabs.value.length + 1}`;
  tabs.value.push({
    name: tab_name,
    component1: ClassTable,
    component2: TimeSelection,
  });
};

addTab();

function renameTab(index, newName) {
  if (tabs.value[index]) {
    tabs.value[index].name = newName;
    console.log(tabs.value[index].name);
  }
}

const removeTab = (index) => {
  if (tabs.value.length === 1) {
    alert("至少要保留一組課表!");
    return;
  }
  if (confirm("確定要刪除此課表?") === false) return;
  tabs.value.splice(index, 1);
  if (activeIndex.value >= tabs.value.length)
    activeIndex.value = tabs.value.length - 1;
};

let activeIndex = ref(0);
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
              class="bg-orange-100 rounded-lg px-2 flex py-2 mx-auto md:w-6/12 max-w-[60rem] min-w-[60rem] overflow-auto">
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                @click="activeIndex = index"
                :class="[
                  'tab rounded-lg text-center py-2 px-4 mx-1 flex',
                  {
                    'bg-orange-300': activeIndex === index,
                    'bg-orange-200': activeIndex !== index,
                  },
                ]">
                <input
                  v-model="tab.name"
                  @blur="renameTab(index, tab.name)"
                  class="bg-transparent !shadow-none text-center border border-transparent focus:outline-none focus:border-white focus:bg-white/60" />
                <button
                  @click.stop="removeTab(index)"
                  v-if="tabs.length > 1 && activeIndex === index"
                  class="ml-2 font-bold hover:text-red-700 inline-flex items-center justify-center">
                  <CloseOutlined />
                </button>
              </div>
              <button
                @click="addTab"
                class="tab rounded-lg text-center py-2 px-4 bg-orange-200 hover:bg-orange-300 mx-1">
                +
              </button>
            </div>

            <div v-if="tabs.length > 0">
              <component :is="tabs[activeIndex].component1" />
              <component :is="tabs[activeIndex].component2" />
            </div>
          </div>
        </pane>
        <pane v-if="status" min-size="30" max-size="50" size="30">
          <comment />
        </pane>
      </splitpanes>
      <Foot />
    </div>
  </div>
</template>
