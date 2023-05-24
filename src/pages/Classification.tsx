import { useNavigate } from "react-router-dom"
import SubHeader from "../components/SubHeader"
import { Box, Button } from "@mui/material"

const Classification = () => {
  const navigate = useNavigate()

  return (
    <>
      <SubHeader showButton={false} text="KLASIFIKACIJA" />
      <Box className="classification-buttons">
        <Button
          onClick={() => navigate("/classification/generate")}
          variant="contained"
          color="warning"
        >
          Generiraj podatke i treniraj klasifikacijski model
        </Button>
        <Button
          onClick={() => navigate("/classification/dataset")}
          variant="contained"
          color="warning"
        >
          Odaberi skupa podataka i treniraj klasifikacijski model
        </Button>
      </Box>
    </>
  )
}

export default Classification
