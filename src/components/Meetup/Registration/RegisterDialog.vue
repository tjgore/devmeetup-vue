<template>
<div>
<v-dialog persistent max-width="550" v-model="registerDialog">
    <v-btn accent slot="activator">
    {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title v-if="userIsRegistered && !loading">
                        Unregister from Meetup?
                    </v-card-title>
                     <v-card-title v-else>
                        Register from Meetup?
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap class="pb-4 pt-4">
                <v-flex xs12>
                    You can always change your decision later on
                </v-flex>
            </v-layout>
             <v-layout row wrap>
                <v-flex xs12>
                   <v-card-actions>
                        <v-btn class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
                        <v-btn class="primary" @click="onAgreed()">Confirm</v-btn>
                   </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>
</div>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onAgreed () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
    }
  }
</script>