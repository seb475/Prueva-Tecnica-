import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Character from "./components/Character";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [dataCharacters, setDataCharacters] = useState([]);
  const [search, setSearch] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("");


  useEffect(() => {
    getData();
  }, []);

  const submit = async (data) => {
    const inputValue = parseInt(data.location);
    changeColorBackground(inputValue);
    const url = `https://rickandmortyapi.com/api/location/${data.location}`;

    try {
      const resp = await axios.get(url);
      const objResidents = resp.data.residents.slice(0, 5);

      const characterPromises = objResidents.map((resident) => {
        const obj = resident.split("/");
        const result = obj[obj.length - 1];
        return axios.get(`https://rickandmortyapi.com/api/character/${result}`);
      });

      const characters = await Promise.all(characterPromises);
      const characterData = characters.map((character) => character.data);
      setDataCharacters(characterData);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character/1,2,3,4,5`)
      .then((resp) => {
        setDataCharacters(resp.data);
      })
      .catch((error) => {
        console.error(error);
        setDataCharacters([]);
      });
  };

  const changeColorBackground = (value) => {
    if (value < 50) {
      setBackgroundColor("green");
    } else if (value >= 50 && value < 80) {
      setBackgroundColor("blue");
    } else {
      setBackgroundColor("red");
    }
  };

 
  return (
    <>
      <div className="App" style={{ backgroundColor: backgroundColor }}>
        <form onSubmit={handleSubmit(submit)}>
          <input
            type="number"
            placeholder="Search by Location"
            {...register("location", { required: "Campo obligatorio" })}
          />
          <button className="btn_search" type="submit">
            Buscar
          </button>
          {errors.location && <p>{errors.location.message}</p>}
        </form>

        {search ? (
          <div className="container">
            {dataCharacters?.map((character, index) => (
              <Character key={`character-${index}`} data={character} />
            ))}
          </div>
        ) : (
          <div className="container">
            {dataCharacters?.map((character, index) => (
              <Character key={`character-${index}`} data={character} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
