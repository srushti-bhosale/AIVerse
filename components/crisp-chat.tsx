"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("97447c3a-0a58-44aa-9f93-5fe18ca89aff");
  }, []);

  return null;
};
