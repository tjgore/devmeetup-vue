<template>
<div style="width:100%;">
<v-container row wrap>
    <v-layout>
        <v-flex xs12>
            <v-card v-for="meetup in meetups" :key="meetup.id" class="mb-2">
                <v-container>
                    <v-layout>
                        <v-flex xs5 sm4 md3>
                            <v-card-media
                            :src="meetup.imageUrl" height="130px">
                            </v-card-media>
                        </v-flex>
                        <v-flex xs7 sm8 md9>
                            <v-card-title primary-title class="pt-1">
                              <div>
                                <h4>{{ meetup.title }}</h4>
                                <div>{{ meetup.date | date }}</div>
                              </div>
                            </v-card-title>
                            <v-card-actions class="pl-2">
                            <v-btn class="primary" :to="'/meetup/' + meetup.id">
                                View
                                <v-icon>arrow_forward</v-icon>
                            </v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</div>
</template>

<script>
  export default{
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>