import React from "react";
import moment from 'moment';
import mock_data from "./mock_data.json"
import ReactPaginate from 'react-paginate';

export const match = (item, query) => {
  const strictCheckArr = query.matchAll(/"[^"]*"/g)
  const checkArr = query.replace(/"[^"]*"/,' ').trim().split(/[ ]+/)
  let matched = true;
  let smatched = false;
  let ele;
  let strictCheckArrVals = []
  while(ele = strictCheckArr.next().value) {
    ele = ele[0].substr(1,ele[0].length -2)
    strictCheckArrVals.push(ele)
    if(item.name.match(new RegExp(ele,"gi")) || item.description.match(new RegExp(ele,"gi"))){ 
      smatched=true 
    }  
  }
  checkArr.forEach(ele => {
    if(!item.name.match(new RegExp(ele.toLowerCase(),"gi")) && !item.description.match(new RegExp(ele.toLowerCase(),"gi"))){ matched=false }
  });
  if(strictCheckArrVals.length>0 && smatched===false){
    return false
  } else {
    if(smatched===true){
      if(checkArr.length > 0 && matched === false){
        return false
      }
      return true
    }else{
      if(checkArr.length > 0 && matched === true){
        return true
      }
      return false
      }
    }
}

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

const Card = (props) => {
    return (
    <div className="card">
      <div className="image">
        <img src={props.image} />
      </div>
      <div className="content">
        <div className="header">{props.name}</div>
        <div className="meta">
          <span className="date">{moment(props.dateLastEdited).format("MMMM Do YYYY, h:mm:ss a")}</span>
        </div>
        <div className="description">{props.description}</div>
      </div>
    </div>
    )
}
export const Select = ({ name, value, handleChange }) => (
  <select className="selectfield" name={name} value={value} onChange={handleChange}>
    <option value="titleAsc">Title - ASC</option>
    <option value="titleDsc">Title - DSC</option>
    <option value="dateLastEdited">DateLastEdited</option>
  </select>
)
class Container extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      filteredData: [],
      query: localStorage.getItem('query') || "",
      offset: 0,
      limit: 6,
      deviceType: getDeviceType(),
      sortBy: localStorage.getItem('sortBy') || "dateLastEdited"
    }
    this.onSearch = this.onSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.loadPageData = this.loadPageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onSearch(e){
    this.setState({query: e.target.value}, function(){
      this.loadPageData()
    })
  }
  componentDidMount() {
    this.loadPageData();
  }
  loadPageData() {
    this.setState({
      filteredData: mock_data.filter(item => match(item, this.state.query)).sort(function(a,b){
        if(this.state.sortBy === "titleAsc"){
          return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
        }else if(this.state.sortBy === "titleDsc"){
          return (b.name < a.name ? -1 : b.name > a.name ? 1 : 0)
        }else if (this.state.sortBy === "dateLastEdited"){
          return new Date(b.dateLastEdited).getTime() - new Date(a.dateLastEdited).getTime()
        }
      }.bind(this))
    }, ()=>{
      localStorage.setItem('sortBy', this.state.sortBy);
      localStorage.setItem('query', this.state.query);
    });
  }
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset: offset }, () => {
      this.loadPageData();
    });
  };
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value },()=>{
      this.loadPageData()
    });
  }
  render() {
    const cards = this.state.filteredData.slice(this.state.offset,this.state.offset+6)
    return (<React.Fragment>
      <div className="header">
      <h1>Feed</h1>
      {/* Search */}
        <div className="topBar">
          <input className="input" value={this.state.query} id="text-input" type="text" placeholder="Search..." onChange={this.onSearch} />
          <Select name="sortBy" value={this.state.sortBy} handleChange={this.handleChange} />
        </div>
      </div>
      
      {/* List */}
      <div className="container">
        {
          cards.length>0 ? cards.map((item,i) => {
            return <Card {...item} key={i} />}) : <h4>No results found...</h4>
        }
      </div>

      {/* Pagination */}
      <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={parseInt(this.state.filteredData.length/this.state.limit)+1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />

      {/* Table */}
      <table style={{width:'100%'}}>
        <thead>
        <tr>
            <th>Name</th>
            <th>Image</th>
            { this.state.deviceType=="desktop" && <th>Description</th> }
            <th>DateLastEdited</th>
        </tr>
        </thead>
        <tbody>
        {this.state.filteredData.map((card,i)=>{
              return <tr className="row" key={"t"+i} onClick={()=> this.state.deviceType=="mobile" && alert(card.description)}>
              <td><img src={card.image} width="64"/></td>
              <td>{card.name}</td>
              { this.state.deviceType=="desktop" && <td>{card.description}</td> }
              <td>{moment(card.dateLastEdited).format("MMMM Do YYYY, h:mm:ss a")}</td> 
            </tr>
            })}
            </tbody>
      </table>
    </React.Fragment>)
  }
}

export default Container;
