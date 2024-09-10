<template>
  <loginRegister layout="custom" :loginOrRegister="'register'" />
</template>
<script>
definePageMeta({
  middleware: "guest",
});
</script>
<style>
.container {
  position: relative;
  height: 90vh; /* Use 100vh to make the container full height of the viewport */
}

.make-it-center {
  position: absolute;
  top: 45%;
  left: 50%;
}
</style>
