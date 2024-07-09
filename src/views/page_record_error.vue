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
      <ErrorBox
        error="本分享連結已過期，請聯絡擁有者重新產生。"></ErrorBox>
    </div>
    <Foot />
  </div>
</template>
>
