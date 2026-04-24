
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import DashboardCardActions from "../../components/DashboardCardActions";
import UploadCard from "../../components/UploadCard";

/**
 * Interface matching the DTO/Shape of Upload
 */
interface Upload {
  id: number;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const creatorId = cookieStore.get("creatorId")?.value;

  if (!token || !creatorId) {
    redirect("/unauthorized");
  }

  let uploads: Upload[] = [];
  let error: string | null = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/uploads`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    uploads = response.data;
  } catch (err: any) {
    console.error("Dashboard fetch error:", err.message);
    if (err.response?.status === 401) {
      redirect("/unauthorized");
    } else {
      error = "Failed to load uploads";
    }
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/createupload" className="btn btn-primary">
              Upload New File
            </Link>
            <Link href={`/profile/${creatorId}`} className="btn btn-error text-white">
              Edit Profile
            </Link>
          </div>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Total Uploads</div>
              <div className="stat-value">{uploads.length}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <div className="stat-title">New Likes</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </div>
              <div className="stat-title">Total Views</div>
              <div className="stat-value">1.2M</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>

          {/* Simulated Graph / Progress */}
          <div className="card bg-base-100 shadow p-4 flex flex-col items-center justify-center">
            <div className="radial-progress text-primary" style={{ "--value": "70", "--size": "3rem" } as any} role="progressbar">70%</div>
            <div className="stat-desc mt-2">Engagement Rate</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Your Uploads</h2>

        {uploads.length === 0 ? (
          <div className="alert alert-info">
            <span>No uploads yet. Create your first upload!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploads.map((upload) => (
              <UploadCard
                key={upload.id}
                upload={upload}
                compact={true}
                actions={<DashboardCardActions uploadId={upload.id} />}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
