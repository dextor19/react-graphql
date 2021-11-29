import React from 'react';
import {
  gql,
  useQuery
} from '@apollo/client';
import Button from '@mui/material/Button';

function App() {
  const FETCH_ANIME_SERIES = gql`
  query fetchAnimeSeries($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(isAdult: false, sort: POPULARITY_DESC, search: $search) {
        id
        title {
          english
        }
        coverImage {
          large
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        total
      }
    }
  }
`;
  
  const { loading, error, data } = useQuery(FETCH_ANIME_SERIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  
  return (
    <div>
      <Button variant="contained">Hello World</Button>
      {data.Page.media.map((item:any) => (
      <div>
        <h1>{item.title.english}</h1>
        <p>{item.id}</p>
        <img src={item.coverImage.large} alt=""></img>
      </div>
      ))}
    </div>
  );
}

export default App;
