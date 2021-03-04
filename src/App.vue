<template>
  <h1>cryptMAGIC</h1>
  <component :is="page" @page-change="setPage"></component>
</template>

<script>
import { ref } from "vue";
import Home from "./components/Home.vue";
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";

export default {
  components: {
    Home,
    Encrypt,
    Decrypt,
  },
  name: "App",
  setup() {
    const page = ref("Home");
    const setPage = (to) => {
      page.value = to;
    };

    return { page, setPage };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Lato";
  text-align: center;
  background: #f0e7e6;
  margin: 0;
}
</style>

<style scoped>
.main-nav__list {
  list-style: none;
}

.main-nav__button {
  background: orchid;
  border: none;
}
</style>
