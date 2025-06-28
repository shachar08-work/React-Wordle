// src/components/UserInfo.jsx
import React from "react";

export default function UserInfo({ user }) {
  return (
    <div className="mb-4 text-lg" dir="rtl">
      שלום, {user.displayName} ({user.email})
    </div>
  );
}
