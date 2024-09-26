import React, { useState, useEffect } from 'react';
import storedData from './Data.json';
import ufc from './assests/ufc.png';

const App = () => {
  const [data, setData] = useState([]);
  const [groupBy, setGroupBy] = useState('event'); 
  const [selectedProps, setSelectedProps] = useState({}); 

  useEffect(() => {
    setData(Object.values(storedData.data.data)); 
  }, []);

 
  const handlePropSelection = (playerId, choiceAbbr) => {
    setSelectedProps(prevState => ({
      ...prevState,
      [playerId]: choiceAbbr,
    }));
  };

  
  const groupedData = groupBy === 'event'
    ? (Array.isArray(data) ? data : []) 
    : Object.values(
        data.reduce((acc, prop) => {
          prop.players.forEach(player => {
            if (!acc[player.name]) {
              acc[player.name] = {
                ...player,
                props: [],
              };
            }
            acc[player.name].props.push(prop);
          });
          return acc;
        }, {})
      );

  return (
    <div className="flex flex-col bg-gray-800" style={{ backgroundColor: '#1B1F2D' }}>
      <div className="flex justify-between mb-4 mx-5 sm:mx-10 my-5">
      
        <button
          className={`px-4 py-2 text-white ${groupBy === 'event' ? 'bg-transparent text-red-600 border border-white' : 'bg-gray-500'}`}
          onClick={() => setGroupBy('event')}
        >
          Group by Event
        </button>
        <button
          className={`px-4 py-2 text-white ${groupBy === 'player' ? 'bg-transparent text-red-600 border border-white' : 'bg-gray-500'}`}
          onClick={() => setGroupBy('player')}
        >
          Group by Player
        </button>
      </div>

   
      {Array.isArray(groupedData) && groupedData.length > 0 ? (
        groupedData.map((info, index) => {
          const isGroupedByPlayer = groupBy === 'player';
          return (
            <div key={index} className="text-white mb-10 inline-block border-2 border-gray-600 mx-5 sm:mx-10 rounded-lg p-5">
              {isGroupedByPlayer ? (
                <>
                  <span className='flex items-center'>
                    <img src={ufc} alt='UFC' className='w-14 mr-2' />
                    <h2 className="text-xl font-bold">{info.name}</h2>
                  </span>
                  {info.props.map((prop, propIndex) => (
                    <div key={propIndex} className="flex justify-between mt-2">
                      <span>{prop.event.name}</span>
                      <span>{prop.bidStats.name}: {prop.bidStats.value}</span>
                      <div className='border-2 border-blue-500 rounded-full text-blue-500 overflow-hidden'>
                      
                        <button
                          className={`px-4 py-1 mr-2 ${selectedProps[info.id] === 'O' ? 'bg-gray-500 text-white' : 'bg-transparent'}`}
                          onClick={() => handlePropSelection(info.id, 'O')}
                          disabled={selectedProps[info.id] === 'U'}
                        >
                          Over
                        </button>
                        <button
                          className={`px-4 py-1 ${selectedProps[info.id] === 'U' ? 'bg-gray-500 text-white' : 'bg-transparent'}`}
                          onClick={() => handlePropSelection(info.id, 'U')}
                          disabled={selectedProps[info.id] === 'O'}
                        >
                          Under
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <span className='flex items-center'>
                    <img src={ufc} alt='UFC' className='w-14 mr-2' />
                    <span className="text-xl font-bold">{info.event.name}</span>
                  </span>
                  <span>{info.bidStats.name}: {info.bidStats.value}</span>
                  <div className="flex justify-between mt-2">
                    {info.players.map(player => (
                      <span key={player.id}>{player.name}</span>
                    ))}
                    <div className='border-2 border-blue-500 rounded-full text-blue-500 overflow-hidden'>
                      <button
                        className={`px-4 py-1 mr-2 ${selectedProps[info.players[0].id] === 'O' ? 'bg-gray-500 text-white' : 'bg-transparent'}`}
                        onClick={() => handlePropSelection(info.players[0].id, 'O')}
                        disabled={selectedProps[info.players[0].id] === 'U'}
                      >
                        Over
                      </button>
                      <button
                        className={`px-4 py-1 ${selectedProps[info.players[0].id] === 'U' ? 'bg-gray-500 text-white' : 'bg-transparent'}`}
                        onClick={() => handlePropSelection(info.players[0].id, 'U')}
                        disabled={selectedProps[info.players[0].id] === 'O'}
                      >
                        Under
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-white text-center">No data available</p>
      )}
    </div>
  );
};

export default App;
