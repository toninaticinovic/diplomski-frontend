import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  text: string
  showButtonClassification: boolean
  showButtonRegression: boolean
}

const SubHeader = ({
  text,
  showButtonClassification,
  showButtonRegression,
}: Props) => {
  const navigate = useNavigate()
  const [openWarningClassification, setOpenWarningClassification] =
    useState(false)
  const [openWarningRegression, setOpenWarningRegression] = useState(false)

  const handleCloseClassification = () => {
    setOpenWarningClassification(false)
    navigate("/classification")
  }

  const handleCloseRegression = () => {
    setOpenWarningRegression(false)
    navigate("/regression/dataset")
  }

  return (
    <>
      <Box className="sub-header" sx={{ color: "warning.dark" }}>
        {text}
        {showButtonClassification && (
          <Button
            color="warning"
            variant="outlined"
            sx={{ margin: "auto", mt: "1rem" }}
            onClick={() => setOpenWarningClassification(true)}
          >
            Vrati se na stranicu klasifikacije
          </Button>
        )}

        {showButtonRegression && (
          <Button
            color="warning"
            variant="outlined"
            sx={{ margin: "auto", mt: "1rem" }}
            onClick={() => setOpenWarningRegression(true)}
          >
            Vrati se na stranicu regresije
          </Button>
        )}
      </Box>

      <Dialog
        open={openWarningClassification}
        onClose={() => setOpenWarningClassification(false)}
      >
        <DialogTitle>Povratak na stranicu klasifikcije</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Klikom na 'Slažem se' vraćate se na stranicu klasifikacije i svi
            dosadašnji podaci bit će izgubljeni. Jeste li sigurni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWarningClassification(false)}>
            Odustani
          </Button>
          <Button onClick={handleCloseClassification} autoFocus>
            Slažem se
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarningRegression}
        onClose={() => setOpenWarningRegression(false)}
      >
        <DialogTitle>Povratak na stranicu regresije</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Klikom na 'Slažem se' vraćate se na stranicu regresije i svi
            dosadašnji podaci bit će izgubljeni. Jeste li sigurni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWarningRegression(false)}>
            Odustani
          </Button>
          <Button onClick={handleCloseRegression} autoFocus>
            Slažem se
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SubHeader
