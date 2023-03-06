import { useEffect } from "react";
import { Col, Spin } from "antd";
import { Searcher } from "./components/Searcher";
import { PokemonList } from "./components/PokemonList";
import logo from "./static/logo.svg";
import "./styles/App.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchPokemonsWithDetails } from "./slices/dataSlice";

function App() {
  const pokemons = useSelector((state) => state.data.pokemonsFiltered, shallowEqual);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchPokemonsWithDetails());
  }, []);

  return (
    <div className="App">
      <Col span={15} offset={5}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={15} offset={5}>
        <Searcher />
      </Col>
      {loading ? (
        <Col offset={12}>
          <Spin spinning size="large" />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;
