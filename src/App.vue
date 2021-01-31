<template>
  <v-app app>
    <v-app-bar dense color="blue" app>
      <v-toolbar-title class="white--text">Конвертер криптовалют</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mr-5">
        <router-link
          to="/"
          class="text-decoration-none white--text"
          exact-active-class="text-decoration-underline"
        >
          <v-icon>mdi-home</v-icon>
        </router-link>
      </v-btn>
      <v-btn icon>
        <router-link
          to="/porfolio"
          class="text-decoration-none white--text"
          exact-active-class="text-decoration-underline"
        >
          <v-icon>mdi-briefcase</v-icon>
        </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    value: '/',
  }),
}
</script>
