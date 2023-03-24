<template>
  <input v-model="name" placeholder="Type something" />
  <span>{{ nameErrorMessage }}</span>

  <input v-model="pass" placeholder="Type something" />
  <span>{{ passErrorMessage }}</span>

  <button @click="gg()">click</button>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

// const name = ref("");

function validateField(name) {
  if (!name) {
    return "this field is required";
  }

  if (name.length < 8) {
    return "this field must contain at least 8 characters";
  }

  return true;
}

function validatePassword(pass) {
  if (!pass) {
    return "this field is required";
  }

  if (pass.length < 8) {
    return "this field must contain at least 8 characters";
  }

  return true;
}

const { value: name, errorMessage: nameErrorMessage } = useField(
  "fullName",
  validateField
);

const { value: pass, errorMessage: passErrorMessage } = useField(
  "fullName",
  validateField
);

const payload = { name, pass };

function gg() {
  console.log(payload.name.value);
  console.log(payload.pass.value);
  console.log(payload);
}
</script>

<style>
input,
span {
  display: block;
  font-size: 16px;
}
</style>
