import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// home page
function Home() {
  return (
    <div>
      <h1>Rick and Morty</h1>
      <p>
        Welcome! See characters, species, and locations from Rick and Morty!
      </p>
    </div>
  );
}

// characters
function Characters({ characters, loading }) {
  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <div>
      <h1>Characters</h1>

      {characters.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
        </div>
      ))}
    </div>
  );
}

// species
function Species({ characters }) {
  // group chars by their species
  const speciesGroups = characters.reduce((groups, character) => {
    const species = character.species;

    if (!groups[species]) {
      groups[species] = [];
    }

    groups[species].push(character.name);

    return groups;
  }, {});

  return (
    <div>
      <h1>Species</h1>

      {Object.entries(speciesGroups).map(([species, names]) => (
        <div key={species}>
          <h2>
            {species}: {names.length}
          </h2>

          <ul>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// locations
function Locations() {
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getLocations = async () => {
      try {
        // get first page of locations
        const response = await fetch(
          "https://rickandmortyapi.com/api/location"
        );

        if (!response.ok) {
          throw new Error("Could not retrieve locations");
        }

        const data = await response.json();

        // get remaining pages
        const pages = await Promise.all(
          Array.from(
            { length: data.info.pages - 1 },
            (_, index) => index + 2
          ).map(async (page) => {
            const pageResponse = await fetch(
              `https://rickandmortyapi.com/api/location?page=${page}`
            );

            if (!pageResponse.ok) {
              throw new Error("Could not retrieve locations");
            }

            const pageData = await pageResponse.json();

            return pageData.results;
          })
        );

        // combine all pages
        setLocations([...data.results, ...pages.flat()]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  // count locations by type
  const locationTypes = locations.reduce((types, location) => {
    const type = location.type || "Unknown";

    types[type] = (types[type] || 0) + 1;

    return types;
  }, {});

  if (loading) {
    return <p>Loading locations...</p>;
  }

  return (
    <div>
      <h1>Locations</h1>

      {Object.entries(locationTypes).map(([type, count]) => (
        <div key={type}>
          <h2>
            {type}: {count}
          </h2>
        </div>
      ))}
    </div>
  );
}

// main app
function App() {
  const [characters, setCharacters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getCharacters = async () => {
      try {
        // get first 5 pages from API
        const pages = await Promise.all(
          [1, 2, 3, 4, 5].map(async (page) => {
            const response = await fetch(
              `https://rickandmortyapi.com/api/character?page=${page}`
            );

            if (!response.ok) {
              throw new Error("Could not retrieve characters");
            }

            const data = await response.json();

            return data.results;
          })
        );

        // combine all pages into array
        setCharacters(pages.flat());
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>
        {" | "}
        <Link to="/characters">Characters</Link>
        {" | "}
        <Link to="/species">Species</Link>
        {" | "}
        <Link to="/locations">Locations</Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters characters={characters} loading={loading} />}
        />
        <Route path="/species" element={<Species characters={characters} />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}

export default App;
