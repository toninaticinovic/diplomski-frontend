import React, { useRef } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ApexCharts from "apexcharts"
import { HistogramResult } from "../types"
import { Box } from "@mui/material"
import convertToNormalCase from "../utils/convert-to-normal-word"

interface Props {
  histogramData: HistogramResult[]
}

const getChartOptions = (histogramData: HistogramResult) => {
  const options = {
    series: [
      {
        data: histogramData.y,
        color: "#66bfbf",
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: histogramData.x,
    },
    title: {
      text: `Histogram - ${convertToNormalCase(histogramData.column)}`,
    },
  }

  return options
}

const HistogramCarousel = ({ histogramData }: Props) => {
  const chartRefs = useRef<any[]>([])

  React.useEffect(() => {
    chartRefs.current = chartRefs.current
      .slice(0, histogramData.length)
      .map((_, index) => chartRefs.current[index])

    histogramData.forEach((chartData, index) => {
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
  }, [histogramData])

  return (
    <Box className="box-plot-container">
      <Carousel>
        {histogramData.map((chartData, index) => (
          <div
            key={`chart-${index}`}
            ref={(el) => (chartRefs.current[index] = el)}
          />
        ))}
      </Carousel>
    </Box>
  )
}

export default HistogramCarousel
