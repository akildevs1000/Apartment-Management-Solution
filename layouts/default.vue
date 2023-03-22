<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" v-for="item in tabMenu" :key="item.id">
      <button
        class="nav-link"
        :class="item.status"
        data-bs-toggle="tab"
        :data-bs-target="item.id"
        type="button"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { useHead } from "#imports";

const count = ref(10);

const tabMenu = ref([
  {
    title: "Details",
    id: "#details",
    status: "active",
  },
  {
    title: "Members",
    id: "#members",
    status: "",
  },
  {
    title: "Vehicle",
    id: "#vehicles",
    status: "",
  },
  {
    title: "Visitors",
    id: "#visitors",
    status: "",
  },
]);
</script>
