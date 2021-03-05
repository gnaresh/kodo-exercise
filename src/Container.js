import React from "react";
import mock_data from "./mock_data.json"

const Card = (props) => {
    return (
    <div class="card">
      <div class="image">
        <img src={props.image} />
      </div>
      <div class="content">
        <div class="header">{props.name}</div>
        <div class="meta">
          <span class="date">{props.dateLastEdited}</span>
        </div>
        <div class="description">{props.description}</div>
      </div>
    </div>
    )
}

class Container extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      query: ""
    }
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(e){
    this.setState({query: e.target.value})
  }
  found(item, query){
    const strictCheckArr = query.matchAll(/"[^"]*"/g)
    const checkArr = query.replace(/"[^"]*"/,' ').trim().split(/[ ]+/)
    let matched = true;
    let smatched = false;
    let ele;
    let strictCheckArrVals = []
    while(ele = strictCheckArr.next().value){
      ele = ele[0].substr(1,ele[0].length -2)
      strictCheckArrVals.push(ele)
      if(item.name.match(new RegExp(ele,"gi") || item.description.match(new RegExp(ele,"gi")))){ smatched=true }  
    }
    checkArr.forEach(ele => {
      if(!item.name.match(new RegExp(ele.toLowerCase(),"gi")) && !item.description.match(new RegExp(ele.toLowerCase(),"gi"))){ matched=false }
    });
    if(strictCheckArrVals.length>0 && smatched===false){
      return false
    } else {
      if(smatched===true){
        if(checkArr.length > 0 && matched == false){
          return false
        }
        return true
      }else{
        if(checkArr.length > 0 && matched == true){
          return true
        }
        return false
        }
      }
  }
  render() {
    const query = this.state.query.toLowerCase();
    const cards = mock_data.filter(item => this.found(item, this.state.query)).map(item => {
      item.name.replaceAll(new RegExp(query,"gi"),function(q) { return <b>{q}</b> });
      item.description.replaceAll(new RegExp(query,"gi"),function(q) { return (<b>{q}</b>) }); 
      return <Card {...item}  />})
    return (<React.Fragment>
      <div className="header">
      <h1>Feed</h1>
      {/* Search */}
        <div className="topBar">
          <input className="input" value={this.state.query} id="text-input" type="text" placeholder="Search..." onChange={this.onSearch} />
        </div>
      </div>
      
      {/* List */}
      <div className="container">
        {
          cards.length>0 ? cards : <h4>No results found...</h4>
        }
      </div>

      {/* <Table /> */}
    </React.Fragment>)
  }
}

export default Container;
