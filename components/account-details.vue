<template>
    <section>
      <div>
          <div v-if="currentSelectedAccount !== null">
          <h2>{{currentSelectedAccount.name}}</h2>


            <ul >
               
                  <li v-for="(item) in currentSelectedAccount.history" :key="item.id">&pound;{{ item.value }} - {{ item.date }}</li>
                </ul>

            <form v-on:submit.prevent>
                <div class="form-group">
                    <label for="name">Update account value</label>
                    <input v-model="value" type="text" class="form-control" id="value" 
                    aria-describedby="value" placeholder="e.g. £2000">
                </div>
                <button class="btn btn-primary" @click="updateValue()">Update</button>
            </form>
          <button class="btn btn-primary" @click="deleteAccount()">Delete</button>
      </div>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

  export default {
    data () {
      return{
          value: ''
      }
    },
    computed: {
      ...mapGetters({
        currentSelectedAccount: 'GET_ACCOUNT_VIEWING'
      })
    },
    methods: {
      deleteAccount() {

      },
      updateValue(){
          this.$store.dispatch('UPDATE_ACCOUNT_VALUE', {
                value: this.value,
                date: moment().format()
            }).then(data => {
                this.$store.dispatch('GET_USER_ACCOUNTS');
            });
      }
    }
  }
</script>
