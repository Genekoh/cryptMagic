import { createApp } from "vue";

import App from "./App.vue";
import PrimeVue from "primevue/config";
import "./assets/styles/theme.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";

import InputText from "primevue/inputtext";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App);

app.use(PrimeVue);

app.component("InputText", InputText);
app.component("InputSwitch", InputSwitch);
app.component("Button", Button);
app.component("Card", Card);

app.mount("#app");
