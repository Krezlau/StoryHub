import PageHeader from "../components/UI/PageHeader";
import PasswordChangeForm from "../components/forms/PasswordChangeForm";

const ChangePasswordPage = () => {
  return (
    <>
      <PageHeader title={"Change Password"} />
      <PasswordChangeForm />
    </>
  );
};

export default ChangePasswordPage