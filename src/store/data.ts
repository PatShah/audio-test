import { DataAction, DataState } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserRecordedData = create<DataState & DataAction>()(
  devtools(
    (set) => ({
      Left: {
        tonesHeard: 0,
        quitestVolume: [0],
        loudestVolume: [0],
      },
      Right: {
        tonesHeard: 0,
        quitestVolume: [0],
        loudestVolume: [0],
      },
      setHeardTonesForLeft: (value) =>
        set((state) => ({
          ...state,
          Left: { ...state.Left, tonesHeard: value },
        })),
      setQuitestVolumeForLeft: (value) =>
        set((state) => ({
          ...state,
          Left: { ...state.Left, quitestVolume: value },
        })),
      setLoudestVolumeForLeft: (value) =>
        set((state) => ({
          ...state,
          Left: { ...state.Left, loudestVolume: value },
        })),
      setHeardTonesForRight: (value) =>
        set((state) => ({
          ...state,
          Right: { ...state.Right, tonesHeard: value },
        })),
      setQuitestVolumeForRight: (value) =>
        set((state) => ({
          ...state,
          Right: { ...state.Right, quitestVolume: value },
        })),
      setLoudestVolumeForRight: (value) =>
        set((state) => ({
          ...state,
          Right: { ...state.Right, loudestVolume: value },
        })),
    }),
    { name: "user-data", store: "userDataStore" }
  )
);
