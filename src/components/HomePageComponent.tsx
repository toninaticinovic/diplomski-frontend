import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"
import SubHeader from "./SubHeader"

const HomePageComponent = () => {
  const navigate = useNavigate()

  return (
    <>
      <SubHeader
        showButtonClassification={false}
        showButtonRegression={false}
        text="ODABERITE ALGOTIRAM NADZIRANOG STROJNOG UČENJA"
      />

      <Box className="home-page">
        <Box
          className="container"
          sx={{
            border: "1px solid",
            borderColor: "primary.dark",
            color: "primary.dark",
          }}
          onClick={() => {
            navigate("/regression/dataset")
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
    </>
  )
}

export default HomePageComponent
