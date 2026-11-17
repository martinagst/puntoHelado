
import { Router, Route } from "wouter";

import Products from "./pages/products";
import Product from "./pages/product";
import Navbar from "./components/navbar";
import Bienvenida from "./pages/bienvenida";
import Usuario from "./pages/usuarios";
import SeccionUsuarioTamanos from "./pages/seccion/seccion-usuarios-tamanios";
import SeccionUsuarioPedidos from  "./pages/seccion/seccion-usuarios-pedidos";
import SeccionUsuarioSabores from "./pages/seccion/seccion-usuarios-sabores";
import SeccionUsuarioSalsas from "./pages/seccion/seccion-usuarios-salsas";
import SeccionUsuarioPrecios from "./pages/seccion/seccion-usuarios-precios";
import LoginAdmin from "./pages/login-admin";

function App() {
  return (
    <Router>
      <Navbar />

      <Route path="/">
       <Bienvenida />
       </Route>

      <Route path="/usuarios">
        <Usuario />
      </Route>

      <Route path="/products">
        <Products />
      </Route>
      

      <Route path="/products/:id">
        <Product />
      </Route>

      <Route path="/usuarios/tamanios">
        <SeccionUsuarioTamanos />
      </Route>

      <Route path="/usuarios/pedido">
        <SeccionUsuarioPedidos />
      </Route>

      <Route path="/usuarios/sabores">
        <SeccionUsuarioSabores />
      </Route>

      <Route path="/usuarios/salsas">
        <SeccionUsuarioSalsas />
      </Route>

      <Route path="/usuarios/precios">
        <SeccionUsuarioPrecios />
      </Route>

      <Route path="/login-admin">
      <LoginAdmin />
      </Route>
    </Router>
  );
}

export default App;