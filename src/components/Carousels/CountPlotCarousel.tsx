import React, { useRef } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ApexCharts from "apexcharts"
import { CountPlotResult } from "../../types"
import { Box } from "@mui/material"
import convertToNormalCase from "../../utils/convert-to-normal-word"

interface Props {
  countPlotData: CountPlotResult[]
}

const getChartOptions = (countPlotData: CountPlotResult) => {
  const data = {
    x: countPlotData.x,
    y: countPlotData.y,
  }

  const options = {
    series: [
      {
        name: "Series Name",
        data: data.y,
      },
    ],
    chart: {
      type: "bar",
      height: 400,
    },
    xaxis: {
      categories: data.x,
    },
    title: {
      text: `Count Plot Diagram - ${convertToNormalCase(countPlotData.column)}`,
      align: "left",
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
  }

  return options
}

const CountPlotCarousel = ({ countPlotData }: Props) => {
  const chartRefs = useRef<any[]>([])

  React.useEffect(() => {
    chartRefs.current = chartRefs.current
      .slice(0, countPlotData.length)
      .map((_, index) => chartRefs.current[index])

    countPlotData.forEach((chartData, index) => {
      const options = getChartOptions(chartData)
      const chart = new ApexCharts(chartRefs.current[index], options)
      chart.render()
    })

    return () => {
      chartRefs.current.forEach((chartRef) => {
        if (chartRef && chartRef.destroy) {
          chartRef.destroy()
        }
      })
    }
  }, [countPlotData])

  return (
    <Box className="count-plot-container">
      <Carousel>
        {countPlotData.map((chartData, index) => (
          <div
            key={`chart-${index}`}
            ref={(el) => (chartRefs.current[index] = el)}
          />
        ))}
      </Carousel>
    </Box>
  )
}

export default CountPlotCarousel
