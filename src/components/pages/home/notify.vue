<template>
  <div
    class="z-10 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm"
    v-show="showModal">
    <div
      id="modal-container"
      class="fixed inset-0 flex justify-center h-full md:h-6/12 w-full md:w-7/12 mx-auto"
      v-show="showModal">
      <div class="bg-white p-8 rounded-3xl shadow-lg my-auto">
        <h2 class="text-xl font-semibold mb-4 text-center">提醒</h2>
        <hr class="py-2" />
        <p class="mb-4" v-if="!modify" v-html="content"></p>
        <div class="w-[30rem] min-h-[20rem]" v-if="modify">
          <textarea
            v-model="content"
            class="w-full h-[20rem] border-2 border-gray-300 p-2 rounded"
            ></textarea>
        </div>
        <div class="text-center">
          <button
            id="close-modal"
            class="bg-orange-300 px-3 py-1 rounded hover:bg-orange-400"
            @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Token from "@functions/token";

const showModal = ref(true);
const closeModal = () => (showModal.value = false);

const content = ref(`
除了之前新增的
<span class="border-b border-double font-bold"
  >時間課程搜尋和教師名稱系所搜尋</span
>
功能，<br />
現在我們可以檢視<span
  class="border-b border-double font-bold">
  近幾學期的歷史課程了! </span
><br />
另外，也新增多組課表功能，用來做不同組合的編排。<br />
<br />
如發生顯示問題可以嘗試重新整理頁面或清空課表重建，也可以回報發生問題的選課組合，我們會盡快修復!<br /><br />
同時要請手機使用者多多包涵，為了實現更多功能，<br />
目前手機版的網頁版面不太完善，請使用電腦版瀏覽器以獲得更好的使用體驗，<br />
手機板的優化將在下個大版本進行，敬請期待!
`);

const modify = ref(false);

if (localStorage.getItem("token")) {
  const res = Token.verifyToken(localStorage.getItem("token"));
  if (res) {
    modify.value = true;
    console.log("Token verified");
  } else {
    console.log("Token expired");
  }
}

// check if localStorage hasn't been set
if (localStorage.getItem("notify") === null) {
  showModal.value = true;
  localStorage.setItem("notify", "true");
}
</script>
