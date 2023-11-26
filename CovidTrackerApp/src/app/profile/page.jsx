"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [covidData, setCovidData] = useState(null);

  const callLogout = async () => {
    const response = await axios.get('/api/users/logout');

    if (response.status === 200) {
      router.push('/login');
    }
  };

  const handleCheckCovidData = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://covid-19-tracking.p.rapidapi.com/v1/usa',
        headers: {
          'X-RapidAPI-Key': '03bbe3af1dmsh8774140614807fcp119fd7jsn7a5a3e36bd82',
          'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      if (response.status === 200) {
        setCovidData(response.data);
      }
    } catch (error) {
      console.error('Error fetching COVID data:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl mb-4 text-center">Welcome to the Covid Tracker</h1>
        <p>
          View the Covid Data
        </p>
        <button
          className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 square-full mt-4 w-full"
          onClick={callLogout}
        >
          Logout
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 square-full mt-4 w-full"
          onClick={handleCheckCovidData}
        >
          Check Covid Data
        </button>
        {covidData && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">COVID Data:</h2>
            <table className="mt-2 w-full">
              <thead>
                <tr>
                  {Object.keys(covidData).map((key) => (
                    <th key={key} className="border px-4 py-2">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(covidData).map((value, index) => (
                    <td key={index} className="border px-4 py-2">{value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Profile;