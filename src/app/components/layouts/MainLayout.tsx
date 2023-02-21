import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar";

export default function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Container sx={{ mt: 2 }} maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}
