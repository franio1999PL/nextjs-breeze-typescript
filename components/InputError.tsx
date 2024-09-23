type InputErrorType = {
  messages?: string[];
  className?: string;
};

const InputError = ({ messages = [], className = "" }: InputErrorType) => (
  <>
    {messages.length > 0 && (
      <>
        {messages.map((message, index) => (
          <p className={`${className} text-sm text-red-600`} key={index}>
            {message}
          </p>
        ))}
      </>
    )}
  </>
);

export default InputError;
