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
    console.log(mock_data)
    debugger;
  }
  render() {
    debugger;
    return (<React.Fragment>
      
      {/* Search */}
      <input />
      
      
      {/* List */}
      {
        mock_data.map(item => <Card {...item}/>)
      }
      
      {/* <Table /> */}
    </React.Fragment>)
  }
}

export default Container;
