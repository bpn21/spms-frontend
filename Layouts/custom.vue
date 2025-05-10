<template>
  <!-- Access the state directly from the store -->
  <!-- <div>Is Logged In:???? {{ isLoggedIn }}</div> -->

  <q-layout
    view="hhr lpr ffr"
    container
    style="height: 99vh"
    class="shadow-2 rounded-borders"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-header
      reveal
      :class="
        $q.dark.isActive ? 'bg-secondary text-center' : 'bg-black text-center'
      "
    >
      <q-toolbar>
        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title>Invoice Management System</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-sm">
        <NuxtPage />
      </q-page>
      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
definePageMeta({
  middleware: "admin",
});
// setup() {
import { useAuthStore } from "@/stores/auth";
import { LocalStorage } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
// return {}a
// }
export default {
  layout: "admin",
  setup() {
    let isLoggedIn = ref(false);
    onMounted(() => {
      const authen = useAuthStore();

      isLoggedIn.value = authen.auth;
      // if (!authen.auth) navigateTo({ name: "login" });
    });

    const authen = useAuthStore();

    function logMeOut(evnet) {
      LocalStorage.clear();
      isLoggedIn.value = false;
      navigateTo("/login");
    }
    // authen.auth++;
    // authen.increment();
    // with autocompletion ✨
    // authen.$patch({ auth: authen.auth + 1 });
    // or using an action instead
    return {
      isLoggedIn,
      logMeOut,
      authen,
      drawerLeft: ref(false),
      drawerRight: ref(true),
    };
  },
};
</script>
