import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import { noteOnce } from "rc-util/lib/warning";
import type { GenerateConfig } from "rc-picker/lib/generate/index";

import buddhistEra from "dayjs/plugin/buddhistEra";

import th from "dayjs/locale/th";

dayjs.locale(
  {
    ...th,
    formats: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/BBBB",
      LL: "D MMMM BBBB",
      LLL: "D MMMM BBBB เวลา H:mm",
      LLLL: "วันddddที่ D MMMM BBBB เวลา H:mm",
    },
  },
  undefined,
  true
);

// Dayjs.extend(buddhistEra);
// console.log(dayjsGenerateConfig);
dayjs.extend(buddhistEra);

type IlocaleMapObject = Record<string, string>;
const localeMap: IlocaleMapObject = {
  bn_BD: "bn-bd",
  by_BY: "be",
  en_GB: "en-gb",
  en_US: "en",
  fr_BE: "fr", // todo: dayjs has no fr_BE locale, use fr at present
  fr_CA: "fr-ca",
  hy_AM: "hy-am",
  kmr_IQ: "ku",
  nl_BE: "nl-be",
  pt_BR: "pt-br",
  th_TH: "th",
  zh_CN: "zh-cn",
  zh_HK: "zh-hk",
  zh_TW: "zh-tw",
};

const parseLocale = (locale: string) => {
  const mapLocale = localeMap[locale];
  return mapLocale || locale.split("_")[0];
  return "th";
};

const parseNoMatchNotice = () => {
  /* istanbul ignore next */
  noteOnce(
    false,
    "Not match any format. Please help to fire a issue about this."
  );
};

const config: GenerateConfig<Dayjs> = {
  ...dayjsGenerateConfig,
  getFixedDate: (
    string: string | number | dayjs.Dayjs | Date | null | undefined
  ) => dayjs(string, ["BBBB-M-DD", "BBBB-MM-DD"]),
  getYear: (date: { year: () => number }) => date.year(), //+ 543,
  locale: {
    ...dayjsGenerateConfig.locale,
    // getWeekFirstDay: (locale) =>
    //   dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
    // getWeekFirstDate: (locale, date) =>
    //   date.locale(parseLocale(locale)).weekday(0),
    // getWeek: (locale, date) => date.locale(parseLocale(locale)).week(),
    // getShortWeekDays: (locale) =>
    //   dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
    // getShortMonths: (locale) =>
    //   dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
    format: (locale, date, format) => {
      if (String(locale).includes("th")) {
        const year = Number(date.get("year"));
        const newYear = year + 543;
        if (format.includes("YYYY"))
          return date
            .locale(parseLocale(locale))
            .format(format)
            .replace(String(year), String(newYear));
      }
      return date.locale(parseLocale(locale)).format(format);
    },
    // parse: (locale, text, formats) => {
    //   const localeStr = parseLocale(locale);
    //   for (let i = 0; i < formats.length; i += 1) {
    //     const format = formats[i];
    //     const formatText = text;
    //     if (format.includes("wo") || format.includes("Wo")) {
    //       // parse Wo
    //       const year = formatText.split("-")[0];
    //       const weekStr = formatText.split("-")[1];
    //       const firstWeek = dayjs(year, "BBBB")
    //         .startOf("year")
    //         .locale(localeStr);
    //       for (let j = 0; j <= 52; j += 1) {
    //         const nextWeek = firstWeek.add(j, "week");
    //         if (nextWeek.format("Wo") === weekStr) {
    //           return nextWeek;
    //         }
    //       }
    //       parseNoMatchNotice();
    //       return null;
    //     }
    //     const date = dayjs(formatText, format, true).locale(localeStr);
    //     if (date.isValid()) {
    //       return date;
    //     }
    //   }

    //   if (text) {
    //     parseNoMatchNotice();
    //   }
    //   return null;
    // },
  },
};

const CustomDatePicker = generatePicker<Dayjs>(config);

export default CustomDatePicker;
