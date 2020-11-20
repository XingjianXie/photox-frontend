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
    function renderContent(content: any) {
    }
    onMounted(() => {
      axios
        .get("/api/gallery")
        .then(response => {
          switch (response.data.code) {
            case 302:
              router.replace(response.data.url);
              break;
            case 200:
              renderContent(response.data.content);
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
