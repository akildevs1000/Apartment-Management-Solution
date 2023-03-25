<template>
  <div>
    <div class="nk-sidebar">
      <div class="nk-nav-scroll">
        <ul class="metismenu" id="menu">
          <span v-for="(item, index) in lists" :key="index">
            <li class="nav-label">Dashboard</li>
            <li>
              <a
                class="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + item.title + 'collapse'"
              >
                <i class="menu-icon mr-1"> </i
                ><span class="nav-text">{{ item.label }}</span>
              </a>
              <ul
                :id="item.title + 'collapse'"
                aria-expanded="false"
                class="collapse"
              >
                <li>
                  <nuxt-link :to="item.to">{{ item.title }}</nuxt-link>
                </li>
              </ul>
            </li>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const routeName = ref(route.name);

const lists = ref([
  {
    label: "Dashboard",
    icon: "fa fa-dashboard",
    title: "Dashboard",
    to: "/",
    hasChild: [
      {
        title: "Admin Dashboard",
        to: "/",
        icon: "fa fa-dashboard",
      },
      {
        title: "Employee Dashboard",
        to: "/employee",
        icon: "fa fa-dashboard",
      },
    ],
  },

  {
    label: "Tenant",
    title: "Tenant",
    icon: "fa fa-users",
    to: "/tenant",
  },
]);
</script>
