import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [issPosition, setIssPosition] = useState({ latitude: '00.00', longitude: '00.00' });
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [asteroids, setAsteroids] = useState([]);
  const [loadingAsteroids, setLoadingAsteroids] = useState(true);
  const [speed, setSpeed] = useState(28000); // կմ/ժ
  const [pressure, setPressure] = useState(101.3); // կՊա (kPa)
  const [people, setPeople] = useState([])

// Ահա այստեղ է սխալը. selectedPerson-ը գոյություն չունի
const wikiName = encodeURIComponent(selectedPerson.name)
// 1. Ստանում ենք ՄՏՀ (ISS) դիրքը
const fetchIssPosition = async () => {
  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();

    setIssPosition({
      latitude: parseFloat(data.latitude).toFixed(4),
      longitude: parseFloat(data.longitude).toFixed(4),
    });
  } catch (error) {
    console.error("ISS դիրքի ստացման սխալ՝", error);
  }
};

// 2. Ստանում ենք տիեզերագնացների տվյալները
const fetchPeopleInSpace = async () => {
  try {
    const response = await fetch('https://corsproxy.io/?url=http://api.open-notify.org/astros.json');
    const data = await response.json();

    if (data.message === 'success') {
      setPeople(data.people);
    }
    setLoadingPeople(false);
  } catch (error) {
    console.error("Տիեզերագնացների տվյալների ստացման սխալ՝", error);
    setLoadingPeople(false);
  }
};

// 3. Ստանում ենք աստերոիդների տվյալները NASA API-ից
const fetchAsteroids = async () => {
  try {
    // UTC ամսաթիվ (NASA API-ն օգտագործում է UTC)
    const today = new Date().toISOString().split('T')[0];

    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`);
    const data = await response.json();

    if (data.near_earth_objects && data.near_earth_objects[today]) {
      setAsteroids(data.near_earth_objects[today]);
    }
    setLoadingAsteroids(false);
  } catch (error) {
    console.error("Աստերոիդների տվյալների ստացման սխալ՝", error);
    setLoadingAsteroids(false);
  }
};

useEffect(() => {
  fetchIssPosition();
  fetchPeopleInSpace();
  fetchAsteroids();

  const interval = setInterval(fetchIssPosition, 5000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setSpeed(prevSpeed => {
      const change = (Math.random() - 0.5) * 300;
      const newSpeed = prevSpeed + change;
      return Math.max(25000, Math.min(35000, Math.round(newSpeed)));
    });

    setPressure(prevPressure => {
      const change = (Math.random() - 0.5) * 1;
      const newPressure = prevPressure + change;
      return Math.max(95, Math.min(105, parseFloat(newPressure.toFixed(2))));
    });
  }, 2000);

  return () => clearInterval(interval);
}, []);

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const currentDate = new Date().toLocaleDateString('hy-AM', options);

return (
  <div className="dashboard-container">
    <header className="dashboard-header">
      <h1>Տիեզերական Վահանակ</h1>
      <p className="date-text">{currentDate}</p>
    </header>

    <main className="dashboard-content">

      {/* Արեգակնային համակարգ */}
      <section className="card-section solar-system-section">
        <h2 className="section-title">ԱՐԵԳԱԿՆԱՅԻՆ ՀԱՄԱԿԱՐԳ</h2>
        <div className="solar-system-container">
          <div className="sun"></div>
          <div className="orbit mercury-orbit"><div className="planet mercury"></div></div>
          <div className="orbit venus-orbit"><div className="planet venus"></div></div>
          <div className="orbit earth-orbit"><div className="planet earth"></div></div>
          <div className="orbit mars-orbit"><div className="planet mars"></div></div>
          <div className="orbit jupiter-orbit"><div className="planet jupiter"></div></div>
        </div>
        <p className="system-tip">Մոլորակները պտտվում են իրենց իրական արագությունների համամասնությամբ։</p>
      </section>

      {/* Տիեզերանավի համակարգի ցուցանիշներ (Արագություն և Ճնշում) */}
      <section className="card-section spaceship-dashboard">
        <h2 className="section-title">ՏԻԵԶԵՐԱՆԱՎԻ ՀԱՄԱԿԱՐԳ</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Արագություն: </span>
            <span className="stat-value speed highlight">{speed.toLocaleString()} կմ/ժ</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Ճնշում: </span>
            <span className="stat-value pressure highlight">{pressure} կՊա</span>
          </div>
        </div>
        <div className="system-status">
          <span className="status-dot blinking"></span>
          <span className="status-text"> Համակարգը կայուն է</span>
        </div>
      </section>

      {/* ՄՏՀ Դիրքը */}
      <section className="card-section">
        <h2 className="section-title">ՄՏՀ ԴԻՐՔԸ (ISS)</h2>
        <div className="coordinates-box">
          <p>Լայնություն: <span className="highlight">{issPosition.latitude}°</span></p>
          <p>Երկայնություն: <span className="highlight">{issPosition.longitude}°</span></p>
        </div>
      </section>

      {/* Մարդիկ տիեզերքում */}
      <section className="card-section">
        <h2 className="section-title">ՄԱՐԴԻԿ ՏԻԵԶԵՐՔՈՒՄ</h2>
        {loadingPeople ? (
          <p className="loading-text">Բեռնվում է...</p>
        ) : (
          <ul className="people-list">
            {people.map((person, index) => (
              <li key={index} className="person-item">
                <span className="person-name">{person.name}</span>
                <span className="spacecraft-tag">{person.craft}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Աստերոիդներ */}
      <section className="card-section full-width">
        <h2 className="section-title">ԱՅՍՕՐՎԱ ԱՍՏԵՐՈԻԴՆԵՐԸ</h2>
        {loadingAsteroids ? (
          <p className="loading-text">Բեռնվում է...</p>
        ) : asteroids.length === 0 ? (
          <p className="loading-text">Այսօր աստերոիդներ չկան։</p>
        ) : (
          <ul className="asteroid-list">
            {asteroids.map((asteroid) => (
              <li key={asteroid.id} className="asteroid-item">
                <div className="asteroid-info">
                  <span className="asteroid-name">{asteroid.name}</span>
                  <span className="asteroid-details">
                    Տրամագիծ՝ {(
                      (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
                        asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2
                    ).toFixed(3)} կմ
                  </span>
                </div>
                <span className={`hazard-tag ${asteroid.is_potentially_hazardous_asteroid ? 'danger' : 'safe'}`}>
                  {asteroid.is_potentially_hazardous_asteroid ? '⚠ ՎՏԱՆԳ' : '✓ ԱՆՎՏԱՆԳ'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  </div>
);
}

export default App;

