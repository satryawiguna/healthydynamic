const Select = ({
  disabled = false,
  className,
  valueState = "",
  options = [],
  ...props
}) => (
  <>
    <div className="mt-1 flex rounded-md shadow-sm">
      <select
        disabled={disabled}
        className={
          "${className} p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        }
        value={valueState}
        {...props}
      >
        {options.map((item, index) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  </>
);

export default Select;
