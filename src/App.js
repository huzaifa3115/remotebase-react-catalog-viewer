import React, { Fragment, useEffect, useState } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";
let timeout = null;
let myIndex = 0;

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [slideDuration] = useState(3000);

  useEffect(()=> {
    return ()=> clearInterval(timeout);
  }, []);      

  myIndex = activeIndex;
  const startInterval = () => {
    timeout = setInterval(() => {
      const length = catalogs.length - 1;

      if (myIndex >= length) return setActiveIndex((t) => 0);
      setActiveIndex(index => index + 1);

      if(myIndex === 10) clearInterval(timeout);

    }, slideDuration);
  };

  useEffect(() => {
    if (!checked) {
      clearInterval(timeout);
    } else {
      startInterval()
    }
  }, [checked]);

  const onPressForwardImage = () => {
    const length = catalogs.length - 1;
    if (activeIndex >= length) return setActiveIndex((t) => 0);
    setActiveIndex((t) => t + 1);
  };

  const onPressBackwardImage = () => {
    const length = catalogs.length - 1;
    if (activeIndex <= 0) return setActiveIndex(length);
    setActiveIndex(activeIndex - 1);
  };

  const onClickImage = (index) => {
    setActiveIndex(index);
  };


  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={onPressBackwardImage}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                onClick={onClickImage}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={onPressForwardImage}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
