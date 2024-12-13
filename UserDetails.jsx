import { useState, useEffect } from 'react';

const UserDetails = () => {
  const [machines, setMachines] = useState([]);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studyYear, setStudyYear] = useState('1st Year');
  const [machineId, setMachineId] = useState('');

  useEffect(() => {
    // Replace with the actual endpoint
    fetch('https://localhost:3001/machines')
      .then((response) => response.json())
      .then((data) => setMachines(data.machines))
      .catch((error) => console.error('Error fetching machine data:', error));
  }, []);

  const handleUseMachine = () => {
    if (!userName || !phoneNumber || !machineId) {
      alert('Please fill in all fields before proceeding.');
      return;
    }

    // Update the machine status locally
    const updatedMachines = machines.map((machine) =>
      machine.machineId === machineId ? { ...machine, status: 'inUse' } : machine
    );

    setMachines(updatedMachines);

    // Send update to the server
    fetch(`http://localhost:3001/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        machineId: `${machineId}`,
        status: 'inUse',
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Machine ${machineId} is now in use.`);
        } else {
          alert('Failed to update machine status.');
        }
      })
      .catch((error) => console.error('Error updating machine status:', error));
  };

  return (
    <div>
      <div
        style={{
          background: '#e6f7ff',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0px',
        }}
      >
        <h2 style={{ color: '#0057b8' }}>User Details</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Study Year:</label>
          <select
            value={studyYear}
            onChange={(e) => setStudyYear(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px' }}
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Machine ID:</label>
          <input
            type="text"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            placeholder="Enter machine ID"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px' }}
          />
        </div>
        <button
          onClick={handleUseMachine}
          style={{
            background: '#0057b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Use Machine
        </button>
      </div>

      <div
        style={{
          background: '#e6f7ff',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        {machines.map((machine) => (
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
              {machine.machineId} ({machine.status})
            </span>
            <button
              style={{
                background: machine.status === 'Unused' ? '#0057b8' : '#808080',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 15px',
                cursor: 'not-allowed',
              }}
              disabled={machine.status === 'inUse'}
            >
              {machine.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
