import React from "react";

export default function InEnvironment({ children, environment }) {
  if (process.env.NODE_ENV === environment) {
    return <>{children}</>;
  } else {
    return null;
  }
}
