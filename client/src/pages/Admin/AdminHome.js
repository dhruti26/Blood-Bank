import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3> Blood Bank App </h3>
          <hr />
          <p>
          Every day, countless individuals face critical medical situations, accidents, and life-threatening illnesses. The gift of life lies within all of us, and by donating blood, you hold the power to transform these challenging moments into stories of triumph and hope. The Blood Bank App is more than just a platform; it's a lifeline, bringing together compassionate souls like you who understand that a simple act of giving can mean the world to someone in need. Our community is bound by a shared belief that we are stronger when we stand together, and together, we can overcome any obstacle. Join our community today, and let's make a tangible difference, one donation at a time. Your generosity can bridge the gap between despair and recovery, between fear and comfort. It's a privilege to be part of this incredible journey, and we welcome you with open arms to be a part of something greater than ourselves.
          </p>
          <p> Join us in our mission to connect donors with those in need, and together, we can make a positive impact on the world.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;