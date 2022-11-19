import Board from "../components/Board";
import VStack from "../components/VStack";

const RoomFull = () => {
  return (
    <VStack gap={"0px"}>
      <h1
        style={{
          fontFamily: "Arial",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        <br />
        The Room <br />
        is FULL!
      </h1>
      <Board size="big"></Board>
    </VStack>
  );
};

export default RoomFull;
