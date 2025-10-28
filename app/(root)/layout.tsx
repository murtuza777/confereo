import StreamClientProvider from "@/provider/StreamClientProvider";
import { ReactNode } from "react";

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <StreamClientProvider>
      {children}
    </StreamClientProvider>
  );
}

export default RootLayout;
