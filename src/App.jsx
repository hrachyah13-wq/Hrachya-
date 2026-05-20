

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

