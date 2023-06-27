import buildClient from "../api/build-client";

const Home = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>Please Sign In</h1>;
};

Home.getInitialProps = async (context) => {
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");

  return data;
};

export default Home;

// ingress-nginx.ingress-nginx-controller.svc.cluster.local
