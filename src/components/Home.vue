<template>
  <Card>
    <template #title>
      <h1>HOME</h1>
    </template>
    <template #subtitle>
      <h2>
        cryptMAGIC will help you swiftly encrypt and decrypt text with just a
        few clicks!
      </h2>
    </template>
    <template #content>
      <div class="nav-container" id="nav-container_top">
        <Button
          label="Encrypt"
          class="p-button-lg"
          @click="changePage('Encrypt')"
        />
      </div>
      <div class="nav-container">
        <Button
          label="Decrypt"
          class="p-button-lg"
          @click="changePage('Decrypt')"
        />
      </div>
    </template>
  </Card>
</template>

<script>
export default {
  emits: ["pageChange"],
  setup(props, context) {
    const changePage = (page) => {
      context.emit("pageChange", page);
    };

    return { changePage };
  },
};
</script>

<style scoped>
.p-card {
  max-width: 70rem;
  margin: auto;
}

.nav-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}

#nav-container_top {
  margin-bottom: 2rem;
}
</style>
