<template>
   <div class="container mt-3">
     <div class="row">
       <div class="col">
         <p class="h3 text-success fw-bold">Add Contact</p>
         <p class="fst-italic">
           HTTP (Hypertext Transfer Protocol) est l'ensemble de règles régissant le transfert de fichiers (texte, images, son, vidéo, et autres fichiers multimédias) sur le Web. Dès qu'un utilisateur se connecte au Web et ouvre un navigateur, il utilise indirectement le protocole HTTP
         </p>
       </div>
     </div>
   </div>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submitCreate()">
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
            <input type="submit" class="btn btn-success" value="Create">
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img :src="contact.photo" alt="photo" class="contact-img">
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/contactService";

export default {
  name: "AddContact",
  data : function (){
    return{
      contact :{
        name : '',
        mobile : '',
        photo : '',
        email : '',
      }
    }
  },
  methods :{
    submitCreate :async function (){
      try{
        let response = await ContactService.createContact(this.contact)
        if(response){
          window.location.replace("/contacts");
        }
        else{
          window.location.replace('/contacts/add')
        }

      }catch(error){
          console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>