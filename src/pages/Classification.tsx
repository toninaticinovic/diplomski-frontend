import { useNavigate } from "react-router-dom"
import SubHeader from "../components/SeparableDataClassification/SubHeader"

const Classification = () => {
  const navigate = useNavigate()

  return (
    <>
      <SubHeader />
      <button onClick={() => navigate("/classification/separable")}>
        Klasifikacija podataka koji su linearno separabilni
      </button>
    </>
  )
}

export default Classification
