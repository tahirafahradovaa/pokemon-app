import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonData } from "../redux/actions/pokemonActions";
import { newPage } from "../redux/pokemonSlice";
import { pokemonReducer } from "../redux/reducers/pokemonReducers";

function Pokemon() {
  let dispatch = useDispatch();
  let pokemonlist = useSelector((state) => state.pokReducer.pokemon.results);
  let pagi = useSelector((state) => state.pokReducer.pokemon);
  useEffect(() => {
    dispatch(pokemonData());
  }, []);
  const [singlePokemon, setSinglePokemon] = useState([]);
  const getData = async (url) => {
    const res = await axios.get(url);
    setIsClicked(true);
    const data = res.data;
    setSinglePokemon(data);
    window.scrollTo(10, 10);
  };
  const closeBtn = () => {
    setIsClicked(false);
    // dispatch(newPage(4));
  };
  const [isClicked, setIsClicked] = useState(false);
  let pages = pagi.count / 20;

  return (
    <>
      <div className="main">
        <div className="container">
          {pokemonlist &&
            pokemonlist.map((item, i) => {
              return (
                <>
                  <div
                    key={item}
                    className="pokemonListContainer"
                    onClick={() => getData(item.url)}
                  >
                    <h1>
                      {" "}
                      {i + 1} {item.name}
                    </h1>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        i + 1
                      }.png`}
                    />
                  </div>
                </>
              );
            })}
        </div>

        {isClicked ? (
          <>
            <div className="details">
              <h1> {singlePokemon.name}</h1>
              <div onClick={closeBtn} className="close">
                x
              </div>
              <img
                style={{
                  width: "250px",
                }}
                src={singlePokemon.sprites.front_default}
              />
              <div className="strength">
                <button>{singlePokemon.abilities[0]?.ability.name}</button>
                <button>{singlePokemon.abilities[1]?.ability.name}</button>
              </div>
              <div className="info">
                {singlePokemon.stats.map((powers) => {
                  return (
                    <p>
                      {powers.stat.name} : {powers.base_stat}
                    </p>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div></div>
    </>
  );
}

export default Pokemon;
