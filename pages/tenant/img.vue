<template>
  <div>
    {{ base64Image }}d
    <input type="file" @change="onFileSelected" />
    <img :src="base64Image" alt="Base64 Image" />

    <!-- <img src="/images/avatar/1.jpg" alt="" /> -->
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      base64Image: "",
    };
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result;
      };
    },
  },
};
</script> -->

<script setup>
const base64Image = ref("");

function onFileSelected(event) {
  console.log("gg");
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64Image.value = reader.result;
  };
}
</script>
