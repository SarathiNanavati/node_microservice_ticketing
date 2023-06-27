import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Layout from "../components/Layout";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Layout currentUser={currentUser}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const context = appContext.ctx;
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;
