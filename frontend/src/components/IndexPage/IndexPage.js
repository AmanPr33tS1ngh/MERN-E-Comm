import React from "react";
import "./IndexPage.css";
import { listOfItems } from "../CommonDataTypes/CommonDataTypes";
import MultipleItemModal from "../CommonModal/MultipleItemModal";
const IndexPage = () => {
  return (
    <div styleName="box">
      <h1>Hellllooo</h1>
      {listOfItems.map(
        (category) => (
          // category.images.map((image) => (
          <MultipleItemModal
            category={category.category}
            images={category.images}
          />
        )
        // ))
      )}
    </div>
  );
};
export default IndexPage;
