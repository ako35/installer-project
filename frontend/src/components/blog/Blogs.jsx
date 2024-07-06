import React, { useState } from 'react';

const Blogs = () => {
  const [playerCount, setPlayerCount] = useState(4); // Başlangıçta 4 oyuncu var

  const addPlayer = () => {
    setPlayerCount((prevCount) => prevCount + 1); // Her "+" butonuna basıldığında oyuncu sayısını arttır
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='p-3'></th>
            {[...Array(playerCount)].map((_, index) => ( // Dinamik olarak başlık alanlarını oluştur
              <th key={index} className='p-3'>
                <input type='text' placeholder={`${index + 1}. oyuncu`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 11 }).map((_, rowIndex) => ( // 11 satır oluştur
            <tr key={rowIndex}>
              <td className='p-3'>
                <label htmlFor="">{rowIndex + 1}</label>
              </td>
              {[...Array(playerCount)].map((_, colIndex) => ( // Her satır için oyuncu sayısı kadar giriş alanı oluştur
                <td key={colIndex} className='p-3'>
                  <input type="number" />
                  <button className='btn btn-primary'>+</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={addPlayer}>+</button> {/* Yeni oyuncu ekle butonu */}
    </div>
  );
};

export default Blogs;
