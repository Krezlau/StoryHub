import {
  FormActions,
  FormContent,
  FormErrorText,
} from "../../styled/components/forms/Form";
import { Button, LoadingSpinner } from "../../styled/components/UI/UIElements";
import React, { FormEvent } from "react";
import useValidation from "../../hooks/useValidation";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";

let isInitial = true;

const PasswordChangeForm = () => {
  const { isLoading, setError, changePassword } = useHttp();
  const userToken = useSelector((state: IRootState) => state.auth.userToken);
  const navigate = useNavigate();

  const {
    value: currentPassword,
    isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: currentPasswordReset,
  } = useValidation((value) => value.trim().length >= 8);

  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: newPasswordReset,
  } = useValidation((value) => value.trim().length >= 8);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!currentPasswordIsValid) {
      setError("Current password too short.");
      newPasswordReset();
      currentPasswordReset();
      return;
    }

    if (!newPasswordIsValid) {
      newPasswordReset();
      currentPasswordReset();
      setError("New password too short.");
      return;
    }
    isInitial = false;

    changePassword(userToken, newPassword.trim(), navigate);
  };

  return (
    <FormContent>
      <form onSubmit={submitHandler}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          onBlur={currentPasswordBlurHandler}
          onChange={currentPasswordChangeHandler}
          value={currentPassword}
        />
        {currentPasswordHasError && (
          <FormErrorText>Password too short.</FormErrorText>
        )}
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          onBlur={newPasswordBlurHandler}
          onChange={newPasswordChangeHandler}
          value={newPassword}
        />
        {newPasswordHasError && (
          <FormErrorText>Password too short.</FormErrorText>
        )}
        <FormActions>
          {!isLoading && <Button type="submit">Change</Button>}
          {isLoading && <LoadingSpinner />}
        </FormActions>
      </form>
    </FormContent>
  );
};

export default PasswordChangeForm;
