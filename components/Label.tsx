type LabelType = {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
  [x: string]: any;
};

const Label = ({ className, children, ...props }: LabelType) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
