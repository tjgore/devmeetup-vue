<template>
  <v-app>
    <v-navigation-drawer  temporary  light
        absolute v-model="sideNav">
        <v-list two-lines>
        <v-list-tile v-for="menu in menuItems" :key="menu.title" :to="{name: menu.to}">
          <v-list-tile-avatar>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated">
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
            <v-list-tile-content @click="onLogout()">
                <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor:pointer;">
        Meetups
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="menu in menuItems" :key="menu.title" :to="{name:menu.to}">
        {{ menu.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout()">
        Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        var menulinks = [
          { icon: 'face', title: 'Sign Up', to: 'signup' },
          { icon: 'lock_open', title: 'Sign in', to: 'signin' }
        ]
        if (this.userIsAuthenticated) {
          menulinks = [
            { icon: 'supervisor_account', title: 'Meetups', to: 'meetups' },
            { icon: 'room', title: 'Create Meetup', to: 'createmeetup' },
            { icon: 'person', title: 'Profile', to: 'profile' }
          ]
        }
        return menulinks
      },
      userIsAuthenticated () {
        const user = this.$store.getters.user
        return user !== null && user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push({name: 'signin'})
      }
    }
  }
</script>
