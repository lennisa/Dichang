import { useEffect, useState } from 'react';

const WashingMachines = () => {
  const [machines, setMachines] = useState([]);

  // Fetch machine data and initialize their state
  useEffect(() => {
    fetch('http://localhost:3001/machines')
      .then((response) => response.json())
      .then((data) => {
        // Initialize machine status to "Unused"
        const initializedMachines = data.machines.map((machine) => ({
          ...machine,
          status: 'Unused',
        }));
        setMachines(initializedMachines);
      })
      .catch((error) => console.error('Error fetching washing machine data:', error));
  }, []);

  // Toggle machine status between "In Use" and "Unused"
  const toggleMachineStatus = (machineId) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.machineId === machineId
          ? { ...machine, status: machine.status === 'Unused' ? 'In Use' : 'Unused' }
          : machine
      )
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#0057b8' }}>
        Welcome to Disang Hostel
      </h1>
      <div style={{ background: '#e6f7ff', padding: '10px', borderRadius: '10px', margin: '20px 0px' }}>
        {machines.map((machine, index) => (
          <div
            key={machine.machineId}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(to right, #ffd3b5, #ffaaa5)',
              margin: '10px 0',
              padding: '15px',
              borderRadius: '10px',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Washing Machine {index + 1} (Floor {index + 1})
            </span>
            <button
              style={{
                background: machine.status === 'Unused' ? '#0057b8' : '#ff5555',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 15px',
                cursor: 'pointer',
              }}
              onClick={() => toggleMachineStatus(machine.machineId)}
            >
              {machine.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WashingMachines;
