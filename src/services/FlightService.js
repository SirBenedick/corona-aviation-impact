import flightData from "../data/flights.json";
import _ from "underscore";
import moment from "moment";

class FlightService {
  getFlights(segmentLabels) {
    let flights = {};
    let data = [];

    segmentLabels.forEach((segment) => {
      flights[segment.countryCode] = flightData[segment.countryCode];
      flights[segment.countryCode]["countryDisplayedName"] = segment.countryDisplayedName;
    });

    let array = Object.entries(flights);

    array.forEach((element) => {
      var january2019 = 0;
      var february2019 = 0;
      var march2019 = 0;
      var april2019 = 0;
      var may2019 = 0;
      var june2019 = 0;
      var july2019 = 0;
      var august2019 = 0;
      var september2019 = 0;
      var october2019 = 0;
      var november2019 = 0;
      var december2019 = 0;

      var january2020 = 0;
      var february2020 = 0;
      var march2020 = 0;
      var april2020 = 0;
      var may2020 = 0;
      var june2020 = 0;
      var july2020 = 0;
      var august2020 = 0;
      var september2020 = 0;
      var october2020 = 0;
      var november2020 = 0;
      var december2020 = 0;

      var keys = Object.keys(element[1].dates);

      keys.forEach((time) => {
        var month = moment.unix(parseInt(time)).get("month");

        switch (month) {
        case 0:
          january2020 = january2020 + element[1].dates[time].domesticFlights[2020];
          january2019 = january2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 1:
          february2020 = february2020 + element[1].dates[time].domesticFlights[2020];
          february2019 = february2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 2:
          march2020 = march2020 + element[1].dates[time].domesticFlights[2020];
          march2019 = march2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 3:
          april2020 = april2020 + element[1].dates[time].domesticFlights[2020];
          april2019 = april2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 4:
          may2020 = may2020 + element[1].dates[time].domesticFlights[2020];
          may2019 = may2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 5:
          june2020 = june2020 + element[1].dates[time].domesticFlights[2020];
          june2019 = june2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 6:
          july2020 = july2020 + element[1].dates[time].domesticFlights[2020];
          july2019 = july2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 7:
          august2020 = august2020 + element[1].dates[time].domesticFlights[2020];
          august2019 = august2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 8:
          september2020 = september2020 + element[1].dates[time].domesticFlights[2020];
          september2019 = september2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 9:
          october2020 = october2020 + element[1].dates[time].domesticFlights[2020];
          october2019 = october2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 10:
          november2020 = november2020 + element[1].dates[time].domesticFlights[2020];
          november2019 = november2019 + element[1].dates[time].domesticFlights[2019];
          break;
        case 11:
          december2020 = december2020 + element[1].dates[time].domesticFlights[2020];
          december2019 = december2019 + element[1].dates[time].domesticFlights[2019];
          break;
        default:
          break;
        }
      });

      for (let index = 0; index < 12; index++) {
        switch (index) {
        case 0:
          data.push({
            displayedCountryName: element[1].countryDisplayedName,
            month: "January",
            numericMonth: index,
            value2020: january2020,
            value2019: january2019,
          });

          break;
        case 1:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "February",
            numericMonth: index,
            value2020: february2020,
            value2019: february2019,
          });
          break;
        case 2:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "March",
            numericMonth: index,
            value2020: march2020,
            value2019: march2019,
          });
          break;
        case 3:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "April",
            numericMonth: index,
            value2020: april2020,
            value2019: april2019,
          });
          break;
        case 4:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "May",
            numericMonth: index,
            value2020: may2020,
            value2019: may2019,
          });
          break;
        case 5:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "June",
            numericMonth: index,
            value2020: june2020,
            value2019: june2019,
          });
          break;
        case 6:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "July",
            numericMonth: index,
            value2020: july2020,
            value2019: july2019,
          });
          break;
        case 7:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "August",
            numericMonth: index,
            value2020: august2020,
            value2019: august2019,
          });
          break;
        case 8:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "September",
            numericMonth: index,
            value2020: september2020,
            value2019: september2019,
          });
          break;
        case 9:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "October",
            numericMonth: index,
            value2020: october2020,
            value2019: october2019,
          });
          break;
        case 10:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "November",
            numericMonth: index,
            value2020: november2020,
            value2019: november2019,
          });
          break;
        case 11:
          data.push({
            displayedCountryName: element[1].countryName,
            month: "December",
            numericMonth: index,
            value2020: december2020,
            value2019: december2019,
          });
          break;
        default:
          break;
        }
      }
    });

    data = data.filter((entry) => entry.value2019 !== 0);

    data.sort(function(a, b) {
      const countryA = a.numericMonth;
      const countryB = b.numericMonth;

      if (countryA > countryB) {
        return 1;
      } else if (countryA < countryB) {
        return -1;
      } else {
        return 0;
      }
    });

    return data;
  }

  getAll() {
    return flightData;
  }

  getDataByContinent(continent) {
    var filtered = _.where(flightData, { continent: continent });

    return filtered;
  }

  getDataByCountry(country) {
    return flightData[country];
  }

  getDataByCountryAndDate(country, timestamp) {
    return flightData[country].dates[timestamp];
  }
}
export default new FlightService();
