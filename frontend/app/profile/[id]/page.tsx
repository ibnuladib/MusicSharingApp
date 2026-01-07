export default async function Page(props: any) {
    const params = await props.params;
    console.log("Params: ", params)


    
    return <div>
        Product: {params.id}
    </div>;
}