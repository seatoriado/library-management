const Alert = ({ ...props }) => {
  let className =
    "bg-white px-4 py-2 rounded-xl border flex flex-col gap-4 absolute bottom-5 m-auto left-0 right-0 w-max animate-slideup";

  switch (props.type) {
    case "success":
      className += " border-green-400 text-green-500";
      break;
    case "error":
      className += " border-red-400 text-red-500";
      break;
  }

  return (
    <div className={className}>
      {props.title && <div>{props.title}</div>}
      {props.message && <div>{props.message}</div>}
    </div>
  );
};

export default Alert;
