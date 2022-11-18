// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query getcountries($input: CountryFilterInput) {
    countries(filter: $input) {
      name
      native
      phone
      emoji
      emojiU
      continent {
        name
      }
    }
  }
`;

function App() {
  const [searchParam, setSearchParam] = useState();
  const { data, loading, error, refetch, variables } = useQuery(GET_COUNTRIES);

  if (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return <>error</>;
  }

  console.log(variables);

  function handleChange(value) {
    console.log(value);
    setSearchParam(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await refetch({
      input: {
        code: {
          regex: searchParam,
        },
        currency: {
          regex: searchParam,
        },
        continent: {
          regex: searchParam,
        },
      },
    });
  };

  return (
    <div className="App">
      <div class="line">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="country">Countries Catalog</span>

        <p class="line"></p>
        <div class="list">
          <p>Keyword</p>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                class="input"
                onChange={(e) => handleChange(e.target.value)}
              />
            </label>
            <button class="search" type="submit">
              Search
            </button>
          </form>
        </div>
        <p class="line"></p>
        {loading ? (
          <>loading</>
        ) : (
          <>
            {data.countries.length > 0 ? (
              <>
                <div>
                  {data.countries.map((country, index) => {
                    return (
                      <div class="list" key={index}>
                        <div>
                          <p>
                            {country.emoji} {country.name}
                          </p>
                          <p>Continent: {country.continent.name}</p>
                          <button>See details</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div class="list">No Country found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
