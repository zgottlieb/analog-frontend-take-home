import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Message, TIME_WINDOW } from '../types';
import { useChartContext } from '../ChartContext';

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

  const { yDomain, updateYDomain } = useChartContext();

  useEffect(() => {
    data.forEach((d) => updateYDomain(d.value));
  }, [data, updateYDomain]);

  useEffect(() => {
    // Clear any existing content on each update
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Group element to contain the chart elements
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const parseDate = d3.isoParse;
    const filteredData = data.filter((d) => parseDate(d.timestamp) !== null);

    const xMax =
      d3.max(filteredData, (d) => parseDate(d.timestamp)) ?? new Date();
    const xMin = new Date(xMax.getTime() - TIME_WINDOW);
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .nice()
      .range([innerHeight, 0]);

    const verticalCenter = innerHeight / 2;

    g.append('line')
      .attr('x1', 0)
      .attr('y1', verticalCenter)
      .attr('x2', innerWidth)
      .attr('y2', verticalCenter)
      .attr('stroke', 'white');

    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'white');

    // x-axis label
    g.append('text')
      .attr('x', innerWidth)
      .attr('y', verticalCenter - 5)
      .attr('font-size', '0.8em')
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .text('time');

    // y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10)
      .attr('font-size', '0.8em')
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .text('value');

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
  }, [data, width, height, margin, yDomain]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default Chart;
