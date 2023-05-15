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
  text?: string
}

const SubHeader = ({ text }: Props) => {
  const navigate = useNavigate()
  const [openWarning, setOpenWarning] = useState(false)

  const handleClose = () => {
    setOpenWarning(false)
    navigate("/classification")
  }

  return (
    <>
      <Box className="sub-header" sx={{ color: "warning.dark" }}>
        KLASIFIKACIJA {text ?? text}
        {text && (
          <Button
            color="warning"
            variant="outlined"
            sx={{ margin: "auto", mt: "1rem" }}
            onClick={() => setOpenWarning(true)}
          >
            Vrati se na stranicu klasifikacije
          </Button>
        )}
      </Box>

      <Dialog open={openWarning} onClose={() => setOpenWarning(false)}>
        <DialogTitle>Povratak na stranicu klasifikcije</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Klikom na 'Slažem se' vraćate se na stranicu klasifikacije i svi
            dosadašnji podaci bit će izgubljeni. Jeste li sigurni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWarning(false)}>Odustani</Button>
          <Button onClick={handleClose} autoFocus>
            Slažem se
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SubHeader
