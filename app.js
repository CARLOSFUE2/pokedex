/*
//objets
const mainScreen = document.querySelector('.main-screen');
const pokeName= document.querySelector('.poke-name');
const pokeId= document.querySelector('.poke-id');
const pokeFrontImage= document.querySelector('.poke-front-image');
const pokeBackImage= document.querySelector('.poke-back-image');
const pokeTypeOne= document.querySelector('.poke-type-one');
const pokeTypeTwo= document.querySelector('.poke-type-two');
const pokeWeight= document.querySelector('.poke-weight');
const pokeHeight= document.querySelector('.poke-height');
const pokeListItens= document.querySelectorAll('.poke-list-item');
const letfButton= document.querySelector('.letf-button');
const rigthButton= document.querySelector('.rigth-button');


//constan
const TYPES = ['normal','fighting','flying' ,'poison' , 'ground' , 'rock' , 'bug' ,'steel' ,'ghost' , 'fire' ,'water','grass', 'electric','psychic','ice','dragon','dark','fairy'
];
const urlInitial='https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

let urlActuallly='';
let prevUrl=null;
let nextUrl=null;

//funtion
const resetScreen =() =>{
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};

const fetchPokeList= url =>{
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
    const { results, previous , next }= data;
    prevUrl= previous;
    nextUrl= next;
    urlActuallly=url;
    for(let i=0; i<pokeListItems; i++){
        const pokeListIten= pokeListItens[i];
        const resultData= results[i];

        if (resultData){
            const {name,url}= resultData;
            const urlArray=url.split('/');
            const id=urlArray[urlArray.length-2];
            pokeListIten.textContent= id+ '. '+name;
        }
        else{
            pokeListIten.textContent= '';
        };
    }
})
};
const fetchpokeData= id =>{
    fetch('https://pokeapi.co/api/v2/pokemon/${id}')
    .then(res =>{
    return res.json();
    })
    .then(data => {
        
        resetScreen();
     
        const dataTypes=data['types'];
        const dataFirstType= dataTypes[0];
        const dataSecondType=dataTypes[1];
        pokeTypeOne.textContent= dataFirstType['type']['name'];
        if(dataSecondType){
            pokeTypeTwo.textContent=dataSecondType['type']['name'];}
            else{
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent='';   
        } 
        mainScreen.classList.add(dataFirstType['type']['name']);
        
        pokeWeight.textContent= data['weight'];
        pokeName.textContent= data['name'];
        pokeHeight.textContent= data['height'];
        pokeId.textContent= data['id'];
       
        pokeFrontImage.src=data['sprites']['front_default'] || '';  
        pokeBackImage.src=data['sprites']['back_default'] || ''; 
        
    });
};
const handleRightButtonClick= ()=>{
if(nextUrl){
    fetchPokeList(nextUrl);
}
};
const handleLeftButtonClick= ()=>{
if(urlActuallly!== urlInitial){
    fetchPokeList(prevUrl);
} else{
    console.log("no existe lista anterior");
}
};
const handleListItenClick= (e)=>{
    if(!e.target) return;
    const listIten=e.target;
    if(!listIten.textContent)return;
    const id=listIten.textContent.split('.')[0];
    fetchpokeData(id);

};

//screen to letf

// to job for the right screen

//to jobs the button of right

letfButton.addEventListener('click',handleLeftButtonClick);
rightButton.addEventListener('click',handleRightButtonClick);
for (const pokeListIten of pokeListItens){
    pokeListIten.addEventListener('click', handleListItenClick)
}

//inicialite the game

fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

*/
const url= 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';


function init(url) {
    fetch(url)
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
  
        // Recorrer la lista de pokemones para luego renderizar en el html
        
        json.results.forEach((element) => {
          $(".right-container__screen").append(`
          <div data-url="${element.url}" onclick="getPokemonByUrl('${element.url}')" class="list-item">${element.name}</div>
          `);
          
          //<div data-url="${element.url}" class="list-item">${element.name}</div>
        });
      });
    
  };

 function getPokemonByUrl(url) {
     console.log(url);
     fetch(url)
     .then((result)=> result.json())
     .then( (element) => {
         console.log(element); 
        //variables  
        let id= element.id;
        let name= element.name;
        let weight=element.weight;
        let height= element.height;
        //cargar las cajas de texto
        document.getElementById("myid").textContent= id;
        document.getElementById("myname").textContent=name;
        document.getElementById("myweight").textContent= weight;
        document.getElementById("myheight").textContent= height;
         let colorType= document.getElementById("screen");

         //RESETEA EL COLOR DE FONDO
         colorType.className = 'main-screen';
         //resetear ventana tipos
        $(".stats__types").empty();

         //AGREGAR IMAGENES
        document.getElementById("front").src = element.sprites.front_default;
        document.getElementById("back").src = element.sprites.back_default;
        //agregar color de fondo
        colorType.classList.add(element.types[0].type.name);
        // cargar caja de typos
        element.types.forEach((type) => {
            $(".stats__types").append(`
            <div class="poke-type-one">${type.type.name}  </div>
            `);
            
        });
     })
};
//para cargar una nueva lista de pokemones
$("#right-button").click(function(){
   url='https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
    
  });
 
    init(url);