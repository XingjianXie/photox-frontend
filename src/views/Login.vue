<template lang="pug">
Layout(title="Login")
  template(v-slot:menu)
    MenuItem(href="/login", icon="fas fa-user-circle") Login
    MenuItem(v-if="allowRegister", href="/register", icon="fas fa-registered") Register
    MenuItem(v-if="allowGuestUpload", href="/guest_upload", icon="fas fa-upload") Guest Upload
  .row.justify-content-center
    .col-sm-12.col-md-9.col-lg-11.col-xl-9
      .card.shadow-lg.o-hidden.border-0.my-5
        .card-header.py-3.d-lg-none
          p.text-primary.m-0.font-weight-bold Login Form
        .card-body.p-0
          .row
            .col-lg-6.d-none.d-lg-flex
              .flex-grow-1.bg-login-image(:style="{'background-image': 'url(/uploads/' + background + '.preview.jpg'}")
            .col-lg-6
              .p-5
                .text-center
                  h4.text-dark.pb-4 {{welcomeWord}}
                form.user
                  .form-group
                    input.form-control.form-control-user(v-model="data.phone_number", type="text", placeholder="Phone Number", autocomplete="off", spellcheck="false", maxlength=11)
                  .form-group
                    input.form-control.form-control-user(v-model="data.pwd", type="password", placeholder="Password", autocomplete="off", spellcheck="false", maxlength=30)
                  button.btn.btn-primary.btn-block.text-white.btn-user(type="submit", :disabled="!validateInput") Login


</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import { ref, unref, computed, reactive, onMounted } from "vue";
import axios from "axios";
import MenuItem from "@/components/MenuItem.vue";
export default {
  name: "Login",
  setup() {
    const allowRegister = ref(false);
    const allowGuestUpload = ref(false);
    const background = ref(0);
    const welcomeWord = ref("");
    const data = reactive({
      // eslint-disable-next-line @typescript-eslint/camelcase
      phone_number: "",
      pwd: ""
    });
    const validateInput = computed(() => {
      return (
        data.phone_number.length == 11 &&
        !isNaN(Number(data.phone_number)) &&
        data.pwd.length > 0
      );
    });
    onMounted(() => {
      axios
        .get("/api/login")
        .then(response => {
          allowRegister.value = response.data.allowRegister;
          allowGuestUpload.value = response.data.allowGuestUpload;
          background.value = response.data.background;
          welcomeWord.value = response.data.welcomeWord;
        })
        .catch(error => {
          console.log(error);
        });
    });

    return {
      allowRegister,
      allowGuestUpload,
      background,
      welcomeWord,
      validateInput,
      data
    };
  },
  components: {
    Layout,
    MenuItem
  }
};
</script>
