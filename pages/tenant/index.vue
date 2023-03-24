<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-none">
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
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
              <div class="tab-pane fade show active mx-2 my-4" id="details">
                <TenantDetails />
              </div>
              <div class="tab-pane fade mx-2 my-4" id="members">
                <TenantMembers />
              </div>
              <div class="tab-pane fade mx-2 my-4" id="vehicles">Vehicles</div>
              <div class="tab-pane fade mx-2 my-4" id="visitors">Visitors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

function increment() {
  return "members";
}

useHead({
  title: `Home`,
  script: [],
  style: [
    {
      children: `@property --gradient-angle{syntax:'<angle>';inherits:false;initial-value:180deg}@keyframes gradient-rotate{0%{--gradient-angle:0deg}100%{--gradient-angle:360deg}}*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p,h2,h3{margin:0}h1,h2,h3{font-size:inherit;font-weight:inherit}img{border-style:solid;max-width:100%;height:auto}svg,img{display:block;vertical-align:middle}ul{list-style:none;margin:0;padding:0}`,
    },
  ],
});
</script>

<style scoped src="~/assets/css/home.css"></style>
