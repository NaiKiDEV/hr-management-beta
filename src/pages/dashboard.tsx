import { type NextPage } from "next";
import Head from "next/head";
import { signOut } from "next-auth/react";

import { UserProfileProvider } from "../components/user-profile-provider";

const Home: NextPage = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>HR Page</title>
        <meta name="description" content="HR Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-stretch bg-slate-900">
        <UserProfileProvider>
          <div>
            <div>Testing</div>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </UserProfileProvider>
      </main>
    </>
  );
};

export default Home;
