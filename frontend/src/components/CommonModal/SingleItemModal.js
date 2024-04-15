const SingleItemModal = (props) => {
  return (
    <div style={{ width: props.width, height: props.height }}>
      {props.heading ? props.heading : null}
      {props.image ? <img alt={props.alt} src={props.src} /> : null}
      {props.details ? props.details : null}
    </div>
  );
};
export default SingleItemModal;
