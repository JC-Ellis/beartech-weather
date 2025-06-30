import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

 
  const handleNavigate = () => {
    navigate(`/weather`);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Choose a location or type an address
      </Typography>
      <Button
        variant="contained"
        onClick={handleNavigate}
        style={{ marginTop: "1rem" }}
      >
        Is it wet?
      </Button>
    </Container>
  );
}

export default Home;