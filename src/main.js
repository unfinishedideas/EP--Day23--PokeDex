import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { PokeService } from './apicall.js';

// class StatObj {
//   constructor(name, value){
//     this.name = name;
//     this.value = value;
//   }
// }

$(document).ready(function(){

  let updatePokemon = (name, spriteURL, statArray, games, types) => {
    console.log(types);
    $("#gamesList").text("");
    $("#statsList").text("");
    $("#typesList").text("");

    $("#pokeSprite").html('<img src="'+spriteURL+'"></img>');
    $("#name").text(name);

    statArray.forEach(function(stat){
      $("#statsList").append(`<li>${stat.stat.name} : ${stat.base_stat}</li>`);
    });

    games.forEach(function(game){
      $("#gamesList").prepend(`<li>${game.version.name}</li>`);
    });

    types.forEach(function(type){
      $("#typesList").prepend(`<li>${type.type.name}</li>`);
    });
  };



  // When user passes a search string!- - - - - - - - - - - - - - - - - - -
  $(".pokeForm").submit(function(event){
    event.preventDefault();
    let searchString = $("#pokemonInput").val();
    (async () => {
      let pokeService = new PokeService(searchString);
      const response = await pokeService.getResponse();
      if (response === "You've caused an error"){
        $("#errorMessage").show();
        $(".pokeDisplay").hide();
      } else if (response === "Doesn't Exist"){
        $("#noExist").show();
        $(".pokeDisplay").hide();
      } else {
        getElements(response);
        $("#pokemonInput").val("");
        $(".pokeDisplay").show();
        $("#noExist").hide();
        $("#errorMessage").hide();
      }
    })();
  });

  function getElements(response) {
    let spriteURL = response.sprites.front_shiny;
    let name = response.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let stats = response.stats;
    let games = response.game_indices;
    let types = response.types;
    console.log(response);
    updatePokemon(name, spriteURL, stats, games, types);
  }

});
