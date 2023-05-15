import { useNavigate } from "react-router-dom"
import SubHeader from "../components/GeneratedDataClassification/SubHeader"

const Classification = () => {
  const navigate = useNavigate()

  return (
    <>
      <SubHeader />
      <button onClick={() => navigate("/classification/generate")}>
        Generiraj podatke i treniraj klasifikacijski model
      </button>
    </>
  )
}

export default Classification
