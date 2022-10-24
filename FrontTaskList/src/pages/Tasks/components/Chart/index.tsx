import { CircularProgress, Flex } from '@chakra-ui/react';
import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartTaskProps {
  series: number[];
  isLoading: boolean;
}

export class ChartTask extends Component<ChartTaskProps, any> {
  constructor(props: ChartTaskProps) {
    super(props);

    this.state = {
      series: this.props.series,
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        colors: ['#2F855A', '#4299E1'],
        labels: ['Completadas', 'Não completadas'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
        />
        {this.props.isLoading && (
          <Flex justify="center" w={'100%'} mb={3}>
            <CircularProgress isIndeterminate color="green.500" />
          </Flex>
        )}
      </div>
    );
  }
}
