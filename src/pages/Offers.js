import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

  let content = "";

  if (loading) {
    content = <Spinner />;
  }

  if (!loading && listings.length === 0) {
    content = <p>{`No offers currently`}</p>;
  }

  if (!loading && listings.length > 0) {
    content = (
      <main>
        <ul className="categoryListings">
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
            />
          ))}
        </ul>
      </main>
    );
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {content}
    </div>
  );
}

export default Category;
