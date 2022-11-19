const VStack = ({ children, gap, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        rowGap: gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default VStack;
