export default function Loading() {
    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-8">
                    <div className="h-10 w-48 bg-base-300 skeleton rounded"></div>
                    <div className="flex gap-4">
                        <div className="h-12 w-40 bg-base-300 skeleton rounded-btn"></div>
                        <div className="h-12 w-32 bg-base-300 skeleton rounded-btn"></div>
                    </div>
                </div>

                {/* Analytics Section Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="w-8 h-8 skeleton rounded-full bg-base-300"></div>
                                </div>
                                <div className="stat-title h-4 w-24 skeleton bg-base-300 mb-2"></div>
                                <div className="stat-value h-8 w-16 skeleton bg-base-300 mb-2"></div>
                                <div className="stat-desc h-3 w-20 skeleton bg-base-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Your Uploads Title Skeleton */}
                <div className="h-8 w-40 bg-base-300 skeleton rounded mb-4"></div>

                {/* Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="card bg-base-100 shadow-xl">
                            <figure className="px-4 pt-4">
                                <div className="h-48 w-full bg-base-300 skeleton rounded-xl"></div>
                            </figure>
                            <div className="card-body">
                                <div className="h-6 w-3/4 bg-base-300 skeleton rounded mb-2"></div>
                                <div className="h-4 w-full bg-base-300 skeleton rounded mb-1"></div>
                                <div className="h-4 w-1/2 bg-base-300 skeleton rounded mb-4"></div>

                                {/* Static Stats Skeleton */}
                                <div className="flex justify-between items-center w-full mb-4 px-1">
                                    <div className="h-4 w-12 skeleton bg-base-300 rounded"></div>
                                    <div className="h-4 w-12 skeleton bg-base-300 rounded"></div>
                                </div>

                                {/* Actions Skeleton */}
                                <div className="card-actions justify-end gap-2">
                                    <div className="h-10 w-20 skeleton bg-base-300 rounded-btn"></div>
                                    <div className="h-10 w-20 skeleton bg-base-300 rounded-btn"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
