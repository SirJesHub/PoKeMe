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
        fontFamily: "Press Start 2P",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default VStack;
