<template lang="pug">
Layout(title="Gallery")
</template>

<script lang="ts">
import { onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import Layout from "@/components/Layout.vue";
export default {
  name: "Login",
  components: {
    Layout
  },
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
