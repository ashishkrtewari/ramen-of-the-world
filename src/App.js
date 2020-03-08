import React from 'react';
import ListItem from "./components/listItem";
import './App.css';
import Sidebar from './components/sidebar';
import data from './ramen-list'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      restroList: [],
      filteredList: [],
      yearFilter: null,
      starFilter: null,
      countryFilter: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({restroList: data});
        this.setState({filteredList: data});
    }, 100)
  }

  filterList({text, yearFilter, starFilter, countryFilter}) {
    if (yearFilter === undefined) {
      yearFilter = this.state.yearFilter;
    }
    if (starFilter === undefined) {
      starFilter = this.state.starFilter;
    } else if (starFilter === "") {
      this.clearFilter("starFilter")
    }
    if (countryFilter === undefined) {
      countryFilter = this.state.countryFilter;
    }
    let filteredList = [...this.state.restroList];
    if (text) {
      text = text.toLowerCase();
      filteredList = filteredList.filter(restro => ~restro.Brand.toLowerCase().indexOf(text));
    }
    if (yearFilter) {
      filteredList = filteredList.filter(restro => ~restro['Top Ten'].indexOf(yearFilter));
      this.setState({yearFilter});
    }
    if (starFilter) {
      starFilter = Number(starFilter);
      filteredList = filteredList.filter(restro => restro.Stars === starFilter);
      this.setState({starFilter});
    }
    if (countryFilter) {
      filteredList = filteredList.filter(restro => restro.Country === countryFilter);
      this.setState({countryFilter});
    }
    if (text === "" || yearFilter === null || starFilter === null || countryFilter === null){
      this.setState({filteredList: [...this.state.restroList]});
    }
    this.setState({filteredList});
  }

  clearFilter(filter) {
    this.setState({[filter] : null}, () => {
      this.filterList({});
    })
  }

  render() {
    return (
      <div className="App">
        <header style={{backgroundImage: `url(https://source.unsplash.com/rAyCBQTH7ws/${window.innerWidth}x${window.innerWidth * 0.5})`}}>
          <div className="overlay"></div>
          <div className="head-content">
            <h1>Find the best ramen in the world!</h1>
            <input 
              type="text"
              name="search"
              placeholder="Restaurant Brand Name..."
              aria-label="search for ramen"
              onChange={(event) => this.filterList({text: event.target.value})}
            />
          </div>
        </header>
        <section className="flex content-wrapper">
          <Sidebar
            restroList={this.state.restroList}
            filterList={this.filterList.bind(this)}
            starFilter={this.state.starFilter}
            yearFilter={this.state.yearFilter}
            countryFilter={this.state.countryFilter}
            clearFilter={this.clearFilter.bind(this)}
          ></Sidebar>
          <div className="container flex flex-wrap justify-center">
            {
              this.state.filteredList.length ?
              this.state.filteredList.map((restro, index) => {
                console.log(index);
                return (
                  <ListItem key={index} index={index} restro={restro}></ListItem>
                ) 
              })
              : (<p className="backup-text">No Results Found, Please try removing few filters</p>)
            }
          </div>
        </section>

      </div>
    );
  }
}

export default App;
