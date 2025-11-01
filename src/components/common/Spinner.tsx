import { SyncLoader } from "react-spinners";

function Spinner({ size, color }: { size: number; color: string }) {
  return <SyncLoader size={size} color={color} />;
}

export default Spinner;
