<template>
  <div>
    <div class="card">
      <div class="card-header">Tenant</div>

      <div class="card-body">
        <form @submit.prevent="submit" class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Name</label>
            <input
              required
              v-model="payload.name"
              type="text"
              class="form-control"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Mobile</label>
            <input
              required
              v-model="payload.mobile"
              type="number"
              class="form-control"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Telephone/Landline</label>
            <input
              required
              v-model="payload.tel"
              type="number"
              class="form-control"
            />
          </div>

          <div class="col-4">
            <label for="formFile" class="form-label">Photo</label>
            <input class="form-control" type="file" id="formFile" />
          </div>
          <div class="col-4">
            <label class="form-label">Email</label>
            <input
              required
              v-model="payload.email"
              type="email"
              class="form-control"
            />
          </div>
          <div class="col-4">
            <label class="form-label">Gender</label>
            <select required v-model="payload.gender" class="form-select">
              <option selected>Choose...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Floor</label>
            <select
              required
              v-model="payload.floor_id"
              @change="getFlatsFloorId"
              class="form-select"
            >
              <option selected value="">Choose...</option>
              <option
                v-for="(item, index) in floors"
                :key="index"
                :value="item.id"
              >
                {{ item.floor_number }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Flat</label>
            <select required v-model="payload.flat_id" class="form-select">
              <option selected>Choose...</option>
              <option
                v-for="(item, index) in flats"
                :key="index"
                :value="item.id"
              >
                {{ item.flat_number }}
              </option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">From</label>
            <input required v-model="payload.from" type="date" class="form-control" />
          </div>
          <div class="col-md-3">
            <label class="form-label">To</label>
            <input required v-model="payload.to" type="date" class="form-control" />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "#imports";

const { data: floors } = await useFetch("http://localhost:8080/floor");

let payload = ref({
  name: "",
  floor_id: "",
  flat_id: "",
  photo: "",
  email: "",
  gender: "",
  tel: "",
  mobile: "",
  from: "",
  to: "",
});

async function submit() {
  const { data, errors } = await useFetch("http://localhost:8080/tennant", {
    method: "post",
    body: payload.value,
  });

  if (data.value.status) {
    alert(data.value.message);
    return;
  }

  alert("Tenant cannot create");
}

let flats = ref([]);

function getFlatsFloorId() {
  let floor_id = payload.value.floor_id;
  if (!floor_id) {
    flats.value = [];
    return false;
  }

  let selectedFloor = floors.value.find((e) => e.id == floor_id).flats;

  flats.value = [];

  selectedFloor.map((e) => [
    flats.value.push({ id: e.id, flat_number: e.flat_number }),
  ]);
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
