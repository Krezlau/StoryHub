import React, {Fragment} from "react";
import PageHeader from "../components/UI/PageHeader";

const HomePage: React.FC = () => {
  return (<Fragment>
    <PageHeader title={'Welcome'} />
    <div>
      <p>Welcome to the Stories Website!</p>
      <p>Here you can find all the interesting stories posted by users.</p>
    </div>
    </Fragment>
  );
};

export default HomePage;
