<template lang="pug">
nav.navbar.navbar-dark.align-items-start.sidebar.sidebar-dark.accordion.bg-gradient-primary.p-0
  .container-fluid.d-flex.flex-column.p-0
    router-link.navbar-brand.d-flex.justify-content-center.align-items-center.sidebar-brand.m-0(to='/')
      .sidebar-brand-icon.rotate-n-15
        i.fas.fa-grip-horizontal
      .sidebar-brand-text.mx-3
        span PhotoX
    hr.sidebar-divider.my-0
    ul.nav.navbar-nav.text-light
      slot(name="menu")
        MenuItem(href="/gallery", icon="fas fa-images") Gallery
        MenuItem(href="/message", icon="fas fa-comment-alt") Message
          template(v-slot:extra)
            span.float-right.bg-danger.rounded.px-2(v-if="message > 0") {{message}}
        MenuItem(href="/reset_password", icon="fas fa-key") Reset Password
        MenuItem(v-if="user.type > 0", href="/user", icon="fas fa-user") User

        template(v-if="user.type === 127")
          MenuItem(href="/log", icon="fas fa-book") Log
          MenuItem(href="/status", icon="fas fa-tachometer-alt") Status
          MenuItem(href="/config", icon="fas fa-wrench") Config
#content-wrapper.d-flex.flex-column
  #content
    nav.navbar.navbar-light.navbar-expand.bg-white.shadow.mb-4.topbar.static-top
      .container-fluid.justify-content-start
        h3.text-dark.mb-0.m-2.d-none.d-md-inline {{title}}
        h5.text-dark.mb-0.m-2.d-md-none {{title}}
        .nav.navbar-nav.flex-nowrap.ml-auto
          slot(name="top-right")
          .topbar-divider
          .nav-item.dropdown.no-arrow
            a.dropdown-toggle.nav-link(data-toggle='dropdown', aria-expanded='false', href)
              span.d-inline.mr-2.text-gray-600.small(v-if="user.login") {{user.name}}
              span.d-inline.mr-2.text-gray-600.small(v-else) GUEST
            .dropdown-menu.shadow.dropdown-menu-right.animated--grow-in(role='menu')
              .dropdown-item(role='presentation')
                |  User ID: {{user.id}}
              .dropdown-item(role='presentation')
                |  Type: {{user.typeName}}
              .dropdown-divider
              template(v-if="user.login")
                a.dropdown-item(role='presentation', href, @click.prevent="logout")
                  i.fas.fa-sign-out-alt.fa-sm.fa-fw.mr-2.text-gray-400
                  |  Logout
              template(v-else)
                router-link.dropdown-item(role='presentation', to='/login')
                  i.fas.fa-user-circle.fa-sm.fa-fw.mr-2.text-gray-400
                  |  Login
                router-link.dropdown-item(v-if="user.allowRegister", role='presentation', to='/register')
                  i.fas.fa-registered.fa-sm.fa-fw.mr-2.text-gray-400
                  |  Register
    .container-fluid
      slot
  footer.bg-white.sticky-footer
    .container.my-auto
      .text-center.my-auto.copyright
        span Copyright © mark07x 2019-2020
router-link.border.rounded.d-inline.scroll-to-top(to='#page-top')
  i.fas.fa-angle-up
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "Layout",
  components: {
    MenuItem
  },
  props: {
    title: String
  },
  setup() {
    const user = ref({
      login: false,
      name: "GUEST",
      id: -1,
      type: -1,
      typeName: "Guest",
      allowRegister: false
    });
    const message = ref(0);
    function logout() {
      axios.get("/api/logout").then(response => {
        switch (response.data.code) {
          case 302:
            router.replace(response.data.url);
            break;
          default:
            console.log(response.data);
            break;
        }
      });
    }
    onMounted(() => {
      axios
        .get("/api/layout")
        .then(response => {
          user.value = response.data.content.user;
          message.value = response.data.content.message;
        })
        .catch(error => {
          console.log(error);
        });
    });
    return {
      user,
      message,
      logout
    };
  }
};
</script>
