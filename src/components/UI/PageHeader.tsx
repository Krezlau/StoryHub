import React from "react";
import PageHeaderContainer from "../../styled/components/UI/PageHeader";

const PageHeader: React.FC<{ title: string }> = (props) => {
  return (
    <PageHeaderContainer>
      <h1>{props.title}</h1>
    </PageHeaderContainer>
  );
};

export default PageHeader;