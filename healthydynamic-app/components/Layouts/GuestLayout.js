import Head from "next/head";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Healthy Dynamic</title>
      </Head>

      <div className="font-sans text-gray-900 antialiased">{children}</div>
    </div>
  );
};

export default GuestLayout;
