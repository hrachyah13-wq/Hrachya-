import { useState } from 'react';

import './App.css'

function Counter (){
  const [count,setCount] = useState(0)
  return(
    <button onClick={() => setCount(count + 1 )}>
      Clicked {count} times 
    </button>
  )
}

  // export default function App (){
  //  return(
  //    <div className="dashboard">
  //     <h1>My dashboard</h1>
  //    <p> May 20,2026 </p>
  //   </div> 
  //  )
  // }

// 


export default function App() {
  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      <p>May 20, 2026</p>
      <ISSCard/>
      <Hrachya/>
    </div>

  );
}

function ISSCard() {
  return (
    <div className="card">
      <h2>ISS Position</h2>
      <p>Latitude: 42.36</p>
      <p>Longitude: -71.05</p>
    </div>
  );
}

function Hrachya() {
  return (
    <div className="Hrachya-">
      <h2>Hello</h2>
      <p>Latitude: 42.36</p>
      <p>Longitude: -71.05</p>
    </div>
  );
}

     


function ISSTracker() {
const [location, setLocation] = useState(null)

useEffect(() => {
fetch('https://api.wheretheiss.at/v1/satellites/25544')
.then(r => r.json())
.then(data => setLocation(data))
}, [])
return (
<div className="card">
<h2>ISS Position</h2>
{location ? (
<p>{location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°</p>
) : (
<p>Loading...</p>
)}
</div>
)
}


