import PropTypes from "prop-types";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

// Viene en formato de { section: consumo, section: consumo }

/*
       {
            chart: {
              width: 380,
              type: 'pie',
            },
            series: [],
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
*/

const SectorPieChartCard = ({ sections }) => {
    const options = useMemo(() => (
        {    
            chart: {
                type: "donut",
            },
            series: Object.values(sections),
            labels: Object.keys(sections),
            responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
        }
    ), [sections]);
    return (
        <ReactApexChart 
            options={options}
            series={options.series}
            labels={options.labels}
            width={500}
            type="donut"
        />
    )
}

SectorPieChartCard.propTypes = {
    sections: PropTypes.object.isRequired,
}

export default SectorPieChartCard;