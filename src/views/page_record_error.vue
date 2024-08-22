<script setup>
import Navbar from "@components/layout/navbar.vue";
import Foot from "@components/layout/footer.vue";
import ErrorBox from "@components/common/error_box.vue";
</script>

<template>
  <div id="main">
    <Navbar />
    <div
      style="height: calc(100vh - 8rem)"
      class="flex items-center justify-center">
      <ErrorBox error="分享連結錯誤或者已過期"></ErrorBox>
    </div>
    <Foot />
  </div>
</template>
>
