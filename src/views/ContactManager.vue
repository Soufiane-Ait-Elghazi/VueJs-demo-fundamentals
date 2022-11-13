<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold mt-3">
          Contact Manager
          <router-link to="/contacts/add" class="btn btn-success btn-sm">
            Niew
            <i class="fa fa-plus"></i>
          </router-link>
        </p>
        <p class="fst-italic">
          JetBrains may use cookies and my IP address to collect individual statistics and to provide me with personalized offers and ads subject to the Privacy Policy and the Terms of Use. JetBrains may use third-party services for this purpose. I can revoke my consent at any time by visiting the Opt-Out page.
        </p>
        <form @submit.prevent= "searchContacts(keyword)">
          <div class="col-md-6">
            <div class="row">
              <div class="col">
                <input v-model="keyword" type="text" class="form-control ">
              </div>
              <div class="col">
                <input type="submit" class="btn btn-outline-dark ">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container" v-if="!loading && errorMessage">
    <div class="row">
      <div class="col mt-3">
           <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
      </div>
    </div>
  </div>
  <div class="container" v-if="loading">
    <div class="row">
      <div class="col">
        <spinner-component />
      </div>
    </div>
  </div>
  <div class="container mt-3 " v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6"  v-for="contact of contacts" :key="contact">
        <div class="card my-2 list-group-item-success shadow-lg">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-3">
                <img :src="contact.photo" alt="" class="contact-img">
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item">Name :
                    <span class="fw-bold">{{contact.name}}</span>
                  </li>
                  <li class="list-group-item">Email:
                    <span class="fw-bold">{{contact.email}}</span>
                  </li>
                  <li class="list-group-item">Mobile :
                    <span class="fw-bold">{{contact.mobile}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-sm-2  align-items-center ">
                <router-link :to="`/contacts/view/${contact.id}` " class="btn btn-primary my-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="`/contacts/edit/${contact.id}` " class="btn btn-warning my-1">
                  <i class="fa fa-edit"></i>
                </router-link>
                <button @click="deleteContact(contact.id)" class="btn btn-danger my-2">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/contactService";
import SpinnerComponent from "@/components/Spinner";
export default {
  name: "ContactManager",
  components: {SpinnerComponent},
  data : function (){
    return{
      loading :false,
      contacts :[],
      errorMessage: null,
      keyword:''
    }
  },
  created: async  function (){
    try {
      this.loading = true
      let response = await this.getAllContactsData();
      this.contacts = response.data;
      this.loading = false;
    }catch (error){
      this.errorMessage =error ;
      this.loading = false;
    }
  },
  methods :{
    getAllContactsData: async function (){
      return await ContactService.getAllContacts();
    },
    deleteContact : async function(contactId){
      try {
        this.loading = true
        let response = await ContactService.deleteContact(contactId);
        if (response) {
          let response = await this.getAllContactsData();
          this.contacts = response.data;
          this.loading = false;
        }
      } catch (error) {
        this.errorMessage = error
        this.loading = false;
      }
    },
    searchContacts: async function (keyword) {
      try {
        this.loading = true
        let response = await ContactService.searchContacts(keyword);
        if (response) {
          this.contacts = response.data;
          this.loading = false;
        }
      } catch (error) {
        this.errorMessage = error
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>