<template>
  <!-- Access the state directly from the store -->
  <!-- <div>Is Logged In:???? {{ isLoggedIn }}</div> -->

  <q-layout
    view="hHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn
          flat
          @click="
            drawer = !drawer;
            miniState = true;
          "
          round
          dense
          icon="menu"
        />

        <q-toolbar-title class="text-center"
          >Invoice Management System</q-toolbar-title
        >

        <div style="cursor: pointer" class="q-mx-md" @click="logMeOut(event)">
          Logout
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <template v-slot:mini>
        <q-scroll-area class="fit mini-slot cursor-pointer">
          <div class="text-bold" v-for="(item, index) in items" :key="index">
            <q-item class="q-pa-lg" :to="item.route">
              <q-icon size="md" :name="item.icon"></q-icon>
            </q-item>
          </div>
        </q-scroll-area>
      </template>

      <q-scroll-area class="fit">
        <div class="text-bold" v-for="(item, index) in items" :key="index">
          <q-item class="q-pa-lg" :to="item.route">
            {{ item.name }}
            <q-space></q-space>
            <q-icon size="sm" :name="item.icon"></q-icon>
          </q-item>
        </div>
      </q-scroll-area>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class="q-mini-drawer-hide absolute" style="top: 17px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="grey"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="q-px-lg q-py-md"><NuxtPage /> </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const items = ref([
  { name: "Dashboard", icon: "dashboard", route: "dashboard" },
  { name: "Sales/Invoice", icon: "notes", route: "salesinvoice" },
  { name: "Sales/Invoice", icon: "notes", route: "invoicelist" },
  { name: "Products", icon: "inventory", route: "products" },
  { name: "Purchase", icon: "shopping_basket", route: "purchases" },
  // { name: "Expenses", icon: "shopping_basket", route: "expenses" },
  { name: "Clients", icon: "person", route: "clients" },
  { name: "Employees", icon: "badge", route: "employees" },
  // { name: "Profit/Loss", icon: "iso", route: "profitloss" },
  // { name: "Payments", icon: "monetization_on", route: "profitloss" },
]);
// setup() {
import { useAuthStore } from "@/stores/auth";
import { LocalStorage } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { logMeOutApi } from "./../data/accounts/authenticate";
// return {}a
// }
export default {
  setup() {
    let isLoggedIn = ref(false);
    const miniState = ref(true);

    onMounted(() => {
      isLoggedIn.value = ref(LocalStorage.getItem("token") ? true : false);
    });

    const authen = useAuthStore();

    function logMeOut(evnet) {
      logMeOutApi()
        .then(() => {
          authen.logout();
          LocalStorage.clear();
          isLoggedIn.value = false;
          navigateTo("/login");
        })
        .catch((e) => {
          authen.logout();
          LocalStorage.clear();
          isLoggedIn.value = false;
          navigateTo("/login");
        });
    }
    // authen.auth++;
    // authen.increment();
    // with autocompletion ✨
    // authen.$patch({ auth: authen.auth + 1 });
    // or using an action instead
    return {
      items,
      isLoggedIn,
      logMeOut,
      authen,
      drawerLeft: ref(false),
      drawerRight: ref(true),
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          // e.stopPropagation();
        }
      },
    };
  },
};
</script>
