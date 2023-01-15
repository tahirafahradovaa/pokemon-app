import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonData } from "../redux/actions/pokemonActions";
import { newPage } from "../redux/pokemonSlice";

function Pokemon() {
  const [isClicked, setIsClicked] = useState(false);
  const [singlePokemon, setSinglePokemon] = useState([]);
  let [num, setNum] = useState(0);
  let dispatch = useDispatch();
  let pokemonreducerRR = useSelector(
    (state) => state.pokemonReducer.pokemon.next
  );
  let url = useSelector((state) => state.pokReducer.pokemon.next);
  let pokemonreducerBack = useSelector(
    (state) => state.pokemonReducer.pokemon.previous
  );
  let pokemonlist = useSelector((state) => state.pokReducer.pokemon.results);
  let pagination = useSelector((state) => state.pokemonReducer.pokemon.results);

  useEffect(() => {
    dispatch(pokemonData());
  }, [pagination]);
  const getData = async (url) => {
    const res = await axios.get(url);
    setIsClicked(true);
    const data = res.data;
    setSinglePokemon(data);
  };
  const closeBtn = () => {
    setIsClicked(false);
  };
  const getNewData = (e) => {
    dispatch(newPage(pokemonreducerRR ? pokemonreducerRR : url));
    setNum(num + 25);
  };
  const getOldData = (e) => {
    dispatch(newPage(pokemonreducerBack));
    setNum(num - 25);
  };
  return (
    <>
      <div className="main">
        <div className="container">
          {pagination
            ? pagination.map((item, i) => {
                return (
                  <>
                    <div
                      key={item.name}
                      className="pokemonListContainer"
                      onClick={() => getData(item.url)}
                    >
                      <h1>
                        {num + i + 1} {item.name}
                      </h1>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          i + 1 + num
                        }.png`}
                      />
                    </div>
                  </>
                );
              })
            : pokemonlist?.map((item, i) => {
                return (
                  <>
                    <div
                      key={item}
                      className="pokemonListContainer"
                      onClick={() => getData(item.url)}
                    >
                      <h1>
                        {num + i + 1} {item.name}
                      </h1>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          num + 1 + i
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
                    <p key={powers.stat.name}>
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
      <div className="pagination">
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => getOldData(e)}
        >
          Previous
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => getNewData(e)}
        >
          Next
        </span>
      </div>
    </>
  );
}

export default Pokemon;
