import React from "react";
import SingleItemModal from "./SingleItemModal";

const MultipleItemModal = (props) => {
  console.log("proppppp", props);
  return (
    <div>
      <div>
        {props.category ? props.category : null}
        {props.images &&
          props.images.map((image) => (
            <SingleItemModal
              heading={image.heading}
              details={image.details}
              src={image.src}
              alt={image.alt}
            />
          ))}
      </div>
    </div>
  );
};
export default MultipleItemModal;
