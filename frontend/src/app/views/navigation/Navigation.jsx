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
import './nav.css';
var products=require('./csvjson.json');
var rows = 22;
var cols = 21;
function remove(sample,req){
  var temp =-1;
  for(var i=0;i<sample.length;i++){
      if(sample[i][0]==req[0] && sample[i][1]==req[1]){
          temp=i;
      }
  }
  var ret=[];
  for(var i=0;i<sample.length;i++){
      if(i!=temp){
          ret.push(sample[i]);
      }
  }
  return ret;
}
function fillGrid(grid,rows,cols){
  var grid_html = document.getElementsByClassName("grid");
  grid_html.innerHTML+="<table id='short'>";
  for(var i =0;i<rows;i++){
      document.getElementById('short').innerHTML+="<tr id="+i+">";
      for(let j=0;j<cols;j++){
          if(grid[i][j]==0){
              document.getElementById(i).innerHTML+=`<td id='free'></td>`;
          }
          else if(grid[i][j]==1){
              document.getElementById(i).innerHTML+=`<td id='aisle'></td>`;
          }
          else if(grid[i][j]>=2){
              if(grid[i][j]>2)
                  document.getElementById(i).innerHTML+=`<td id='final'></td>`;
                  else
                  document.getElementById(i).innerHTML+=`<td id='path'></td>`;
          }
      }
      grid_html.innerHTML+="</tr>";
  }
  grid_html.innerHTML+="</table>";
}

function user_input(grid,product){
    for(var i=0;i<10;i++){
      let row = Math.floor(Math.random()*22);
      let col = Math.floor(Math.random()*21);
      while(row!=0 && row!=rows && col%2==1){
        row = Math.floor(Math.random()*22);
        col = Math.floor(Math.random()*21);
      }
      console.log(row);console.log(col);
      grid[row][col]=3;
    }
}

function FindPath(grid){
  var row = 0;
  var col = 0;
  var inp = [];
  for (var r=0;r< (rows);r++){
      for(var c=0;c<(cols);c++){
          if(grid[r][c]==3){
              inp.push([r,c]);
          }
      }
  }
  let it = 3;
  while(inp.length){
      var short_dist = [0,1e19];
      var move = [];
      for (var i=0;i<inp.length;i++){
          // console.log(inp[i])
          var final_row = inp[i][0];
          var final_col = inp[i][1];
          var dist = distance(row,col,final_row,final_col);
          // console.log(dist);
          if (dist[1]<short_dist[1]){
              short_dist = dist;
              move=[final_row,final_col];
          }
      }
      inp = remove(inp,move);
      markDistance(grid,row,col,[short_dist[0],move],it);
      it+=1;
      console.log(inp);
      row=move[0];
      col=move[1];
  }
}
function markDistance(grid,row,col,move,it){
  var alter = move[0];
  var final = move[1];
  console.log(alter)
  if (alter==1){
      for (var i=0;i<(Math.abs(final[1]-col))+1;i++){
          if(grid[row][i+Math.min(final[1],col)]==0)
              grid[row][i+Math.min(final[1],col)]=2;
      }
  }
  else if (alter==2){
      for (var i=0;i< ((Math.abs(row-final[0]))+1);i++){
          if(grid[Math.min(row,final[0])+i][col]==0)
          grid[Math.min(row,final[0])+i][col]=2;
      }
  }
  else if (alter==3){
      if(col%2==1 || final[1]%2==1){
          if(grid[row][col]==0)
              grid[row][col]=2;
          grid[final[0]][final[1]]=it;
          if(col<final[1]){
              if(final[1]%2==1)   final[1]--;
              if(col%2==1)    col++;
          }
          else{
              if(final[1]%2==1)   final[1]++;
              if(col%2==1)    col--;
          }
      }
      for (var i=0;i<(row+1);i++){
          if(grid[i][col]==0)
              grid[i][col]=2;
      }
      for (var i =0;i<((Math.abs(final[1]-col))+1);i++){
          if(grid[0][Math.min(final[1],col)+i]==0)
              grid[0][Math.min(final[1],col)+i]=2;
      }
      for (var i=0;i<(final[0]+1);i++){
          if(grid[i][final[1]]==0)
          grid[i][final[1]]=2;
      }
  }
  else{
      if(col%2==1 || final[1]%2==1){
          if(grid[row][col]==0)
              grid[row][col]=2;
          grid[final[0]][final[1]]=it;
          if(col<final[1]){
              if(final[1]%2==1)   final[1]--;
              if(col%2==1)    col++;
          }
          else{
              if(final[1]%2==1)   final[1]++;
              if(col%2==1)    col--;
          }
      }
      for (var i=row;i<rows;i++){
          if(grid[i][col]==0)
              grid[i][col]=2;
      }
      for (var i=0; i< ((Math.abs(final[1]-col))+1);i++){
          if(grid[rows-1][Math.min(final[1],col)+i]==0)
              grid[rows-1][Math.min(final[1],col)+i]=2;
      }
      for(var i=final[0];i<(rows);i++){
          if(grid[i][final[1]]==0)
              grid[i][final[1]]=2;
      }
  }
  grid[final[0]][final[1]]=it;
}
function distance(row,col,final_row,final_col){
  if (row==final_row && (row==0 || row==rows-1)){
      // console.log("Case 1");
      return [1,Math.abs((-col)+(-final_col))];
  }
  if (col==final_col){
      var value = row-final_row;
      // console.log(value);
      return [2,value];
  }
  var going_to_zero = col + Math.abs(row-final_row)+final_col;
  var going_to_end = cols-col + Math.abs(row-final_row)+cols-final_col;
  if(going_to_zero<going_to_end){
      // console.log("Case 3");
      return [3,going_to_zero];
  }
  // console.log("Case 4");
  return [4,going_to_end];
}
function main(grid,rows,cols){
  document.getElementById('short').innerHTML="";
  grid=[];
  for(var i =0;i<rows;i++){
    var temp=[];
    for(var j=0;j<cols;j++){
      temp.push(0);
    }
    grid.push(temp);
  }
  for(var row =0;row<rows;row++){
    for(var col=0;col<cols;col++){
      if(col%2==1 && row>0 && row<rows-1){
        grid[row][col]=1;
      }
    }
  }
  user_input(grid,[])
  // user_input(grid,recommendations["recommendations"][1]["product_id"]);
  FindPath(grid)
  fillGrid(grid,rows,cols);
  console.log(grid);
}
class Navigation extends Component {

  constructor(props) {
      super(props);
      this.rows = 22;
      this.cols = 21;
      this.componentDidMount=this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    main(this.grid,this.rows,this.cols);
  }

  render() {
    return (
      <div>
        <div className="grid">
          <center>
            <h3> Note: The 134 aisles is difficult to see, so the current map is shown for a random of 10 products in a smaller grid </h3>
          </center>
          <br/>
          <br/>
          <table id="short"></table><br></br>
          <table id="index">
            <th>INDEX</th>
            <tr>
              <td id='free'></td>
              <td id='text'>Path is free</td>
            </tr>
            <tr>
              <td id='aisle'></td>
              <td id='text'>Aisle is present</td>
            </tr>
            <tr>
              <td id='path'></td>
              <td id='text'>Shortest Path</td>
            </tr>
            <tr>
              <td id='final'></td>
              <td id='text'>Product is present</td>
            </tr>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={this.componentDidMount}>New Items</Button>
          </table>
        </div>

      </div>
    );
  }
}

export default Navigation;
