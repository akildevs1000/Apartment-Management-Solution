<template>
  <div>
    <div class="card">
      <div class="card-header">Details</div>
      <div class="card-body">
        <form class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="col-md-4">
            <label class="form-label">Floor</label>
            <select class="form-select">
              <option selected>Choose...</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Flat</label>
            <select class="form-select">
              <option selected>Choose...</option>
              <option value="201">201</option>
              <option value="203">203</option>
              <option value="205">205</option>
              <option value="207">207</option>
              <option value="209">209</option>
            </select>
          </div>
          <div class="col-4">
            <label for="formFile" class="form-label">Photo</label>
            <input class="form-control" type="file" id="formFile" />
          </div>
          <div class="col-4">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" />
          </div>
          <div class="col-4">
            <label class="form-label">Gender</label>
            <select class="form-select">
              <option selected>Choose...</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Telephone/Landline</label>
            <input type="number" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Mobile</label>
            <input type="number" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">From</label>
            <input type="date" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">To</label>
            <input type="date" class="form-control" />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "#imports";

const count = ref(10);

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
