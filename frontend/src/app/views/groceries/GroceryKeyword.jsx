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
  TableRow,
  Grid,
  Card,
  Tooltip
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import { Button, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

class GroceryKeyword extends Component {

  constructor(props) {
      super(props);
      this.state = {
        keywords: [],
        aisle_ids: [],
        keyword: '',
        aisles: [],
        groceries: [],
        aisle_id: ''
      }
      this.onChangeKeyword = this.onChangeKeyword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/keywords')
      .then(response => {
        this.setState({keywords: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  onChangeKeyword(event) {
    this.setState({ keyword: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("work please");
    axios.get('http://localhost:4000/keywords/find/'+this.state.keyword)
      .then(response => {
        this.setState({aisle_ids: response.data[0].aisles});
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      })
    this.setState({ aisles: [] });
    this.setState({ groceries: [] });
    this.state.aisle_ids.map((aisle_id, index)=>(
      axios.get('http://localhost:4000/aisles/'+ aisle_id)
        .then(response => {
          this.setState(state => {
            const list = state.aisles.push(response.data[0]);
            return {
              list
            };
          });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        })
    )) 
  }

  onChangeAisle(e) {
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

  addToCart(e) {
    e.preventDefault();
    console.log(this.state.product);
    const newProduct = this.state.product;
    axios.post('http://localhost:4000/cart/add',newProduct)
      .then(res => console.log(res.data));
    window.alert("item added to cart")
  }


  render() {
    return (
      <div className="w-100 overflow-auto">
        <br/>
        <center>
        <h2> Enter Keyword </h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text"
                className="form-control"
                value={this.state.keyword}
                onChange={this.onChangeKeyword}
                />
          </div>
          <div className="form-group">
            <button className="button button2" variant="contained" color="primary" type="submit">Search</button>
          </div>
        </form>
        </center>
        <br/>
        <Grid container spacing={3} className="mb-24">
              {this.state.keywords.map((currentKeyword, index) => (
                <Grid item xs={12} md={2}>
                  <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex flex-middle">
                      <div className="ml-12">
                        <h4 className="m-0 mt-4 text-primary font-weight-1000 capitalize">{currentKeyword.keyword}</h4>
                        <br/>
                      </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={() => {this.setState({ keyword: currentKeyword.keyword });}}>
                          <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <SimpleCard title="Aisles">
          <Table style={{ whiteSpace: "pre" }}>
            <TableHead>
              <TableRow>
                <TableCell className="px-0">AisleID</TableCell>
                <TableCell className="px-0">AisleName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.aisles.map((aisle, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {aisle.aisle_id}
                  </TableCell>
                  <TableCell className="px-0 capitalize">
                    {aisle.aisle}
                  </TableCell>
                  <TableCell className="px-0">
                    <IconButton onClick={(e)=> {this.setState({ aisle_id: aisle.aisle_id}); this.onChangeAisle(e)}}>
                      <Icon color="error">arrow_right_alt</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SimpleCard>

        <br/>

        <SimpleCard title="Products">
          <Table style={{ whiteSpace: "pre" }}>
            <TableHead>
              <TableRow>
                <TableCell className="px-0">ProductID</TableCell>
                <TableCell className="px-0">ProductName</TableCell>
                <TableCell className="px-0">AisleID</TableCell>
                <TableCell className="px-0">DepartmentID</TableCell>
                <TableCell className="px-0">AddToCart</TableCell>
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
                    <IconButton onClick={(e) => {this.setState({ product: currentGrocery}); this.addToCart(e)}}>
                      <Icon color="error">shopping_cart</Icon>
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

export default GroceryKeyword;
