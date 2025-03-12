"use client";
import React from "react";
import AppTheme from "../theme/theme";
import ColorModeSelect from "../theme/ColorModeSelect";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      {children}
    </AppTheme>
  );
}
