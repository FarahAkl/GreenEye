import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 md:px-24">
      <img
        src="/svg/pageNotFound.svg"
        alt="page not found"
        className="max-h-[80vh]"
      />
      <Button btnLabel="Go To Home Page" onClick={() => navigate("/")} />
    </div>
  );
};

export default PageNotFound;
