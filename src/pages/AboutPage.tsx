import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import {Link} from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"About"} />
      <p>StoryHub is all about stories.</p>
      <p>
        Here you can share your stories, as well as read what others have
        posted. You can also like stories, save to favorites and comment them.
      </p>
      <p><Link to={'/login'}>Log in</Link> to access all features.</p>
    </Fragment>
  );
};

export default AboutPage;
