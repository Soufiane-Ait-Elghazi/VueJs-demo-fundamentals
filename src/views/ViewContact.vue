<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">View Contact</p>
        <p class="fst-italic">
          HTTP (Hypertext Transfer Protocol) est l'ensemble de règles régissant le transfert de fichiers (texte, images, son, vidéo, et autres fichiers multimédias) sur le Web. Dès qu'un utilisateur se connecte au Web et ouvre un navigateur, il utilise indirectement le protocole HTTP
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center"  v-if="contact">
        <div class="col-md-4">
          <img class="edit-img" :src="contact.photo"  alt="" >
        </div>
        <div class="col-md-6 ">
          <ul class="list-group">
            <li class="list-group-item fw-bold">{{contact.name}}</li>
            <li class="list-group-item fw-bold">{{contact.email}}</li>
            <li class="list-group-item fw-bold">{{contact.mobile}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
         <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
      </div>
    </div>
  </div>

</template>

<script>
import {ContactService} from "@/services/contactService";

export default {
  name: "ViewContact",
  data : function(){
    return{
      contactId : this.$route.params.contactId,
      loading :false,
      contact : {},
      errorMessage :null
    };
  },
  created : async function() {
    try{
        this.loading = true
        let response = await ContactService.getContact(this.contactId);
        this.contact = response.data
       this.loading = false
    }catch(error){
      this.errorMessage = error
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>