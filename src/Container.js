import React from "react";
import mock_data from "./mock_data.json"

const Card = (props) => {
    return (
    <div class="ui card">
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
  render() {
    const query = this.state.query.toLowerCase();
    debugger;
    return (<React.Fragment>
      
      {/* Search */}
      <input value={this.state.query} onChange={this.onSearch} />
      
      
      {/* List */}
      {
        mock_data.filter(item => (item.name.match(new RegExp(query,"gi")) || item.description.match(new RegExp(query,"gi")))).map(item => {
          item.name.replaceAll(new RegExp(query,"gi"),function(q) { return <b>{q}</b> });
          item.description.replaceAll(new RegExp(query,"gi"),function(q) { return (<b>{q}</b>) }); 
          return <Card {...item}  />})
      }
      
      {/* <Table /> */}
    </React.Fragment>)
  }
}

export default Container;
