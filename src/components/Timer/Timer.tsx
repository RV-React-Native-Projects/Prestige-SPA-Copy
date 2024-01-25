import React, { useEffect, useReducer, useRef } from "react";
import { StyleSheet, TextStyle } from "react-native";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";

interface TimerProps {
  counter?: string;
  TimerCount?: number;
  refreshTime?: number;
  getIsTimerCompleted: (isCompleted: boolean) => void;
  fontStyle?: TextStyle["fontStyle"];
  fontSize?: number;
  fontColor?: string;
  resetTimer?: boolean;
}

interface TimerState {
  loading: boolean;
  timer: string | null;
  timerCompleted: boolean;
}

type TimerAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_TIMER"; payload: string | null }
  | { type: "SET_TIMER_COMPLETED"; payload: boolean };

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_TIMER":
      return { ...state, timer: action.payload };
    case "SET_TIMER_COMPLETED":
      return { ...state, timerCompleted: action.payload };
    default:
      return state;
  }
}

const Timer: React.FC<TimerProps> = props => {
  const { theme } = useAppSelector(state => state.theme);
  const {
    counter = "00:45",
    TimerCount = 60 * 0.75,
    refreshTime = 1000 * 25,
    getIsTimerCompleted,
    fontStyle = "500.semibold",
    fontSize = 16,
    fontColor = theme.primary,
    resetTimer = false,
  } = props;

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    timer: null,
    timerCompleted: false,
  });

  const { loading, timer, timerCompleted } = state;

  const setLoading = (val: boolean) => {
    dispatch({ type: "SET_LOADING", payload: val });
  };

  const setTimerCompleted = (val: boolean) => {
    dispatch({ type: "SET_TIMER_COMPLETED", payload: val });
  };

  const setTimer = (val: string | null) => {
    dispatch({ type: "SET_TIMER", payload: val });
  };

  const TimeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (resetTimer) {
      getIsTimerCompleted(false);
      clearTimer(getDeadTime());
    }
  }, [resetTimer]);

  useEffect(() => {
    if (timerCompleted) getIsTimerCompleted(true);
  }, [timerCompleted]);

  const startTimer = (e: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`,
      );
    }
  };

  const clearTimer = (e: Date) => {
    setTimer(counter);
    if (TimeRef.current) clearInterval(TimeRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    TimeRef.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + TimerCount);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, [resetTimer]);

  useEffect(() => {
    if (timer && timer <= "00:00") {
      setTimerCompleted(true);
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Time Out");
    }, refreshTime);

    return () => clearInterval(interval);
  }, [refreshTime]);

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  return (
    <AppText fontStyle={fontStyle} size={fontSize} color={fontColor}>
      {timer}
    </AppText>
  );
};

const styles = StyleSheet.create({});

export default Timer;
