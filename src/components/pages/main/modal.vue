<template>
  <div
    class="z-40 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-xs"
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
            class="bg-red-300 px-3 py-1 rounded-sm hover:bg-red-400"
            @click="closeModal">
            取消
          </button>
          <button
            id="add-tab"
            class="bg-green-300 px-3 py-1 rounded-sm hover:bg-green-400 ml-2"
            @click="SubmitModal">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "@/store";

const showModal = computed(() => store.state.general.main_modal_show);
const tabs = computed(() => store.state.course.TotalCourseData);

const closeModal = () => {
  store.dispatch("close_main_modal");
};

const ret = ref("0");

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
</script>
