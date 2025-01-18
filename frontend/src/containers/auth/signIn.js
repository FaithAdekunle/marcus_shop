import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "react-final-form";

import {
  required,
  FORM_SUBSCRIPTION,
  disabledSubmitClass
} from "../../util/form";
import Spinner from "../../components/spinner";
import signIn from "../../actions/auth/signIn";
import useAuthPage from "../../hooks/useAuthPage";
import TextInput from "../../components/inputs/textInput";

const SignIn = () => {
  const dispatch = useDispatch();

  const { signingIn } = useAuthPage();

  const renderSpinner = useCallback(() => <Spinner />, []);

  const onSubmit = useCallback(
    values => {
      return dispatch(signIn(values));
    },
    [dispatch]
  );

  const renderForm = useCallback(
    () => (
      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ submitting, handleSubmit, hasValidationErrors }) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Sign in to get started.
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Don't have an account? Sign up{" "}
                  <NavLink
                    to="/sign_up"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    here
                  </NavLink>
                  .
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          validate={required}
                          component={TextInput}
                          placeholder="marcus.smith@gmail.com"
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          validate={required}
                          component={TextInput}
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                disabled={hasValidationErrors || submitting}
                className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600${
                  hasValidationErrors || submitting ? disabledSubmitClass : ""
                }`}
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      />
    ),
    []
  );

  return (
    <div className="flex items-center justify-center h-screen">
      {signingIn ? renderSpinner() : renderForm()}
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
