import { selectHLSState, useHMSStore } from "@100mslive/react-sdk";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { HMSHLSPlayer } from "@100mslive/hls-player";
import { HMSHLSPlayerEvents } from "@100mslive/hls-player";
import { HLSController, HLS_TIMED_METADATA_LOADED } from "./HLSController";
// import { ToastManager } from "../components/Toast/ToastManager";
// import toast from "react-hot-toast";
import Confetti from "react-confetti";

function HlsView() {
  // const { width, height } = useWindowSize()
  const videoRef = useRef(null);
  const hlsState = useHMSStore(selectHLSState);
  const hlsUrl = hlsState.variants[0]?.url;
  const [status, setStatus] = useState(false);
  const [hmsPlayer, setHMSPlayerInstance] = useState(null);

  // initialise HMSPLayer
  useEffect(() => {
    if (videoRef && !hmsPlayer) {
      const player = new HMSHLSPlayer(
        // "https://storage.googleapis.com/shaka-live-assets/player-source.m3u8",
        // "https://cdn-in.100ms.live/beam/621c44377a9d04e28c60cf85/625581d4a26d2f8ec0707273/20230403/1680520395991/master.m3u8",
        hlsState.variants[0]?.url,
        videoRef.current
      );
      setHMSPlayerInstance(player);
      player.play();
    }
  }, [videoRef, setHMSPlayerInstance, hmsPlayer]);

  // listen to hls player events
  useEffect(() => {
    if (hmsPlayer) {
      console.log("adding event listener");
      hmsPlayer?.on(HMSHLSPlayerEvents.TIMED_METADATA_LOADED, (data) => {
        console.log(data);
      });
    }
  }, [hmsPlayer]);

  return (
    <div>
      {status ? <Confetti width={1200} height={800} /> : null}
      <video ref={videoRef} autoPlay controls></video>;
    </div>
  );
}



export default HlsView;
