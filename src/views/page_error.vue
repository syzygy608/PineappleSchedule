<script setup>
import Navbar from "@components/layout/navbar.vue";
import Foot from "@components/layout/footer.vue";
import ErrorBox from "@components/common/error_box.vue";
</script>

<template>
  <div id="main">
    <Navbar />
    <div
      style="height: calc(100dvh - 8rem)"
      class="flex items-center justify-center">
      <ErrorBox error="Something Went Wrong!!"></ErrorBox>
    </div>
    <Foot />
  </div>
</template>
