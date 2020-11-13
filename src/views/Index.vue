<template lang="pug">
</template>

<script lang="ts">
import { onMounted } from "vue";
import axios from "axios";
import router from "@/router";
export default {
  name: "Login",
  setup() {
    onMounted(() => {
      axios
        .get("/api/")
        .then(response => {
          switch (response.data.code) {
            case 302:
              router.replace(response.data.url);
              break;
            default:
              console.log(response.data);
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
};
</script>
