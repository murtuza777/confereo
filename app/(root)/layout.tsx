import react, { ReactNode } from "react";

const RooLayout =({children}: {children: ReactNode;}) => {
  return (
        <main>
            {children}
            footer
        </main>
  );
}
export default RooLayout;