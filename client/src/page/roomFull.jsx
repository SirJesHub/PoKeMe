import Board from "../components/Board";
import VStack from "../components/VStack";

const RoomFull = () => {
  return (
    <VStack gap={"0px"}>
      <Board size="big">
        The Room <br />
        is FULL!
      </Board>
    </VStack>
  );
};

export default RoomFull;
