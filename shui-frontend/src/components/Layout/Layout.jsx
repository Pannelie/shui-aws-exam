import "./layout.css";

export const Layout = ({ children, className = "" }) => <section className={`page ${className}`.trim()}>{children}</section>;
