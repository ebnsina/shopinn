import Hero from "./Hero";
import NewArrival from "../components/home/NewArrival";
import BestSeller from "../components/home/BestSeller";
import CategoryList from "../components/category/CategoryList";
import SubcategoryList from "../components/subcategory/SubcategoryList";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-8 py-4">
        <Hero />

        <CategoryList />
        <SubcategoryList />

        <main className="pt-20">
          <NewArrival />

          <div className="py-6 mt-10"></div>

          <BestSeller />
        </main>
      </section>
    </div>
  );
}

export default Home;
