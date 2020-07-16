import React, { Component, Fragment } from "react";
import { Slide } from 'react-slideshow-image';
import {
  Grid,
  Card
} from "@material-ui/core";

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import BasicMap from "./shared/BasicMap";
import { withStyles } from "@material-ui/styles";
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  '/assets/images/slide-4.jpg',
  '/assets/images/slide-5.jpg',
  '/assets/images/slide-6.jpg'
];

class Dashboard1 extends Component {
  state = {};

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
              <TableCard/>
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
