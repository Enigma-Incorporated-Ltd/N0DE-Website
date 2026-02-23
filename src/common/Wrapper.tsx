import BackToTop from "./BackToTop";

const Wrapper = ({ children }: any) => {
  return (
    <>
      {children}
      <BackToTop />
    </>
  );
};

export default Wrapper;
