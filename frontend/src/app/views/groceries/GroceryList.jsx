import React, { Component } from "react";
import SimpleForm from "../material-kit/forms/SimpleForm";
import axios from 'axios';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import { Button, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

class GroceryList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        groceries: [],
        aisle_id: ''
      }
      this.onChangeAisle = this.onChangeAisle.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/products')
      .then(response => {
        this.setState({groceries: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  onChangeAisle(event) {
    this.setState({ aisle_id: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("work please");
    axios.get('http://localhost:4000/products/aisle/'+this.state.aisle_id)
      .then(response => {
        this.setState({groceries: response.data});
        console.log("in")
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="w-100 overflow-auto">
        <br/>
        <center>
        <h2> Enter Aisle Number </h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="number"
                className="form-control"
                value={this.state.aisle_id}
                onChange={this.onChangeAisle}
                />
          </div>
          <div className="form-group">
            <button className="button button2" variant="contained" color="primary" type="submit">Search</button>
          </div>
        </form>
        </center>
        <SimpleCard title="Simple Table">
          <Table style={{ whiteSpace: "pre" }}>
            <TableHead>
              <TableRow>
                <TableCell className="px-0">ProductID</TableCell>
                <TableCell className="px-0">ProductName</TableCell>
                <TableCell className="px-0">AisleID</TableCell>
                <TableCell className="px-0">DepartmentID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.groceries.map((currentGrocery, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {currentGrocery.product_id}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {currentGrocery.product_name}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {currentGrocery.aisle_id}
                  </TableCell>
                  <TableCell className="px-0 capitalize">
                    {currentGrocery.department_id}
                  </TableCell>
                  <TableCell className="px-0">
                    <IconButton>
                      <Icon color="error">close</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SimpleCard>

      </div>
    );
  }
}

export default GroceryList;
