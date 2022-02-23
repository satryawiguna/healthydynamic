const Label = ({ children, className, ...props }) => (
  <label
    className={`${className} block text-sm font-medium text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
