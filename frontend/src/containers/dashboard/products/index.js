import AddModal from "./addModal";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Products = () => {
  const { currentUser } = useCurrentUser();

  return <>{currentUser.attributes.role === "admin" ? <AddModal /> : null}</>;
};

Products.propTypes = {};

export default Products;
