<template>
  <login-box></login-box>
</template>
<script>
  import loginBox from "@/components/loginBox.vue";
  export default {
    name: "login",
    components: {
      "login-box": loginBox
    }
  };

</script>