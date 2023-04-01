<template>
  <div class="container mt-5">
    <form @submit.prevent="submitForm">
      <input type="text" v-model="form.name" />
      <br />
      <p v-if="errors.name">{{ errors.name }}</p>
      <input type="text" v-model="form.email" />
      <p v-if="errors.email">{{ errors.email }}</p>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import * as Yup from "yup";

const form = ref({
  name: null,
  email: null,
});
const errors = ref({});

async function submitForm() {
  try {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    await schema.validate(
      { name: form.value.name, email: form.value.email },
      { abortEarly: false }
    );
    // Submit form data to server

    // save data
  } catch (e) {
    e.inner.forEach(({ path, message }) => {
      errors.value[path] = message;
    });
  }
}
</script>
