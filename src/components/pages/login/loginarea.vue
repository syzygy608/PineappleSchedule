<template>
  <div class="w-full h-[calc(100vh-8rem)] flex items-center">
    <div
      class="w-10/12 md:w-5/12 bg-gray-100 rounded-3xl shadow-lg mx-auto py-16">
      <div class="text-center text-2xl font-bold">後台登入</div>
      <hr class="w-10/12 mx-auto mt-3" />
      <form class="text-center py-6">
        <div>
          <label for="code" class="block text-lg">請輸入驗證碼</label>
          <input
            nmae="code"
            v-for="(input, index) in inputs"
            :key="index"
            class="w-12 rounded-lg py-2 text-center"
            type="text"
            maxlength="1"
            pattern="\d"
            inputmode="numeric"
            required
            v-model="inputs[index]"
            @keydown="focusPre($event, index)"
            @input="focusNext($event, index)" />
        </div>
        <button
          type="button"
          @click="handleSubmit"
          class="mt-3 bg-orange-200 py-2 px-10 rounded-2xl hover:bg-orange-300">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const env = import.meta.env;
import Token from "@functions/token.ts";
import { ref } from "vue";
import router from "@router/index.ts";

const inputs = ref(Array(6).fill(""));
// 定義一個方法來自動聚焦到下一個輸入框
const focusNext = (event, index) => {
  const value = event.target.value;
  if (!/^\d$/.test(value)) {
    inputs.value[index] = "";
    return;
  }
  if (
    event.target.value.length === 1 &&
    index < inputs.value.length - 1
  ) {
    event.target.nextElementSibling.focus();
  }
};

const focusPre = (event, index) => {
  if (
    event.key === "Backspace" &&
    index > 0 &&
    inputs.value[index] === ""
  ) {
    inputs.value[index - 1] = "";
    event.target.previousElementSibling.focus();
  }
};

const apiSite = `${env.VITE_BACKEND_DEVICE}/`;

async function handleSubmit() {
  const code = inputs.value.join("");
  const res = await axios.post(`${apiSite}login`, { otp: code });
  console.log(res.data);
  if (res.data.status === true) {
    Token.saveToken(res.data.token);
    router.push("/admin");
  } else {
    alert("驗證碼錯誤");
  }
}
</script>
