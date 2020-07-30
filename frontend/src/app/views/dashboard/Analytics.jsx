import React, { Component, Fragment } from "react";
import { Slide } from 'react-slideshow-image';
import {
  Grid,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
  IconButton
} from "@material-ui/core";
import axios from 'axios';

import DoughnutChart from "../charts/echarts/Doughnut";


import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import BasicMap from "./shared/BasicMap";
import { withStyles } from "@material-ui/styles";
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  '/assets/images/walmart.jpg',
  '/assets/images/walmart2.jpg',
  '/assets/images/walmart3.jpg'
];

class Dashboard1 extends Component {

  constructor(props) {
      super(props);
      this.state = {
        productList: Array(),
        recommendations: [],
        product: ''
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/recommendations')
      .then(response => {
        this.setState({recommendations: response.data});
        console.log(this.state.recommendations);
      })
      .catch(function(error) {
        console.log(error);
      }) 
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ productList: [] });
    this.state.recommendations.map((recommendation, index)=>(
      axios.get('http://localhost:4000/products/find/'+ recommendation.product_id)
        .then(response => {
          this.setState(state => {
            const list = state.productList.push(response.data[0]);
            return {
              list
            };
          });
        })
        .catch(function(error) {
          console.log(error);
        })
    ));
    console.log(this.state.productList);
  }

  addToCart(e) {
    e.preventDefault();
    const newProduct = this.state.product;
    axios.post('http://localhost:4000/cart/add',newProduct)
      .then(res => console.log(res.data));
    window.alert("item added to cart")
  }

  render() {
    let { theme } = this.props;

    return (
      <Fragment>
        <div className="pb-86 pt-15 px-30 bg-primary">
          <div className="slide-container">
            <br/>
            <Slide>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[0]})`, "height":"400px", "backgroundSize":"100%", "backgroundRepeat":"no-repeat", "backgroundPosition":"center"}}>
                </div>
              </div>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[1]})`, "height":"400px", "backgroundSize":"100%", "backgroundRepeat":"no-repeat", "backgroundPosition":"center"}}>
                </div>
              </div>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[2]})`, "height":"400px", "backgroundSize":"100%", "backgroundRepeat":"no-repeat", "backgroundPosition":"center"}}>
                </div>
              </div>
            </Slide>
          </div>
        </div>

        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>

              <StatCards theme={theme}/>

              {/* Top Selling Products */}

              <Card elevation={3} className="pt-20 mb-24">
              <div className="card-title px-24 mb-12">Top Picks For You</div>
              <div className="overflow-auto">
                <Table className="product-table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-24" colSpan={1}>
                        ProductID
                      </TableCell>
                      <TableCell className="px-0" colSpan={2}>
                        Name
                      </TableCell>
                      <TableCell className="px-0" colSpan={1}>
                        AisleID
                      </TableCell>
                      <TableCell className="px-0" colSpan={1}>
                        Add to cart
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.productList.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-0 capitalize" colSpan={1} align="left">
                          {product.product_id}
                        </TableCell>
                        <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                          {product.product_name}
                        </TableCell>
                        <TableCell className="px-0" align="left" colSpan={1}>
                          {product.aisle_id}
                        </TableCell>
                        <TableCell className="px-0" colSpan={1}>
                          <IconButton onClick={(e) => {this.setState({ product: product}); this.addToCart(e)}}>
                            <Icon color="primary">shopping_cart</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <IconButton onClick={this.onSubmit}>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
                <h6> Click here to see Top Picks </h6>
              </div>
            </Card>



            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card className="px-24 py-16 mb-16">
                <div className="card-title">Nearest Store</div>
                <div className="card-subtitle">Updated 2 mins ago</div>
                <BasicMap/>
              </Card>

            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
