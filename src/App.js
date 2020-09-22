import React, { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_NASA_API_KEY

function App() {

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
      .then(res => res.json())
      .then(data => {
        if (data.media_type === "image") {
          setImage(data.url)
          setTitle(data.title)
          setExplanation(data.explanation)
        } else {
          setError(data.msg)
        }
      })
      .catch(err => setError(err.response.data.msg))
  }, [])

  return (
    <div className="main">
      <h1>Astronomy Photograph Of The Day</h1>
      <div className="apod">
        {
          error != null ? <h3 className="error">{ error }</h3> : null
        }
        {
          image != null 
          ? <div>
              <img src={image} alt="apod" width="300"></img>
              <h1>{ title }</h1>
              <h3>{ explanation }</h3>
            </div> 
          : null
        }
      </div>
    </div>
  );
}

export default App;
