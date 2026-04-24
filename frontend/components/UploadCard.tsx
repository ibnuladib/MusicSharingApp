
import React, { ReactNode } from "react";

export interface UploadData {
    id?: number;
    title: string;
    description: string;
    filePath: string;
    fileType?: string;
    creator?: {
        fullName: string;
        email: string;
    };
}

interface UploadCardProps {
    upload: UploadData;
    actions?: ReactNode;
    className?: string;
    compact?: boolean;
}

const UploadCard: React.FC<UploadCardProps> = ({ upload, actions, className = "", compact = false }) => {
    return (
        <div className={`card bg-base-100 shadow-xl ${className}`}>
            <figure className={compact ? "px-4 pt-4" : "px-10 pt-10"}>
                {upload.filePath ? (
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${upload.filePath}`}
                        alt={upload.title}
                        className={`rounded-xl object-contain ${compact ? "h-48 w-full object-cover" : "max-h-[400px]"}`}
                    />
                ) : (
                    <div className={`bg-base-300 rounded-xl flex items-center justify-center ${compact ? "h-48 w-full" : "h-64 w-full"}`}>
                        No Image
                    </div>
                )}
            </figure>

            <div className={`card-body ${compact ? "" : "items-center text-center"}`}>
                <h2 className={`card-title ${compact ? "" : "text-3xl font-bold"}`}>{upload.title}</h2>

                {upload.creator && (
                    <div className="badge badge-secondary badge-outline mb-2">{upload.creator.fullName}</div>
                )}

                <p className={`${compact ? "text-sm opacity-70 mb-2" : "text-lg opacity-80 mb-6"}`}>
                    {compact
                        ? (upload.description.length > 100 ? `${upload.description.substring(0, 100)}...` : upload.description)
                        : upload.description
                    }
                </p>

                {!compact && (
                    <div className="w-full text-left bg-base-200 p-4 rounded-lg text-sm mb-6">
                        {upload.fileType && (
                            <div className="flex justify-between mb-1">
                                <span className="font-bold">File Type:</span>
                                <span>{upload.fileType}</span>
                            </div>
                        )}
                        {upload.creator && (
                            <div className="flex justify-between">
                                <span className="font-bold">Creator Email:</span>
                                <span>{upload.creator.email}</span>
                            </div>
                        )}
                    </div>
                )}

                {actions && <div className={`card-actions ${compact ? "justify-end" : ""}`}>{actions}</div>}
            </div>
        </div>
    );
};

export default UploadCard;
