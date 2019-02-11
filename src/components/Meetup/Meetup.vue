<template>
    <div style="width:100%;">
        <v-container>
            <v-layout class="mb-5 mt-5"  v-if="loading">
                <v-flex xs12 text-xs-center>
                     <v-progress-circular indeterminate color="primary" 
                     :size="70" 
                     :width="7">
                     </v-progress-circular>
                </v-flex>
            </v-layout>
            <v-layout v-else>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <h4>{{ meetup.title }}</h4>
                            <template v-if="userIsCreator">
                                <v-spacer></v-spacer>
                                <app-edit :meetup="meetup"></app-edit>
                            </template>
                        </v-card-title>  
                        <v-card-media
                        :src="meetup.imageUrl" height="300px">
                        </v-card-media>
                        <v-card-text>
                        <h3 class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</h3>
                        <p>{{ meetup.description }}</p>
                        </v-card-text>    
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated"></register-dialog>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import EditMeetup from './EditMeetupDialog'
import RegisterDialog from './Registration/RegisterDialog'

export default{
  props: ['id'],
  components: {
    'app-edit': EditMeetup,
    'register-dialog': RegisterDialog
  },
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      const user = this.$store.getters.user
      return user !== null && user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>