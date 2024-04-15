export default function MessageBox(props) {
  const variantClasses = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    danger: "bg-red-100 border-red-400 text-red-700",
  };

  const alertClasses = `border-l-4 p-4 ${
    variantClasses[props.variant] || "bg-blue-100 border-blue-400 text-blue-700"
  }`;

  return <div className={alertClasses}>{props.error}</div>;
}
