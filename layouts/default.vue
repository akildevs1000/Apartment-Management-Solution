<template>
  <div>
    <LayoutsPreloader />
    <div id="main-wrapper">
      <LayoutsNav />
      <LayoutsHeader />
      <LayoutsSideBar />
      <div class="content-body">
        <div class="container-fluid mt-3">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "#imports";
</script>
