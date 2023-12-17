import ProductContainer from "../components/ProductContainer";
import ReviewContainer from "../components/ReviewContainer";
const HomeScreen = () => {
  return (
    <div className="row">
        <ProductContainer />
        <ReviewContainer />
    </div>
  );
};

export default HomeScreen;
