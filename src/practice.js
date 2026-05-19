const name = "HeloTUMO"
let count =  7

console.log (name)
console.log(count)

count = count + 77 
console.log(count)

let Miles= 77

function kmTOMiles(km){
    return km * 0.621;

}
console.log(kmTOMiles(Miles))


function parametr (name,craft){
'${name},is cuttently abard the,${craft'
}
console.log(parametr)


const IssPosition = {
    latitude: 45.5017,
    longitude:-73.5673
};
console.log("Dot notation:")
console.log(IssPosition.latitude);
console.log(IssPosition.longitude);

const asteroids = [

    {name: "2024 AB1", diameter : 120, hazadours: false }
    {name: "2024 CD2", diameter : 45, hazadours: true }
     {name: "2024 EF3", diameter : 890, hazadours: false }
    {name: "2024 GH4", diameter :23, hazadours: true };
]

const names = asteroids.map(asteroid => asteroid.name)
console.log(names)

const hazardousOnly = asteroids.filter(asteroid => asteroid.hazardous === true)
console.log(hazardousOnly)

const firstTwo =asteroids.slice (0,2)
console.log(firstTwo)

const hazardousNames = asteroids
 .filter(asteroid => asteroid.hazardous === true )
  .map(asteroid.nameames)
  console.log(hazardousNames)