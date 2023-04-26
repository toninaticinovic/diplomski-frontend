import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Classification = () => {
  const navigate = useNavigate()

  return (
    <>
      <Box className="sub-header">Klasifikacija</Box>
      <button onClick={() => navigate("/classification/separable")}>
        Klasifikacija podataka koji su linearno separabilni
      </button>
    </>
  )
}

export default Classification
