const HStack = ({ children, gap, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        columnGap: gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default HStack;
