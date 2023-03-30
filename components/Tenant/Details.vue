<template>
  <div>
    <div class="row g-3">
      <div class="col-md-4 col-sm-6 col-12">
        <label class="form-label"
          >Name
          <span class="text-danger">*</span>
        </label>
        <input
          type="text"
          v-model="payload.name"
          class="form-control input-default input-default"
        />
        <div class="text-danger" v-if="errors && errors.name">
          {{ errors.name }}
        </div>
      </div>

      <div class="col-md-4 col-sm-6 col-12">
        <label class="form-label"
          >Floor<span class="text-danger">*</span></label
        >
        <select
          id="inputState"
          class="form-control input-default"
          v-model="payload.floor_id"
          @change="getFlatsFloorId"
        >
          <option v-for="(item, index) in floors" :key="index" :value="item.id">
            {{ item.floor_number }}
          </option>
        </select>
        <div class="text-danger" v-if="errors && errors.floor_id">
          {{ errors.floor_id }}
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
        <label class="form-label">Flat<span class="text-danger">*</span></label>
        <select
          class="form-control input-default"
          required
          v-model="payload.flat_id"
        >
          <option v-for="(item, index) in flats" :key="index" :value="item.id">
            {{ item.flat_number }}
          </option>
        </select>
        <div class="text-danger" v-if="errors && errors.flat_id">
          {{ errors.flat_id }}
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
        <label for="formFile" class="form-label"
          >Photo<span class="text-danger">*</span></label
        >
        <input
          class="form-control form-control-file"
          type="file"
          id="formFile"
          @change="onFileSelected"
        />
        <div class="text-danger" v-if="errors && errors.photo">
          {{ errors.photo }}
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
        <label class="form-label">Email</label>
        <input
          required
          v-model="payload.email"
          type="email"
          class="form-control input-default"
        />
        <div class="text-danger" v-if="errors && errors.email">
          {{ errors.email }}
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
        <label class="form-label"
          >Gender<span class="text-danger">*</span></label
        >
        <select
          class="form-control input-default"
          required
          v-model="payload.gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="col-md-6 col-sm-6 col-12">
        <label class="form-label">Telephone/Landline</label>
        <input
          type="number"
          v-model="payload.tel"
          class="form-control input-default"
        />
      </div>
      <div class="col-md-6 col-sm-6 col-12">
        <label class="form-label"
          >Mobile<span class="text-danger">*</span></label
        >
        <input
          type="number"
          v-model="payload.mobile"
          class="form-control input-default"
        />
        <div class="text-danger" v-if="errors && errors.mobile">
          {{ errors.mobile }}
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-12">
        <label class="form-label">From<span class="text-danger">*</span></label>
        <input
          type="date"
          v-model="payload.from"
          class="form-control input-default"
        />
        <div class="text-danger" v-if="errors && errors.from">
          {{ errors.from }}
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-12">
        <label class="form-label">To<span class="text-danger">*</span></label>
        <input
          type="date"
          v-model="payload.to"
          class="form-control input-default"
        />
        <div class="text-danger" v-if="errors && errors.to">
          {{ errors.to }}
        </div>
      </div>
      <div class="col-12">
        <img
          v-if="payload.photo"
          :src="payload.photo"
          height="200"
          width="200"
          alt="Base64 Image"
        />
      </div>
      <div class="col-12">
        <button @click="submit()" class="btn btn-primary mt-2">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { rules } = useTenantValidations();

const { data: floors } = await useFetch("http://localhost:8080/floor");

let errors = ref({});

let payload = ref({
  name: "",
  floor_id: "",
  flat_id: "",
  photo: "",
  email: "",
  gender: "male",
  tel: "",
  mobile: "",
  from: "",
  to: "",
  ext: "",
});

function onFileSelected(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    payload.value.photo = reader.result;
    let ext = file.name.substring(file.name.lastIndexOf(".") + 1);

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    if (!allowedExtensions.includes(ext)) {
      alert("Invalid file extension");
      return;
    }

    payload.value.ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  };
}

function title(str) {
  let res =
    str.charAt(0).toUpperCase() +
    str.substring(1, str.length).replace("_", " ");
  const words = res.split(" ");
  return words[0];
}

async function submit() {
  try {
    errors.value = rules(payload.value);
    

    if (Object.keys(errors.value).length === 0) {
      const { data, errors } = await useFetch("http://localhost:8080/tennant", {
        method: "post",
        body: payload.value,
      });

      if (data.value && data.value.status) {
        alert("Tenant created");
        console.log(data.value);
        return;
      }
    }
  } catch (err) {
    alert("Tenant cannot create");
    console.log(err);
  }
}
let flats = ref([]);

function getFlatsFloorId() {
  let floor_id = payload.value.floor_id;
  if (!floor_id) {
    flats.value = [];
    return false;
  }

  console.log(floors);
  let selectedFloor = floors.value.find((e) => e.id == floor_id).flats;
  flats.value = [];
  selectedFloor.map((e) => [
    flats.value.push({ id: e.id, flat_number: e.flat_number }),
  ]);
}
</script>

<style scoped>
.custom-file-input.selected:lang(en)::after {
  content: "" !important;
}
.custom-file {
  overflow: hidden;
}
.custom-file-input {
  white-space: nowrap;
}
</style>

<style scoped src="~/assets/css/home.css"></style>
