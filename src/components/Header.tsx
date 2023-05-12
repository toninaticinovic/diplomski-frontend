import { Box, Button } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

const Header = () => {
  return (
    <Box className="header">
      <Box className="heading" sx={{ color: "primary.dark" }}>
        Vizualizacija strojnog učenja
      </Box>
      <Button
        className="button"
        sx={{ color: "primary.dark", marginTop: "1rem" }}
        onClick={() => window.location.replace("/")}
      >
        <HomeIcon /> Vrati se na početnu stranicu
      </Button>
    </Box>
  )
}

export default Header
