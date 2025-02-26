import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Hero Section */}
      <section className="text-center py-20 bg-primary-light dark:bg-primary-dark text-white">
        <h2 className="text-5xl font-bold">Collaborate in Real Time</h2>
        <p className="mt-4 text-lg">
          Seamless workspace sharing and team collaboration.
        </p>
        <button className="mt-6 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark px-6 py-3 rounded-lg font-medium">
          <Link href={"/dashboard"}>Get Started</Link>
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
            Real-Time Sync
          </h3>
          <p className="text-text-light dark:text-text-dark mt-2">
            Instant updates across all connected users.
          </p>
        </div>
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
            Secure Workspaces
          </h3>
          <p className="text-text-light dark:text-text-dark mt-2">
            Only invited members can join your workspace.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-secondary-light dark:bg-secondary-dark text-primary-light dark:text-primary-dark">
        <h2 className="text-3xl font-bold">Join the Future of Collaboration</h2>
        <button className="mt-4 bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium">
          Start Now
        </button>
      </section>
    </div>
  );
}
