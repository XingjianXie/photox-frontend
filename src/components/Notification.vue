<template lang="pug">
Layout
  template(v-slot:menu)
    li.nav-item(role='presentation')
      a.nav-link.active.disabled
        i.fas.fa-exclamation-circle
        span {{message}}

  template(v-slot:default)
    .text-center.mt-5
      .error.mx-auto(:data-text="code")
        p#code.m-0 {{code}}
      p.text-dark.mb-5.lead#msg {{message}}
      .text-black-50.mb-0#inf(v-html="info")
      router-link(v-if="home", to="/") ← Back To Home
      a(v-else, @click.prevent="$router.back()", href) ← Back
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";

export default {
  name: "Notification",
  components: {
    Layout
  },
  props: {
    code: Number,
    message: String,
    info: String,
    home: Boolean
  }
};
</script>
