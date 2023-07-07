import { useState } from "react";
import ChooseEarLoudest from "./ChooseEarLoudest";
import ChooseEarQuietest from "./ChooseEarQuietest";
import HearningTest from "./HearningTest";
import NextEar from "./NextEar";
import SetVolumeToMax from "./SetVolumeToMax";
import ThankYou from "./ThankYou";
import { useUserRecordedData } from "@/store/data";

function MeasurementPage() {
  const [currentComponent, setCurrentComponent] = useState(0);
  const state = useUserRecordedData((state) => ({
    Left: state.Left,
    Right: state.Right,
  }));
  return (
    <>
      {
        [
          <SetVolumeToMax key={0} setCurrentComponent={setCurrentComponent} />,
          <ChooseEarQuietest
            key={1}
            setCurrentComponent={setCurrentComponent}
          />,
          <HearningTest key={2} setCurrentComponent={setCurrentComponent} />,
          <NextEar key={2} setCurrentComponent={setCurrentComponent} />,
          <HearningTest key={3} setCurrentComponent={setCurrentComponent} />,
          <ChooseEarLoudest
            key={4}
            setCurrentComponent={setCurrentComponent}
          />,
          <HearningTest
            key={5}
            loud
            setCurrentComponent={setCurrentComponent}
          />,
          <NextEar key={6} setCurrentComponent={setCurrentComponent} />,
          <HearningTest
            key={7}
            loud
            setCurrentComponent={setCurrentComponent}
          />,
          <ThankYou key={8} />,
        ][currentComponent]
      }
    </>
  );
}
export default MeasurementPage;
