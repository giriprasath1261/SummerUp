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

class Navigation extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    console.log("hello");
  }

  render() {
    return (
      <h3> Hello </h3>
    );
  }
}

export default Navigation;
