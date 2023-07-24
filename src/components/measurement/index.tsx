import { useState } from "react";
import ChooseEarLoudest from "./ChooseEarLoudest";
import ChooseEarQuietest from "./ChooseEarQuietest";
import HearningTest from "./HearningTest";
import NextEar from "./NextEar";
import SetVolumeToMax from "./SetVolumeToMax";
import ThankYou from "./ThankYou";
import { useUserRecordedData } from "@/store/data";
import LineChart from "./LineChart";

const labels = ["250", "500", "1K", "2K", "3K", "4K", "6K", "8K"];

function MeasurementPage() {
  const [currentComponent, setCurrentComponent] = useState(0);
  const state = useUserRecordedData((state) => ({
    Left: state.Left,
    Right: state.Right,
  }));

  const [quitestVolumeLeft, quitestVolumeRight] = useUserRecordedData(
    (state) => [state.Left.quitestVolume, state.Right.quitestVolume]
  );

  const datasets = [
    {
      label: "Left",
      data: quitestVolumeLeft,
      fill: false,
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Right",
      data: quitestVolumeRight,
      fill: false,
      borderColor: "#742774",
    },
  ];

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
          <LineChart chartData={{ labels, datasets }} key={8} />,
          <ThankYou key={9} />,
        ][currentComponent]
      }
    </>
  );
}
export default MeasurementPage;
