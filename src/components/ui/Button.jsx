const Button = ({ children, className, ...props }) => {
    return (
      <button className={`px-6 py-3 text-lg bg-blue-500 hover:bg-blue-400 rounded-full shadow-md ${className}`} {...props}>
        {children}
      </button>
    );
  };

export default Button
