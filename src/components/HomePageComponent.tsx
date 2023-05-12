import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"

const HomePageComponent = () => {
  const navigate = useNavigate()

  return (
    <Box className="home-page">
      <Box
        className="container"
        sx={{
          border: "1px solid",
          borderColor: "primary.dark",
          color: "primary.dark",
        }}
      >
        <img src="images/regression.png" alt="regression" />
        <p>
          <b>REGRESIJA</b>
        </p>
      </Box>

      <Box
        className="container"
        sx={{
          border: "1px solid",
          borderColor: "primary.dark",
          color: "primary.dark",
        }}
        onClick={() => {
          navigate("/classification")
        }}
      >
        <img src="images/classification.png" alt="classification" />
        <p>
          <b>KLASIFIKACIJA</b>
        </p>
      </Box>
    </Box>
  )
}

export default HomePageComponent
