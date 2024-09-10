<template>
  <div class="row justify-center q-ma-md">
    <div
      class="col-md-11 col-xs-12 text-bold text-h4 row justify-center text-center q-ma-md shadow-9"
      style="border-radius: 6px"
    >
      <div
        class="row"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div class="col-md-6 col-xs-12">
          <q-btn
            to="/login"
            class="bg-primary text-white q-pa-md text-h4 q-ma-xs text-center q-ma-md"
            style="border-radius: 6px; min-width: 220px"
          >
            Login
          </q-btn>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-btn
            to="/register"
            class="bg-primary text-white q-pa-md text-h4 q-ma-xs text-center q-ma-md"
            style="border-radius: 6px; min-width: 220px"
          >
            Register
          </q-btn>
        </div>
      </div>
      <q-icon name="description" color="primary" size="460px" />
    </div>
  </div>
</template>
