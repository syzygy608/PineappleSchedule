<template>
  <div class="mx-auto py-12 bg-slate-100">
    <div class="w-full px-3 md:w-8/12 mb-3 mx-auto tracking-tight">
      <div
        class="bg-linear-to-br from-orange-300 to-red-700 text-transparent bg-clip-text font-semibold text-3xl">
        CCU Class
      </div>
      <div class="font-semibold text-3xl">中正課表</div>
      <div class="text-xl text-gray-500 my-1">
        歡迎來到專屬於所有中正人的排課與課表製作網頁服務
      </div>
    </div>
  </div>
  <div class="mx-auto w-full md:w-8/12 py-12 px-3">
    <div class="text-3xl font-bold text-orange-400">使用教學</div>
    <div class="text-base font-semibold text-gray-500 my-1">
      本網頁提供兩種功能，分別為排課與課表製作，以下將分別介紹
    </div>
    <div>
      <div class="text-2xl font-bold text-orange-700 my-3">排課</div>
      <div v-for="item in arrange" :key="item.title">
        <div
          class="text-lg font-semibold border-b border-b-black text-orange-600"
          v-if="!modify">
          {{ item.title }}
        </div>
        <input
          v-model="item.title"
          class="w-full text-lg font-semibold border-b border-b-black text-orange-600"
          v-else />
        <div>
          <p class="text-base my-1 mx-3" v-if="!modify">
            {{ item.content }}
          </p>
          <textarea
            v-model="item.content"
            class="w-full text-base my-1 mx-3"
            v-else></textarea>
        </div>
      </div>
    </div>
    <div>
      <div class="text-2xl font-bold text-orange-700 my-3">
        課表製作
      </div>
      <div v-for="item in make" :key="item.title">
        <div
          class="text-lg font-semibold border-b border-b-black text-orange-600"
          v-if="!modify">
          {{ item.title }}
        </div>
        <input
          v-model="item.title"
          class="w-full text-lg font-semibold border-b border-b-black text-orange-600"
          v-else />
        <div>
          <p class="text-base my-1 mx-3" v-if="!modify">
            {{ item.content }}
          </p>
          <textarea
            v-model="item.content"
            class="w-full text-base my-1 mx-3"
            v-else></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Token from "@functions/token";

const arrange = ref([
  {
    title: "課程名稱搜尋",
    content: "在搜尋欄中輸入課程名稱，即可搜尋到相關課程。",
  },
  {
    title: "系所搜尋",
    content:
      "在搜尋欄中輸入科系，會用科系搜尋相關課程，並且可以用年級、向度等方式進行篩選。",
  },
  {
    title: "以教師名稱搜尋課程",
    content: "在搜尋欄中輸入教師名稱，會用教師名稱搜尋相關課程。",
  },
  {
    title: "自定義課程新增",
    content: "自行輸入課程名稱，可以用來規劃社團或其他活動的時間。",
  },
  {
    title: "以時間搜尋課程",
    content:
      "為了讓大家更方便尋找空堂時間的課程，我們提供了以時間搜尋課程的功能， 在開啟時間搜尋模式後，可以直接在課表上對應的位置用左鍵拖拉來選擇時間， 右鍵確認選擇後，即可搜尋到相關課程。",
  },
  {
    title: "浮動搜尋欄",
    content:
      "為了讓大家更方便搜尋課程，我們提供了浮動搜尋欄的功能， 當使用者在下方課表區域時，左邊會有一個可以縮放的搜尋欄， 可以在此搜尋課程，並且可以直接將課程加入課表。",
  },
  {
    title: "課程評價查看",
    content:
      "為了讓大家更方便選擇課程， 本站和 CCU Plus 合作，提供了課程評價的功能， 當使用者在下方課表區域時，可以點擊課程，在課程翻轉後顯示的功能表內 提供了查看課程評價的功能。 另外，在浮動搜尋欄跟時間搜尋功能中，也提供在選擇課程前可以查看課程評價的功能。",
  },
]);

const make = ref([
  {
    title: "課表儲存",
    content:
      "在課表製作頁面，可以將點選下載課表儲存，並且可以在下次開啟時直接載入， 只要在同一裝置的同瀏覽器，就可以保存你的所有課表資訊。",
  },
  {
    title: "課表分享",
    content:
      "在課表製作頁面，可以將點選分享課表，會產生一個網址，可以分享給其他人， 這個網址可以直接開啟課表，但是無法修改課表。",
  },
  {
    title: "多課表製作",
    content:
      "為了方便大家在排課時安排多種方案，或者紀錄朋友的課表，我們提供了多課表製作的功能， 可以在課表製作頁面新增多個課表，並且可以在不同課表間切換。",
  },
  {
    title: "課表美化",
    content:
      "在課表頁面，點選指定的課程，可以將課程翻轉，並且可以在課程翻轉後顯示的功能表內 修改課程格子的顏色，以及修改文字的顏色，提供更多的課表美化選項。",
  },
  {
    title: "學分計算",
    content:
      "在課表頁面，點選頁面中的顯示學分，可以顯示目前課表中的學分總數， 除了自定義課程外，其他課程都會顯示學分，並且會計算進總學分中。",
  },
]);

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
</script>
