import React from 'react';

const Dropdown = (props) => {
  const numbers = [4, 5, 6, 7, 8, 9, 10];

  const handleChange = (event) => {
    props.onClick(event.target.value);
  };

  return (
    <>
      <label htmlFor="numbers">Choose a number:</label>
      <select id="numbers" defaultValue={8} onChange={handleChange}>
        {numbers.map(number => (
          <option key={number} value={number}>{number}</option>
        ))}
      </select>
    </>
  );
}

export default Dropdown;
