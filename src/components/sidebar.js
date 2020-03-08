import React from 'react';

function Sidebar({restroList, filterList, starFilter, countryFilter, yearFilter, clearFilter}) {

const starFilterList = {}
const yearFilterList = {}
const countryFilterList = {}
restroList.map(restro => {
    if (!starFilterList[restro.Stars] && restro.Stars !== "NaN") {
        starFilterList[restro.Stars] = true;
    }
    const year = restro['Top Ten'] !== "NaN" ? restro['Top Ten'].split(" ")[0] : "";
    if (!yearFilterList[year] && year) {
        yearFilterList[year] = true;
    }
    if (!countryFilterList[restro.Country] && restro.Country !== "NaN") {
        countryFilterList[restro.Country] = true;
    }
    return true
})
  return (
    <div className="sidebar">
        <h3 className="fs-14">Filter By Stars</h3>
        <select className="select-css" onChange={(event) => filterList({starFilter:event.target.value})}>
            <option value="" selected={!starFilter}>Select Stars</option>
            {
                Object.keys(starFilterList).map((starValue, index) => (
                    <option key={index} selected={starFilter === starValue}>{starValue}</option>
                ))
            }
        </select>
        {starFilter ? (<p className="selected-filter">{starFilter}<span className="close-btn" onClick={(event) => clearFilter('starFilter')}>&#10005;</span></p>) : ""}
        <h3 className="fs-14">Filter By Country</h3>
        <select className="select-css" onChange={(event) => filterList({countryFilter:event.target.value})}>
            <option value="" selected={!countryFilter}>Select Country</option>
            {
                Object.keys(countryFilterList).map((countryValue, index) => (
                    <option key={index} selected={countryFilter === countryValue}>{countryValue}</option>
                ))
            }
        </select>
        {countryFilter ?( <p className="selected-filter">{countryFilter}<span className="close-btn" onClick={(event) => clearFilter('countryFilter')}>&#10005;</span></p>) : ""}
        <h3 className="fs-14">Filter By Year</h3>
        <select className="select-css" onChange={(event) => filterList({yearFilter:event.target.value})}>
            <option value="" selected={!yearFilter}>Select Year</option>
            {
                Object.keys(yearFilterList).map((yearValue, index) => (
                    <option key={index} selected={yearFilter === yearValue}>{yearValue}</option>
                ))
            }
        </select>
        {yearFilter ? (<p className="selected-filter">{yearFilter}<span className="close-btn" onClick={(event) => clearFilter('yearFilter')}>&#10005;</span></p>) : ""}
    </div>
  );
}

export default Sidebar;