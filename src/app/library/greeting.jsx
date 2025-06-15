"use client";
import React from "react";

export default function Greeting({ username }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <h2 className="text-lg text-gray-700 font-jost">
      {getGreeting()}, <span className="font-semibold">{username}</span>
      .What have you read recently?
    </h2>
  );
}
