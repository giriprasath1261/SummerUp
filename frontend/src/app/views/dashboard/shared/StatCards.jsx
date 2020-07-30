import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const StatCards = ({theme}) => {
  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <Icon
                style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
                }}
              >
                spa
              </Icon>
              <h6 className="m-0 mt-4 text-primary font-weight-500">Groceries</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton href="http://localhost:3000/grocery/aisle">
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <Icon
                style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
                }}
              >
                healing
              </Icon>
              <h6 className="m-0 mt-4 text-primary font-weight-500">Medicines</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <Icon
                style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
                }}
              >
                shopping_basket
              </Icon>
              <h6 className="m-0 mt-4 text-primary font-weight-500">Fruits & Vegetables</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <Icon
                style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
                }}
              >
                memory
              </Icon>
              <h6 className="m-0 mt-4 text-primary font-weight-500">Electronics</h6>              
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              restaurant_menu
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                Food
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              pets
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                Pet Supplies
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              fitness_center
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                Health
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              shopping_cart
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                Gifts
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>

    </Grid>
  );
};

export default StatCards;
