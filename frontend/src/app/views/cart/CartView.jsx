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

class CartView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        groceries: [],
        counters: [],
        suggested_counter: ''
      }
      this.GetCounter = this.GetCounter.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/cart')
      .then(response => {
        this.setState({groceries: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
    axios.get('http://localhost:4000/counters')
      .then(response => {
        this.setState({counters: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })  
      console.log(this.state.groceries)
    
  }
  

  // UpdateBillCounters(e){
  //   e.preventDefault();
  //   console.log(this.state.suggested_counter)
  //   var cur_que = this.state.counters[this.state.suggested_counter].number_of_people+1
  //   var cur_products = this.state.counters[this.state.suggested_counter].total_products+this.groceries.length
  //   const updated_counter = {
  //     counter_id : this.state.suggested_counter,
  //     number_of_people : cur_que,
  //     total_products : cur_products
  //   }
  //   console.log(updated_counter)
  //   axios.post('http://localhost:4000/counters/update', updated_counter)
  //   .then(res => console.log(res.data));

  // }

  GetCounter(e){
    var current_basket = this.state.groceries.length
    console.log("Groceries")
    console.log(this.state.groceries)
    e.preventDefault();
    var totaltime = []
        var billing_time = 1, buffer_time = 5
        
        this.state.counters.map((currentCounter,i) => {
            totaltime.push([ currentCounter.counter_id,(billing_time*currentCounter.total_products +
                                 buffer_time*currentCounter.number_of_people) ] )
        
            // console.log(currentCounter.total_products)
          })
        totaltime.sort()
        // console.log( "Total time")
        console.log(totaltime)
        var minval = totaltime[0][1];
        var opt_counter = 0;
        for(var iter =0 ; iter < totaltime.length; iter++ )
        {
          if(totaltime[iter][1] < minval )
          {
            minval = totaltime[iter][1];
            opt_counter = iter+1;
          }
        }
        // console.log( "Min Value " + minval)
        console.log("Answer " + opt_counter)
        this.setState({suggested_counter: opt_counter });
        
        var cur_que=0,cur_products=0;
        
        for( var i = 0; i < this.state.counters.length; i++)
        {
          if(this.state.counters[i].counter_id == opt_counter)
          {
            
            cur_que = this.state.counters[i].number_of_people+1;
            cur_products = this.state.counters[i].total_products+current_basket;
          }
        }
        
        console.log(cur_que)
        console.log(cur_products)
        const updated_counter = {
            counter_id : opt_counter,
            number_of_people : cur_que,
            total_products : cur_products
          }
          console.log(updated_counter)
          axios.post('http://localhost:4000/counters/update', updated_counter)
          .then(res => console.log(res.data));
          
          // window.alert("Go to counter number : " + opt_counter)

  }

  render() {
    return (
      <div className="w-100 overflow-auto">
        <br/>
        <SimpleCard title="Products">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SimpleCard>
        <center>
        <br/>
          <Button variant="contained" color="primary" onClick={this.GetCounter} >
            Show Billing Counter
          </Button>
        <br/>
        <br/>
        <br/>
        <h3> Go to counter number : {this.state.suggested_counter}</h3>
        <br/>
        <br/>
        </center>
      </div>
    );
  }
}

export default CartView;
