<template>
<div style="width:100%;">
<v-container text-xs-center>
    <v-layout class="mb-5 mt-5"  v-if="loading">
        <v-flex xs12 text-xs-center>
             <v-progress-circular indeterminate color="primary" 
             :size="70" 
             :width="7">
             </v-progress-circular>
        </v-flex>
    </v-layout>
	<v-layout class="mb-3 mt-2">
		<v-flex xs12>
			<v-carousel hide-delimiters style="cursor:pointer;" v-if="!loading">
			    <v-carousel-item
			      v-for="meetup in meetups"
			      :key="meetup.id"
			      :src="meetup.imageUrl"
			      transition="fade"
			      reverseTransition="fade"
                  @click="onLoadMeetup(meetup.id)">
                  <div class="meetup-title">
                      {{ meetup.title }}
                  </div>
			    </v-carousel-item>
		  </v-carousel>
		</v-flex>
	</v-layout>
    <v-layout row wrap>
        <v-flex xs12 sm6 text-sm-right text-xs-center>
            <v-btn class="info" large :to="{name: 'meetups'}">
                Browse Meetups
            </v-btn>
        </v-flex>
        <v-flex xs12 sm6 text-sm-left text-xs-center>
            <v-btn class="info" large :to="{name: 'createmeetup'}">
                Create Meetups
            </v-btn>
        </v-flex>
    </v-layout>
</v-container>
</div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<style scoped>
    .meetup-title{
        position: absolute;
        top:50px;
        color:white;
        font-weight:bold;
        font-size: 140%;
        color:white;
        padding:15px;
        background-color: rgba(0,0,0,0.3);
    }    
</style>