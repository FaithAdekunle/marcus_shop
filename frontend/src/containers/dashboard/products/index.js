import useCurrentUser from "../../../hooks/useCurrentUser";
import AddModal from "./addModal";

const Products = () => {
  const { currentUser } = useCurrentUser();

  return <>{currentUser.attributes.role === "admin" ? <AddModal /> : null}</>;
};

Products.propTypes = {};

export default Products;
