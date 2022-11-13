<template>
  <div class="container mt-3">
  <div class="row">
    <div class="col">
      <p class="h3 text-success fw-bold">Edit Contact</p>
      <p class="fst-italic">
        HTTP (Hypertext Transfer Protocol) est l'ensemble de règles régissant le transfert de fichiers (texte, images, son, vidéo, et autres fichiers multimédias) sur le Web. Dès qu'un utilisateur se connecte au Web et ouvre un navigateur, il utilise indirectement le protocole HTTP
      </p>
    </div>
  </div>
  </div>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-4">
        <form v-if="contact" @submit.prevent="updateSubmit()">
          <div class="mb-2">
            <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
          </div>
          <div class="mb-2">
            <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo Url">
          </div>
          <div class="mb-2">
            <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-2">
            <input v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Update">
          </div>
        </form>
      </div>
      <div class="col-md-4">
         <img class="edit-img" :src="contact.photo" alt="photo" >
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/contactService";

export default {
  name: "EditContact",
  data: function(){
    return {
      contactId : this.$route.params.contactId,
      loading :false,
      contact : {},
      errorMessage :null
    };
  },
  created: async function () {
    try {
      this.loading = true
      let response = await ContactService.getContact(this.contactId);
      this.contact = response.data
      this.loading = false
    } catch (error) {
      this.errorMessage = error
      this.loading = false
    }
  },
  methods :{
    updateSubmit :async function () {
      try {
        let response = await ContactService.updateContact(this.contactId,this.contact);
        if (response) {
          return this.$router.push('/');
        } else {
          return this.$router.push(`/contacts/edit/${this.contactId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
</script>

<style scoped>

</style>