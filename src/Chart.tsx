import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Message } from './types';

type ChartProps = {
  data: Message[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const Chart = ({
  data,
  width = 250,
  height = 250,
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
}: ChartProps) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Clear any existing content on each update
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a group element to contain the chart elements
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Set up the scales
    const parseDate = d3.isoParse;
    const filteredData = data.filter((d) => parseDate(d.timestamp) !== null);

    const xExtent = d3.extent(
      filteredData,
      (d) => parseDate(d.timestamp) as Date
    );

    const xScale = d3
      .scaleTime()
      .domain(xExtent as [Date, Date])
      .range([0, innerWidth]);

    const yExtent = d3.extent(
      data.filter((d) => d.value !== undefined),
      (d) => d.value
    );

    const yScale = d3
      .scaleLinear()
      .domain(yExtent as [number, number])
      .nice()
      .range([innerHeight, 0]);

    // Draw x and y axes lines (no ticks or labels for now).
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight)
      .attr('stroke', 'white');

    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'white');

    const lineGenerator = d3
      .line<Message>()
      .x((d) => xScale(parseDate(d.timestamp) as Date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Append the path for chart line
    g.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', 'limegreen')
      .attr('stroke-width', 1)
      .attr('d', lineGenerator);
  }, [data, width, height, margin]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default Chart;
