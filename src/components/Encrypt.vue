<template>
  <Card>
    <template #title>
      <h1>ENCRYPTION MAGIC!</h1>
    </template>
    <template #subtitle>
      <h2>
        Enter your secret encryption key and then the message you want to
        encrypt
      </h2>
    </template>
    <template #content>
      <div v-if="!formSubmitted">
        <form @submit.prevent="submitForm">
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
          <div class="form-control">
            <Button label="Encrypt" type="submit" />
          </div>
        </form>
      </div>
      <div v-else>
        <div class="encryptedMessage">
          <p>{{ encryptedMessage }}</p>
        </div>
        <div class="btn__go-back">
          <Button icon="pi pi-copy" @click="copyToClipboard" />
          <!-- <Button label="Copy Encrypted Message" @click="copyToClipboard" /> -->
        </div>
        <div class="btn__go-back">
          <Button label="Encrypt Another Message" @click="goBack" />
        </div>
      </div>
    </template>

    <template #footer>
      <Button label="Home" class="footer-btn" @click="changePage('Home')" />
      <Button
        label="Decrypt A Message"
        class="footer-btn"
        @click="changePage('Decrypt')"
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
    const encrypt = (message, key) => {
      const cryptr = new Cryptr(key);
      const encrypted = cryptr.encrypt(message);

      return encrypted;
    };

    const inputKey = ref("");
    const inputMessage = ref("");
    const encryptedMessage = ref("");

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
      encryptedMessage.value = encrypt(inputMessage.value, inputKey.value);

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
      await navigator.clipboard.writeText(encryptedMessage.value);
    };

    return {
      formSubmitted,
      goBack,
      submitForm,
      invalidKey,
      invalidMessage,
      inputKey,
      inputMessage,
      encryptedMessage,
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

.encryptedMessage {
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
