import "./errorPage.css";
import { Layout } from "../../components/Layout/Layout";
import { useRouteError } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import { OceanImage } from "../../components/OceanImage/oceanImage";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Om det är en "route-not-found" (t.ex. wildcard)
  if (error?.status === 404 || error?.statusText === "Not Found") {
    return (
      <Layout>
        <Logo />
        <h1 className="error__title">404 – Sidan kunde inte hittas</h1>
        <p className="error__text">Den sidan du söker finns inte.</p>
        <a href="/" className="error__link">
          Gå tillbaka till startsidan
        </a>
      </Layout>
    );
  }

  const message = error?.statusText || error?.message || "Ett okänt fel uppstod";

  return (
    <Layout>
      <Logo />
      <section className="error__section">
        <h1 className="error__title">Något gick fel</h1>
        <p className="error__text">{message}</p>
        <a href="/" className="error__link">
          Gå tillbaka till startsidan
        </a>
      </section>
      <div className="ocean-blue"></div>
      <OceanImage className="ocean-image--bottom" />
    </Layout>
  );
};
