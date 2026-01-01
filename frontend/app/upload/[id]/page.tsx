export default async function UploadPage(props: any) {
    const params = await props.params;
    console.log('Params:', params);
    return <div>Upload: {params.id}</div>;
}