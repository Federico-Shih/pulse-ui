import { useParams } from "react-router-dom";

const Sectors = () => {
    const params = useParams();
    if (!params.id) {
        return <div>HASNT ID</div>;
    }
    return <div>
        hola
    </div>;
}

export default Sectors;