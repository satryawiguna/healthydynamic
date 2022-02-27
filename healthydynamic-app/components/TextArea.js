const TextArea = ({
  disabled = false,
  className,
  placeHolder = "",
  valueState = "",
  ...props
}) => (
  <>
    <div className="mt-1 flex rounded-md shadow-sm">
      <textarea
        disabled={disabled}
        className={
          "${className} p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        }
        placeholder={placeHolder}
        {...props}
      ></textarea>
    </div>
  </>
);

export default TextArea;
