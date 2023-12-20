import { useParams } from "react-router-dom"

// import { useSearchParams } from "react-router-dom";

const Article = () => {
    // searchParams传参
    // const [params] = useSearchParams()
    // let id = params.get('id')
    // let name = params.get("name");

    // Params 传参, + router占位符
    const params = useParams()
    const id = params.id;
    const name = params.name





    return (
        <div>This is an article,id = {id}, name = {name}</div>
    )
}

export default Article