
import { useParams } from "react-router-dom";
import FormElements from "./Form/FormElements";
import FormLayout from "./Form/FormLayout";

const newReq = () => {
//   const { id } = useParams();

  return (
    <div className="min-h-screen bg-base-0">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-6"></h1>
        <p className="text-center text-xl"><FormLayout /></p>
      </div>
    </div>
  );
};

export default newReq;
