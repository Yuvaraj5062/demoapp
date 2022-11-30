import React from "react";

const ReviewTemplate = ({ reviewsToRender }) => {
  const [value, setValue] = React.useState(2);
  return (
    <>
      {reviewsToRender.map((review, index) => (
        <div className="p-5 ml-10 mr-10 mb-0 mt-5">
          <div
            className=" row card d-flex flex-row w-100 review-card"
            style={{ borderRadius: 20, border: "5px solid #287CBC" }}
          >
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <img
                src={TestImage}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                className="card-img-top m-5"
                alt="..."
              />
            </div>
            <div className="card-body col-md-8">
              <h5 className="card-title text-primary p-0 m-0">The simpsons</h5>
              <p className="text-secondary mb-5 mt-3">17 November 2021</p>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
            <div className="col-md-2 d-flex justify-content-center mt-10 mb-10 pr-10">
              <Rating name="read-only" value={value} readOnly />
              <ArrowDownwardIcon className="text-primary ml-2 mr-2 cursor-pointer" />
              <DeleteIcon className="text-primary 5 mr-2 cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewTemplate;
