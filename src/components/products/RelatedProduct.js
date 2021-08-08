import ProductCard from "./ProductCard";

function RelatedProduct({ related }) {
  return (
    <div>
      <h3 className="text-2xl text-center font-semibold my-4 py-10">
        Related Products
      </h3>

      <div>
        <h2>
          {related.length ? (
            <div className="grid grid-cols-3 gap-10">
              {related.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            "No related product for this category."
          )}
        </h2>
      </div>
    </div>
  );
}

export default RelatedProduct;
