import useCurrentUser from "../../../hooks/useCurrentUser";
import AddModal from "./addModal";

const Product = () => {
  const { currentUser } = useCurrentUser();

  return <>{currentUser.attributes.role === "admin" ? <AddModal /> : null}</>;
};

Product.propTypes = {};

export default Product;
