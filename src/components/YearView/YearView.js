import React from 'react';
import PropTypes from 'prop-types';

import './YearView.css';
import ChartContainer from '../ChartContainer/ChartContainer';
import Navbar from '../Navigation/Navbar/Navbar';

const yearView = (props) => {
  const yearList = ['2025', '2024', '2023', '2022', '2021', '2020'];
  let yearCharts = null;
  if (props.yearData !== [] && props.yearData !== null) {
    yearCharts = (
      <React.Fragment>
        <h2>{props.selectedYear}</h2>
        <ChartContainer data={props.yearData} charType="line" />
      </React.Fragment>
    );
  } else if (props.selectedYear && props.yearData === null) {
    yearCharts = <p className="no-data">No data</p>;
  }

  return (
    <main className="year-view">
      <Navbar navbar2 />
      <form>
        <select defaultValue="default" onChange={props.calculateYearData}>
          <option value="default" disabled hidden>
            Select year
          </option>
          {yearList.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </form>
      {yearCharts}
    </main>
  );
};

yearView.propTypes = {
  yearData: PropTypes.array,
  selectedYear: PropTypes.string,
  calculateYearData: PropTypes.func,
};

export default yearView;
