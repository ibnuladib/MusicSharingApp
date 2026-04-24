import Link from "next/link";
import Image from "next/image";

const portals = [
  {
    title: "Admin Portal",
    description: "System administration and user management",
    path: "/admin/login",
    color: "yellow-500",
    pic: "/admin2.png",
  },
  {
    title: "Moderator Portal",
    description: "Content moderation and community oversight",
    path: "/moderator/login",
    color: "purple-500",
    pic: "/mod2.png",
  },
  {
    title: "Consumer Portal",
    description: "Discover and enjoy amazing music content",
    path: "/ConsumerPortal/",
    color: "cyan-500",
    pic: "/consumer2.png",
  },
  {
    title: "Creator Portal",
    description: "Upload and share your creative works",
    path: "/login",
    color: "pink-500",
    pic: "/creator2.png",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">


        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-1">

          <div className="text-center mb-4 max-w-3xl">

            <h1 className="text-4xl md:text-6xl font-bold mb-2 o animate-fade-in">

              Welcome to <span className="bg-clip-text font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">MusicShare</span>
            </h1>
            <p className="text-lg text-grey opacity-70 animate-fade-in" style={{ animationDelay: "100ms" }}>

              Your gateway to unlimited music experiences. Choose your portal to continue.
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 max-w-3xl w-full mb-3">

            {portals.map((portal) => (
              <Link key={portal.title} href={portal.path} className="block">
                <div className={`card bg-base-100 shadow-xl p-2 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-${portal.color} h-full flex flex-col justify-center`}>

                  <div className="card-body p-4 flex flex-col items-center justify-center">

                    <h2 className={`card-title text-2xl font-bold mb-2 text-${portal.color}`}>{portal.title}</h2>

                    <p className="text-sm opacity-80">{portal.description}</p>
                    <div className="card-actions justify-center mt-4">
                      <span className={`btn btn-sm btn-${portal.color}`}>

                        Go to {portal.title}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


          <div className="opacity-0 animate-fade-in text-center" style={{ animationDelay: "800ms" }}>
            <p className="text-white mb-1 text-xs">Click on a portal to explore</p>

            <div className="w-5 h-5 text-white mx-auto animate-bounce">👇</div>

          </div>
        </main>

        {/* Footer */}

      </div>
    </div>
  );
};
