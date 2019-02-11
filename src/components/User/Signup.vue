<template>
<div style="width:100%;">
    <v-container>
        <v-layout v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignUp()">
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Email"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="pasword"
                                        v-model="password"
                                        type="password"
                                        required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="confirmpassword"
                                        label="Confirm Password"
                                        id="confirmpasword"
                                        v-model="confirmpassword"
                                        type="password"
                                        :rules=[comparePassword]
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                       <v-btn type="submit" :disabled="loading" :loading="loading">
                                       Sign up
                                         <span slot="loader" class="custom-loader">
                                         <v-icon light>cached</v-icon>
                                         </span>
                                       </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>


<script>
  export default{
    data () {
      return {
        email: '',
        password: '',
        confirmpassword: ''
      }
    },
    computed: {
      comparePassword () {
        return this.password !== this.confirmpassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push({name: 'home'})
        }
      }
    },
    methods: {
      onSignUp () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
        // console.log({email: this.email, password: this.password})
        this.email = ''
        this.password = ''
        this.confirmpassword = ''
      },
      onDismissed () {
        this.$store.commit('clearError')
      }
    }
  }
</script>

