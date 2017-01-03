import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import data from './data'
import styles from './App.css'
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

console.log('cx',cx)
class d3Chart extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:''}
    }

    componentDidMount(){
        this.draw()
    }


    draw(){


        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //
        //
            var x = d3.scaleLinear()
                .rangeRound([0,width]);

            var y = d3.scaleLinear()
                .rangeRound([height, 0]);
        //
            function make_x_grid_lines(){
                return d3.axisBottom(x)
                    .ticks(10)
            }
        //
            function make_y_gridlines() {
                return d3.axisLeft(y)
                    .ticks(10)
            }

            var lineCount = d3.line()
                .x(function(d) { return x(d.week); })
                .y(function(d) { return y(d.users); });


                x.domain(d3.extent(data, function(d) {return d.week; }));
                y.domain(d3.extent(data, function(d) { return d.users; }));
                // y.domain(d3.extent(data, function(d) { return d.cosmiq_count.total; }));

                // // add the X gridlines
                g.append("g")
                  .attr("class", `grid`)
                  .attr("transform", "translate(0," + height + ")")
                  .call(make_x_grid_lines()
                      .tickSize(-height)
                      .tickFormat(""))
                //
                //   // add the Y gridlines
                g.append("g")
                .attr("class", `grid`)
                .call(make_y_gridlines()
                  .tickSize(-width)
                  .tickFormat(""))

                g.append("g")
                    .attr("class", `axis axis--x`)
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                // .append('text')
                //     .class('class', 'xlabel')
                //     .attr("text-anchor", "end")
                //     .attr('x',width)
                //     .attr('y',height - 6)
                //     .text("Weeks")

                g.append("g")
                    .attr("class", `${cx('axis axis--y')}`)
                    .call(d3.axisLeft(y))
                .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .style("text-anchor", "end")
                    .text("Users");

                g.append("path")
                    .datum(data)
                    .attr("class", `lineOrders`)
                    .attr("d", lineCount)


    }


    render(){

        return (
            <div className="chart" >
                <svg width="960" height="500" style={{border:'solid 1px #eee',borderBottom:'solid 1px #ccc'}} />
            </div>
        )
    }
}

export default d3Chart;
