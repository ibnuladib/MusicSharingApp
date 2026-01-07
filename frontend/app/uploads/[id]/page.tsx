"use client"
import axios from "axios";
import { useState } from "react";

export default async function UploadPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  console.log(id)


  const response = await axios.get(`http://localhost:5500/creator/getuploads/${id}`);
  const data = response.data;
  console.log(data)

  return (
    <div>
      <h1>Upload Details</h1>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Title:</strong> {data.title}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>File Path:</strong> {data.filePath}</p>
      <p><strong>File Type:</strong> {data.fileType}</p>
      <p><strong>Creator:</strong> {data.creator.fullName} ({data.creator.email})</p>
    </div>
  );
}
