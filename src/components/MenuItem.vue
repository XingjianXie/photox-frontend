<template lang="pug">
li.nav-item(role='presentation')
  router-link.nav-link(:to='href', :class="{active: $route.path.indexOf(href) === 0}")
    i(:class="icon")
    span
      slot
    slot(name="extra")
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    icon: String,
    href: String
  }
};
</script>
