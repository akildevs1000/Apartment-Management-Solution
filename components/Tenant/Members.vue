<template>
  <div>
    <div class="row g-3">
      <div class="col-12">
        <button @click="addMembers()" class="btn btn-success mt-2 float-end">
          <i class="fa fa-plus-circle text-white"></i>
        </button>
      </div>
      <div class="col-md-3 col-sm-6 col-12">
        <label class="form-label">Name</label>
        <input
          type="text"
          v-model="payload.name"
          class="form-control input-default input-default"
        />
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <label class="form-label">Gender</label>
        <select
          id="inputState"
          class="form-control input-default"
          v-model="payload.gender"
          @change="getFlatsFloorId"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <label class="form-label">Relation</label>
        <select
          id="inputState"
          class="form-control input-default"
          v-model="payload.relation"
        >
          <option v-for="item in relations" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <label class="form-label">Photo</label>
        <input type="file" class="form-control input-default" />
      </div>
    </div>

    <!-- ------------------------ -->
    <div
      class="row g-3 mt-1"
      v-for="(item, index) in selectedMembers"
      :key="index"
    >
      <div class="col-md-3 col-sm-6 col-12">
        <label class="form-label">Name</label>
        <input
          :value="item.name"
          type="text"
          readonly
          class="form-control input-default input-default"
        />
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <label class="form-label">Gender</label>
        <input
          :value="item.gender"
          type="text"
          readonly
          class="form-control input-default input-default"
        />
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <label class="form-label">Relation</label>
        <input
          :value="item.relation"
          type="text"
          readonly
          class="form-control input-default input-default"
        />
      </div>
      <div class="col-2">
        <img
          src="/images/avatar/1.jpg"
          height="50"
          width="50"
          alt="Base64 Image"
          style="margin: 26px 0 0 0; border-radius: 50px"
        />
      </div>
      <div class="col-md-2 col-sm-6 col-12">
        <i
          class="fa fa-trash text-danger"
          @click="removeMember(item)"
          style="margin: 41px 0 0 0; cursor: pointer"
        ></i>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12">
        <button @click="submit()" class="btn btn-primary mt-2">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "#imports";

const { data: floors } = await useFetch("http://localhost:8080/floor");

let payload = ref({
  name: "",
  gender: "",
  relation: "",
  photo: "",
});

let relations = ref([
  "Father",
  "Mother",
  "Husband",
  "Wife",
  "Brother",
  "Sister",
  "Son",
  "Daughter",
]);

let selectedMembers = ref([]);

function onFileSelected(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    payload.value.photo = reader.result;
    payload.value.ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  };
}

function addMembers() {
  const member = {
    name: payload.value.name,
    gender: payload.value.gender,
    photo: payload.value.photo,
    relation: payload.value.relation,
  };

  selectedMembers.value.push(member);

  console.log(selectedMembers.value);
}

async function submit() {
  console.log(payload.value);
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

function removeMember(index) {
  selectedMembers.value.pop(index);
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
