const ConfirmationModal = ({...props}: {
  title?: string,
  message?: string,
  confirmLabel?: string,
  cancelLabel?: string,
  confirmAction?: () => void,
  cancelAction?: () => void
}) => {
  const title = props.title;
  const message = props.message;
  const confirmLabel = props.confirmLabel;
  const cancelLabel = props.cancelLabel;
  const confirmAction = () => {
    if (props.confirmAction)
      props.confirmAction()
  };
  const cancelAction = () => {
    if (props.cancelAction)
      props.cancelAction()
  };

  return (
    <div className="absolute bg-gray-400 bg-opacity-75 flex justify-center items-center h-screen w-screen top-0 left-0">
      <div className="flex flex-col gap-4 justify-center items-center p-10 bg-white border border-blue-400 rounded-xl text-center">
        { title && <div>{title}</div> }
        { message && <div>{message}</div> }
        <div className="flex flex-row justify-around items-center w-full">
          { confirmLabel && (
            <button className="text-blue-500 border border-blue-400 px-8 py-2 rounded-xl" onClick={confirmAction}>{confirmLabel}</button>
          )}
          {
            cancelLabel && (
            <button className='text-gray-500 border border-gray-400 px-8 py-2 rounded-xl' onClick={cancelAction}>{cancelLabel}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export {ConfirmationModal};
