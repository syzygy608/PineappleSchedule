<template>
  <div class="p-12 bg-red-100 border-red-400 border">
    <div
      class="text-2xl py-3 my-3 items-center flex border-b border-red-600">
      <ExclamationCircleOutlined />
      <div class="px-3">錯誤</div>
    </div>
    <div class="text-md">
      {{ message }}
    </div>
    <div class="flex my-3 justify-center">
      <router-link
        to="/"
        class="bg-red-300 p-3 rounded-lg hover:bg-red-400 duration-200">
        回首頁
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const props = defineProps({
  error: String,
});

const message = ref(props.error);
</script>
