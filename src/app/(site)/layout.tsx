import LayouSite from "@/components/layout/LayouSite";
import React, { FC, ReactNode } from "react";
import LayoutClient from "../layout.client";

interface ILayoutProps {
  children: ReactNode;
}

const layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <LayoutClient>
      <LayouSite>{children}</LayouSite>
    </LayoutClient>
  );
};

export default layout;
