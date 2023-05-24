import React, { useRef } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ApexCharts from "apexcharts"
import { BoxPlotResult } from "../types"
import { Box } from "@mui/material"

interface Props {
  boxPlotData: BoxPlotResult[]
}

const getChartOptions = (boxPlotData: BoxPlotResult) => {
  const data = {
    x: boxPlotData.x,
    y: boxPlotData.y,
  }


  const options = {
    series: [
      {
        name: "Box plot",
        type: "boxPlot",
        data: [data],
      },
    ],
    chart: {
      type: "boxPlot",
      height: 350,
    },
    title: {
      text: `Box Plot Dijagram - ${boxPlotData.x}`,
      align: "left",
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#008FFB",
          lower: "#FEB019",
        },
        showOutliers: true,
      },
    },
  }

  return options
}

const BoxPlotCarousel = ({ boxPlotData }: Props) => {
  const chartRefs = useRef<any[]>([])

  React.useEffect(() => {
    chartRefs.current = chartRefs.current
      .slice(0, boxPlotData.length)
      .map((_, index) => chartRefs.current[index])

    boxPlotData.forEach((chartData, index) => {
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
  }, [boxPlotData])

  return (
    <Box className="box-plot-container">
      <Carousel>
        {boxPlotData.map((chartData, index) => (
          <div
            key={`chart-${index}`}
            ref={(el) => (chartRefs.current[index] = el)}
          />
        ))}
      </Carousel>
    </Box>
  )
}

export default BoxPlotCarousel
