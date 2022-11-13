import  axios from "axios"

export class ContactService{
    static serverUrl = "http://localhost:3000"

    static getAllContacts(){
      let dataUrl = this.serverUrl+'/contacts';
      return axios.get(dataUrl);
    }
    static getContact(contactId){
        let dataUrl = this.serverUrl+'/contacts/'+contactId;
        return axios.get(dataUrl);
    }
    static createContact(contact){
        let dataUrl = this.serverUrl+'/contacts';
        return axios.post(dataUrl,contact);
    }
    static updateContact(contactId,contact){
        let dataUrl = this.serverUrl+'/contacts/'+contactId;
        return axios.put(dataUrl, contact);
    }
    static deleteContact(contactId){
        let dataUrl = this.serverUrl+'/contacts/'+contactId;
        return axios.delete(dataUrl);
    }
    static searchContacts(keyword){
        let dataUrl = this.serverUrl+'/contacts?name_like='+keyword;
        return axios.get(dataUrl);
    }
}