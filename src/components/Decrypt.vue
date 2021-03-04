<template>
  <Card>
    <template #title>
      <h1>DECRYPTION MAGIC!</h1>
    </template>
    <template #subtitle>
      <h2>
        Enter encrypted message and your secret key to reveal what the message
        truly says!
      </h2>
    </template>
    <template #content>
      <div v-if="!formSubmitted">
        <form @submit.prevent="submitForm">
          <div class="p-float-label form-control p-input-icon-right">
            <i class="pi pi-send" />
            <InputText
              id="message"
              type="text"
              v-model="inputMessage"
              :class="{ 'p-invalid': invalidMessage }"
            />
            <label for="message">Message</label>
            <small id="message-help" class="p-error" v-if="invalidMessage"
              >Please enter a message.</small
            >
          </div>
          <div class="p-float-label form-control p-input-icon-right">
            <i class="pi pi-lock" />
            <InputText
              id="key"
              type="text"
              v-model="inputKey"
              :class="{ 'p-invalid': invalidKey }"
            />
            <label for="key">Key</label>
            <small id="key-help" class="p-error" v-if="invalidKey"
              >Please enter a key.</small
            >
          </div>
          <div class="form-control">
            <Button label="Decrypt" type="submit" />
          </div>
        </form>
      </div>
      <div v-else>
        <div class="decryptedMessage">
          <p>{{ decryptedMessage }}</p>
        </div>
        <div class="btn__go-back">
          <Button icon="pi pi-copy" @click="copyToClipboard" />
        </div>
        <div class="btn__go-back">
          <Button label="Decrypt Another Message" @click="goBack" />
        </div>
      </div>
    </template>

    <template #footer>
      <Button label="Home" class="footer-btn" @click="changePage('Home')" />
      <Button
        label="Encrypt A Message"
        class="footer-btn"
        @click="changePage('Encrypt')"
      />
    </template>
  </Card>
</template>

<script>
import { ref } from "vue";
import Cryptr from "cryptr";

export default {
  emits: ["pageChange"],
  setup(props, context) {
    const decrypt = (message, key) => {
      const cryptr = new Cryptr(key);
      const decrypted = cryptr.decrypt(message);

      return decrypted;
    };

    const inputKey = ref("");
    const inputMessage = ref("");
    const decryptedMessage = ref("");

    const formSubmitted = ref(false);

    const invalidKey = ref(false);

    const invalidMessage = ref(false);

    const submitForm = () => {
      if (inputKey.value === "" || inputMessage.value === "") {
        invalidKey.value = inputKey.value === "" ? true : false;
        invalidMessage.value = inputMessage.value === "" ? true : false;
        return;
      }

      invalidKey.value = false;
      invalidMessage.value = false;
      decryptedMessage.value = decrypt(inputMessage.value, inputKey.value);

      inputKey.value = "";
      inputMessage.value = "";
      formSubmitted.value = true;
    };

    const goBack = () => {
      formSubmitted.value = false;
    };

    const changePage = (page) => {
      context.emit("pageChange", page);
    };

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(decryptedMessage.value);
    };

    return {
      formSubmitted,
      goBack,
      submitForm,
      invalidKey,
      invalidMessage,
      inputKey,
      inputMessage,
      decryptedMessage,
      changePage,
      copyToClipboard,
    };
  },
};
</script>

<style scoped>
.p-card {
  max-width: 70rem;
  margin: auto;
}

div p {
  overflow-wrap: break-word;
}

.form-control {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}

.decryptedMessage {
  width: 36rem;
  text-align: justify;
  color: #fffdfd;
  margin: auto;
  background: #423e3e;
  border-radius: 2px;
  padding: 0.01em 1rem;
}

.footer-btn {
  margin: 0 0.5rem;
}

.btn__go-back {
  margin-top: 1rem;
}
</style>
