export class PokeService {
  constructor(searchString){
    this.searchString = searchString.toLowerCase();
  }
  async getResponse() {
    let response;
    try {
      response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.searchString}/`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      if (response.status === 404){
        console.log("HAY",response);
        return "Doesn't Exist";
      }
      else {
        return "You've caused an error";
      }
    }
  }
}
// if (error === "some string that the api gives you"){
  //   return "some other string"
  // }
  // else {
    // }
