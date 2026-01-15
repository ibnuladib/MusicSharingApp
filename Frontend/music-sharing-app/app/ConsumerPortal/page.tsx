'use client';
import { useRouter } from "next/navigation";

export default function ConsumerPortal() {
  const router = useRouter();

  return (
    <div className="min-h-screen from-base-200 to-base-300">
      
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            
            <div className="badge badge-primary badge-lg mb-4">🎵 Consumer Portal</div>

            
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-primary">MusicShare</span>
            </h1>

            <p className="text-lg text-base-content/70 mb-8">
              Discover, share, and enjoy your favorite music. Join our community today!
            </p>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-primary text-primary-content rounded-full w-16">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title">Already have an account?</h2>
                  <p className="text-sm text-base-content/60 mb-4">
                    Sign in to access your music library
                  </p>
                  <button
                    className="btn btn-primary btn-wide"
                    onClick={() => router.push("/login")}
                  >
                    Login
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-secondary text-secondary-content rounded-full w-16">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title">New here?</h2>
                  <p className="text-sm text-base-content/60 mb-4">
                    Create an account and start your journey
                  </p>
                  <button
                    className="btn btn-secondary btn-wide"
                    onClick={() => router.push("/register")}
                  >
                    Register
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
