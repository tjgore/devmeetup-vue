<template>
<div style="width:100%;">
    <v-container class="pt-5">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h2>Create a new meetup</h2>
            </v-flex>
        </v-layout>
        <form @submit.prevent="onCreateMeetup()">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field 
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field 
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field 
                name="imageurl"
                label="Image URL"
                id="imageurl"
                v-model="imageurl"
                required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <img :src="imageurl" :alt="title" style="height:200px;">
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field 
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multiLine
                required>
                </v-text-field>
            </v-flex>
        </v-layout>
         <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
                >
                    <v-text-field
                      slot="activator"
                      label="Picker in menu"
                      v-model="date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" required no-title scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
               </v-menu>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-flex xs11 sm5>
                    <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                    >
                        <v-text-field
                          slot="activator"
                          label="Picker in menu"
                          v-model="time"
                          prepend-icon="access_time"
                          readonly
                          required
                        ></v-text-field>
                        <v-time-picker v-model="time" format="24hr" autosave></v-time-picker>
                    </v-menu>
                  
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
        </v-layout>
        </form>
    </v-container>
</div>
</template>


<script>
  export default{
    data () {
      return {
        title: '',
        location: '',
        imageurl: '',
        description: '',
        date: '',
        menu: false,
        modal: false,
        time: '',
        menu2: false,
        modal2: false
      }
    },
    computed: {
      formIsValid () {
        if (this.date === '' || this.date === undefined) {
          this.date = this.getTodayDate()
        }
        if (this.time === '' || this.time === undefined) {
          this.time = this.getTodayTime()
        }
        return this.title !== '' &&
        this.location !== '' &&
        this.imageurl !== '' &&
        this.description !== '' &&
        this.date !== '' &&
        this.time !== ''
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageurl: this.imageurl,
          description: this.description,
          date: this.date + 'T' + this.time
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push({name: 'meetups'})
      },
      getTodayDate () {
        var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
        return today
      },
      getTodayTime () {
        var time = new Date().toJSON().slice(11, 16)
        return time
      }
    }
  }
</script>