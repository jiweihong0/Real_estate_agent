import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import { useNavigate } from "react-router-dom";
import { Calender } from "../type";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
type Props = {
  isLoading: boolean;
  isError: boolean;
  handleGetCalender: (formDatas: {
    year: number;
    month: number;
  }) => Promise<void>;
  dataCalender: Calender[];
};

export default function CalenderTable(props: Props) {
  const { handleGetCalender, dataCalender } = props;
  const [yearClick, setYearClick] = useState<number>(0);
  const [monthClick, setMonthClick] = useState<number>(0);
  const handleGetCalenderData = (date: Dayjs) => {
    const year = date.year();
    const month = date.month() + 1;
    setYearClick(year);
    setMonthClick(month);
    handleGetCalender({ year, month });
  };

  const getEventType = (classType: string) => {
    switch (classType) {
      case "collection":
        return "green";
      case "rent":
        return "red";
      case "sell":
        return "gray";
      case "develop":
        return "blue";
      case "market":
        return "gold";
      case "pay":
        return "red";
      case "prepay":
        return "blue";
    }
  };

  const transformEvent = (event: any, year: number, month: number) => {
    const eventDataWithDate = {
      ...event,
      year,
      month,
      events: event.events.map((event: any) => ({
        ...event,
        type: getEventType(event.class),
      })),
    };
    console.log(eventDataWithDate);

    return eventDataWithDate;
  };

  const getTransformedEvent = (year: number, month: number) => {
    const transformedData = dataCalender.map((event) =>
      transformEvent(event, year, month)
    );
    return transformedData;
  };

  const getListData = (value: Dayjs) => {
    const year = value.year();
    const month = value.month() + 1;
    const day = value.date();
    const transformedData = getTransformedEvent(yearClick, monthClick);

    const matchingDay = transformedData.find(
      (event) =>
        event.year === year && event.month === month && event.day === day
    );
    return matchingDay
      ? matchingDay.events.map((event: any) => ({
          type: event.type,
          content: event.content,
          id: event.id,
          class: event.class,
        }))
      : [];
  };
  const switchparam = (param: string, id: any) => {
    console.log(param, id);

    switch (param) {
      case "market":
        return `/Tenement/${id}/market?tenement_type=行銷追蹤`;
      case "rent":
        return `/Tenement/${id}/rent?tenement_type=出租`;
      case "sell":
        return `/Tenement/${id}/sell?tenement_type=出售`;
      case "develop":
        return `/Tenement/${id}/develop?tenement_type=開發追蹤`;
      case "collection":
        return `/Collection/${id}`;
      case "pay":
        return `/Collection/${id}`;
      case "prepay":
        return `/Collection/${id}`;
      default:
        return `/Calenderlist`;
    }
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    const navigate = useNavigate();

    return (
      <ul className="events">
        {listData.map((item: any, index: any) => (
          <li
            key={index}
            onClick={() => {
              navigate(switchparam(item.class, item.id));
            }}
          >
            <Badge
              color={item.type as BadgeProps["color"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };
  useEffect(() => {
    handleGetCalenderData(dayjs());
  }, []);

  return (
    <>
      <Calendar
        cellRender={cellRender}
        onPanelChange={(date) => handleGetCalenderData(date)}
      />
    </>
  );
}
